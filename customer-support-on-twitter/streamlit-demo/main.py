import json
import os

from dotenv import load_dotenv
from langchain.embeddings import CohereEmbeddings
import numpy as np
import pandas as pd
import requests
import streamlit as st


load_dotenv()

st.set_page_config(page_title='Semantic Search: VulcanSQL + Neon + Cohere', layout='wide')
st.title('Semantic Search: VulcanSQL + Neon + Cohere')
st.markdown('The API service is delivered using [VulcanSQL](https://vulcansql.com/).')
st.markdown('''
    We demonstrate how effortlessly VulcanSQL can create and share data APIs that enables semantic search applications.
    We use Neon as the database that powers the vector search; and Cohere as the embeddings service that turns text into vectors.
''')
st.markdown('references:')
st.markdown('- [Dataset: Customer Support on Twitter](https://www.kaggle.com/datasets/thoughtvector/customer-support-on-twitter/versions/10?resource=download)')
st.markdown('- [Source code](https://github.com/Canner/vulcan-sql-examples/tree/main/customer-suppoort-on-twitter)')
st.markdown('- [Neon](https://neon.tech/)')
st.markdown('- [Cohere](https://cohere.com/)')
st.markdown('**The Application Flow Diagram**')
st.image('static/intro.jpeg')
st.markdown('---')

VULCANSQL_API_URL = os.getenv('VULCANSQL_API_URL', 'http://localhost:3000/api')
COHERE_API_KEY = os.environ.get('COHERE_API_KEY')

# Turn a user query into an embedding
query = st.text_input('Write down your query here')

if query:
    with st.spinner('Embedding your query...'):
        embeddings_model = CohereEmbeddings(cohere_api_key=os.environ.get('COHERE_API_KEY'))
        query_embeddings = embeddings_model.embed_query(query)
    with st.spinner('Querying the database...'):
        # API request to get the most similar documents
        results = requests.get(
            f'{VULCANSQL_API_URL}/supports',
            headers={'query': json.dumps(query_embeddings)}
        )
        if results.status_code == 200:
            df = pd.DataFrame(results.json())
            st.dataframe(df)

            st.markdown('**Similarities between the query embedding and the text embeddings**')
            query_embeddings = np.repeat([query_embeddings], repeats=3, axis=0)
            text_embeddings = np.array([json.loads(embedding) for embedding in df['text_embeddings']])
            dist = np.linalg.norm(query_embeddings - text_embeddings, axis=1)
            st.dataframe(
                pd.DataFrame({'Query': [query for _ in range(3)], 'Text': df['text'], 'Distance': dist})
            )