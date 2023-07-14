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
st.subheader('Using VulcanSQL + LangChain + Cohere')
st.markdown('The API service is delivered using [VulcanSQL](https://vulcansql.com/).')
st.markdown('We demonstrate how effortlessly VulcanSQL can create and share secure data APIs since VulcanSQL has built-in [data privacy mechanisms](https://vulcansql.com/docs/data-privacy/overview) to protect sensitive data.')
st.markdown('In this project for example, data from the column `tip_user_id` is being masked.')
st.markdown('**No Fear of Data Breach!**')

st.markdown('Notice:')
st.markdown('- The Cohere model used in the demo is in Trial mode, which is limited to 5 API calls/minute.')
st.markdown('- If you run into `JSONDecodeError` issue, please rerun the Streamlit app')

st.markdown('---')

BUSINESS_IDS = [
    '3uLgwr0qeCNMjKenHJwPGQ',
    'QoezRbYQncpRqyrLH6Iqjg',
    'MYoRNLb5chwjQe3c_k37Gg',
    '_uN0OudeJ3Zl_tf6nxg5ww',
    'OaGf0Dp56ARhQwIDT90w_g',
]
business_id = st.selectbox('Select a name', BUSINESS_IDS)

st.markdown('---')

COHERE_API_KEY = os.environ['COHERE_API_KEY']

question = f'What are the user tips given to "{business_id}"'
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

st.markdown('This is the prompt we are going to ask the Cohere model:')
st.markdown(f'''
```
BASE URL: https://yelp-dataset-api.fly.dev/api/

API Documentation
The API endpoint  /businesses shows a list of user tips given to a given business_id

|URL Query Parameter|Format|Required|Default Description|
|---|---|---|---|
|business_id|string|Yes|unique id|
|limit|integer|No|Offset-based Pagination: The maximum number of rows to return. default: 20|
|offset|integer|No|Offset-based Pagination: The offset from the row. default: 0|

Question: {question}

Answer: Let's answer the question step by step and give me the url.
```
''')

with st.spinner('Waiting for the Cohere model to generate the answer...'):
    prompt = PromptTemplate(template=template, input_variables=["question"])
    llm = Cohere(cohere_api_key=COHERE_API_KEY, temperature=0)
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    answer = run_llm(llm_chain, question)

@st.cache_data
def get_business_tips(api_url):
    return requests.get(api_url).json()

api_url = f'https://{answer.splitlines()[-1].split("https://")[-1]}'
st.markdown(f'After some post-processing to the result returned by the Cohere model, now we are going to request this API URL: {api_url}')

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

st.markdown('---')
st.markdown(f'**User Tips to the Business {business_id}**')
st.dataframe(tips_results)
