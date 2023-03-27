## Build example apps
Run ./build-happs.sh

## Steps to reproduce
- Install webhapp example1 and set app id: 'example1'
- Install webhapp example2 and set app id: 'example2'
- Open app 'example1' -- you should receive the zome call response "example1"
- Open app 'example2' -- you should receive the zome call response "example2"
- restart launcher
- Open app 'example2' -- you will receive the zome call response "example1"