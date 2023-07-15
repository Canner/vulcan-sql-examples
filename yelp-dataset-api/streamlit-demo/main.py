import os

from dotenv import load_dotenv
import pandas as pd
import requests
import streamlit as st

load_dotenv()

# cohere + langchain
from langchain.llms import Cohere
from langchain import PromptTemplate, LLMChain

st.set_page_config(page_title='Yelp Dataset Demo', layout='wide')

st.title('Yelp Dataset Demo')
st.subheader('No more data breach with VulcanSQL!')
st.markdown(
    '''
    The demo is delivered using [VulcanSQL](https://vulcansql.com/) + LangChain + Cohere. 
    We demonstrate how effortlessly VulcanSQL can create and share secure data APIs since 
    VulcanSQL has built-in [data privacy mechanisms](https://vulcansql.com/docs/data-privacy/overview) 
    to protect sensitive data. In this project for example, data from the column `tip_user_id` is being masked.
    '''
)

st.markdown('Source code: https://github.com/Canner/vulcan-sql-examples/tree/main/yelp-dataset-api')

st.markdown('Notice:')
st.markdown('- The Cohere model used in the demo is in Trial mode, which is limited to 5 API calls/minute.')
st.markdown('- If you run into `JSONDecodeError` issue, please rerun the Streamlit app')

st.markdown('---')

st.subheader('The Application Flow Diagram')
st.markdown("<div style='display: flex; justify-content: center;'><img src='app/static/intro.png' style='width: 800px;' /></div>", unsafe_allow_html=True)

st.markdown('---')

BUSINESS_NAME_IDs = {
    'Century 20 El Con and XD': '3uLgwr0qeCNMjKenHJwPGQ',
    'La Segunda Central Bakery': 'QoezRbYQncpRqyrLH6Iqjg',
    'Sean Thorntons Public House': 'MYoRNLb5chwjQe3c_k37Gg',
    'Siam Cuisine': '_uN0OudeJ3Zl_tf6nxg5ww',
    'Sus Hi Eatstation': 'OaGf0Dp56ARhQwIDT90w_g',
}

st.subheader('Question: What are the user tips given to')
business_name = st.selectbox('Select business name', BUSINESS_NAME_IDs.keys())

COHERE_API_KEY = os.environ['COHERE_API_KEY']

question = f'What are the user tips given to "{BUSINESS_NAME_IDs[business_name]}"'
template = """
BASE URL: https://yelp-dataset-api.fly.dev/api/

API Documentation
The API endpoint  /businesses show a list of user tips given to a given business

|URL Query Parameter|Format|Required|Default Description|
|---|---|---|---|
|business_id|string|Yes|unique id|
|limit|integer|No|Offset-based Pagination: The maximum number of rows to return. default: 20|
|offset|integer|No|Offset-based Pagination: The offset from the row. default: 0|

Question: {question}

Answer: Let's answer the question step by step and give me the url.
""" 

@st.cache_data
def run_llm(_llm_chain, question):
    return _llm_chain.run(question)

with st.spinner('Waiting for the Cohere model to generate the answer...'):
    prompt = PromptTemplate(template=template, input_variables=["question"])
    llm = Cohere(cohere_api_key=COHERE_API_KEY, temperature=0)
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    answer = run_llm(llm_chain, question)

@st.cache_data
def get_business_tips(api_url):
    return requests.get(api_url).json()

api_url = f'https://{answer.splitlines()[-1].split("https://")[-1]}'

with st.spinner('Waiting for the API result to return...'):
    api_results = get_business_tips(api_url)

tips_results = [
    {
        'business_id': api_result['business_id'],
        'name': api_result['name'],
        'address': api_result['address'],
        'tip_user_id': api_result['tip_user_id'],
        'tip_text': api_result['tip_text'],
        'tip_date': api_result['tip_date'],
    }
    for api_result in api_results
]

st.subheader(f'Answer: User Tips to the Business {business_name}')
st.dataframe(tips_results)
