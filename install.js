module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/deepbeepmeep/HunyuanVideoGP app",
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install -r requirements.txt",
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    },
    {
      method: "shell.run",
      params: {
        message: "conda install -y -c conda-forge huggingface_hub"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "huggingface-cli download tencent/HunyuanVideo --local-dir ckpts {{platform === 'win32' ? ' && dir' : ' ; ls'}}",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/ckpts",
        message: [
          "huggingface-cli download xtuner/llava-llama-3-8b-v1_1-transformers --local-dir llava-llama-3-8b-v1_1-transformers {{platform === 'win32' ? ' && dir' : ' ; ls'}}",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "python hyvideo/utils/preprocess_text_encoder_tokenizer_utils.py --input_dir ckpts/llava-llama-3-8b-v1_1-transformers --output_dir ckpts/text_encoder",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/ckpts",
        message: [
          "huggingface-cli download openai/clip-vit-large-patch14 --local-dir text_encoder_2 {{platform === 'win32' ? ' && dir' : ' ; ls'}}",
        ]
      }
    },
  ]
}
