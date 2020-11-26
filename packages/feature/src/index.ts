import core from '@ts-monorepo/core';


const info = () => {
    console.log('TS Mono feature fn');
    console.log('Core name:', core.name);
}


export default {
    info
}