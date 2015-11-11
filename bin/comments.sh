#!/bin/sh
nohup node /Users/zkm/git_local/YAE-SERVER/lib/mastershell.js -m dev -s /bin/comments.js -d /Users/zkm/git_local/YAE-monitor/ >> logs/comments.log &
exit 0