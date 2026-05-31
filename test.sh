# 单条命令终止所有 node 进程
# powershell -Command "Stop-Process -Name node -Force -ErrorAction SilentlyContinue"
sleep 3


# 显式指定 Windows 环境路径（假设 Git 安装在 C:\Git）
cmd //C "C:/Windows/System32/taskkill.exe /IM node.exe /F"

sleep 3

hexo clean
hexo g
hexo s &
sleep 3
start http://localhost:4000/

sleep 3

#read -p "按回车键继续..."
