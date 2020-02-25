#!/usr/bin/env python3

import subprocess

print('1. git fetch')
print('2. git pull')
print('3. git status')
print('8. run serverside')
print('9. run all servers')
value = input("Choose one above\n")
print(f'You entered {value}')

if (value=='1'):
    subprocess.call(["git", "fetch"])

elif (value=='2'):
    subprocess.call(["git", "pull"])

elif (value=='3'):
    subprocess.call(["git", "status"])

elif (value=='8'):
    subprocess.call(["node", "../server/serverside/index.js"])

else:
    print('Not exist')

