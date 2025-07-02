import streamlit as st
import os
import subprocess

st.title("Pharma PPTX Automizer")

uploaded_file = st.file_uploader("Upload Slide Data (JSON)", type="json")

if uploaded_file:
    input_path = "./input/data.json"
    with open(input_path, "wb") as f:
        f.write(uploaded_file.getvalue())

    st.info("Running backend...")
    result = subprocess.run(["node", "backend/index.js"], capture_output=True, text=True)

    if result.returncode == 0:
        st.success("✅ PPTX generated!")
        with open("output/final_combined.pptx", "rb") as f:
            st.download_button("Download Final PPT", f, "final_combined.pptx")
    else:
        st.error("Error:
" + result.stderr)
