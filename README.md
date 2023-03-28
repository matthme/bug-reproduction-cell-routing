# Bug reproduction - cell routing
This contains 2 nearly-identical example apps with one difference: The zome function `echo_version` returns a string 'example1' in one happ, and a string 'example2' in the other.

## Build example apps
Run ./build-happs.sh

## Steps to reproduce
- Install webhapp example1 and set app id: 'example1'
- Open app 'example1' -- you should receive the zome call response "example1". Close app

- Install webhapp example2 and set app id: 'example2'
- Open app 'example2' -- you should receive the zome call response "example2". Close app

- Open app 'example1' -- you will receive the incorrect zome call response "example2"

- restart launcher
- Open app 'example1' -- you will receive the zome call response "example1"
- Open app 'example2' -- you will receive the incorrect zome call response "example1"