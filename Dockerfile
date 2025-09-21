# Node.js公式イメージ（22系）をベースにする
FROM node:22

# 作業ディレクトリ作成
WORKDIR /app

# package.jsonとlockファイルのみ先にコピーして依存解決を最適化
COPY package*.json ./

# 依存パッケージをインストール（npm ciはCI/CD向け）
RUN npm ci

# 残りのソースコードをコピー（prisma/schema.prismaも含む）
COPY . .

# Prismaの型定義を必ず生成
RUN npx prisma generate

# デフォルトコマンド（品質チェック一括実行）
CMD ["npm", "run", "verify"]
