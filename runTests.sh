expressAppPID=$(netstat -ltp | grep 3333 | awk '/:3333 */ {split($NF,a,"/"); print a[2],a[1]}' | cut -f 2 -d " ")
echo $expressAppPID
if [ -z "$expressAppPID" ]
then
  echo "No PID for :3333"
else
  kill $expressAppPID
fi

npm run test