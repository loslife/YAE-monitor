#!/bin/sh
nohup node /Users/zkm/git_local/YAE-SERVER/lib/mastershell.js -m dev -s /bin/accounts.js -d /Users/zkm/git_local/YAE-monitor/ >> logs/accounts.log &
exit 0