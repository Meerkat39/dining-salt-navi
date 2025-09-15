# Node.js公式イメージ（22系）をベースにする
FROM node:22

# 作業ディレクトリ作成
WORKDIR /app

# package.jsonとlockファイルのみ先にコピーして依存解決を最適化
COPY package*.json ./

# 依存パッケージをインストール（npm ciはCI/CD向け）
RUN npm ci

# 残りのソースコードをコピー
COPY . .

# デフォルトコマンド（品質チェック一括実行）
CMD ["npm", "run", "verify"]
