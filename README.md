export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890


# 配置npm的代理
npm config set proxy http://127.0.0.1:7890

# 验证配置
npm config get proxy

# 清除代理配置
npm config delete proxy




# 初始化 Node 项目
npm init

# 安装 Hardhat
npm install --save-dev hardhat

# Create a JavaScript project
npx hardhat

# 更新依赖
mpm i


# 编译合约
npx hardhat compile

# 执行test目录下所有的js测试
npx hardhat test
