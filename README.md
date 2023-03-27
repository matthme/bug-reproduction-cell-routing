## Build example apps
Run ./build-happs.sh

## Steps to reproduce
- Manually install app example1 with app id: 'example1'
- Manually install app example2 with app id: 'example2'
- Open app 'example2' -- you should receive the zome call response "example2"
- restart launcher
- Open app 'example2' -- you will receive the zome call response "example1"