import Logtastic from '@ofrepose/logtastic';

export function helloWorld(){
    console.clear();
    console.log(`
    

    ██████╗██████╗███╗   ████████████████╗ ██████╗██╗     
    ██╔════██╔═══██████╗  ██╚══██╔══██╔══████╔═══████║     
    ██║    ██║   ████╔██╗ ██║  ██║  ██████╔██║   ████║     
    ██║    ██║   ████║╚██╗██║  ██║  ██╔══████║   ████║     
    ╚██████╚██████╔██║ ╚████║  ██║  ██║  ██╚██████╔███████╗
     ╚═════╝╚═════╝╚═╝  ╚═══╝  ╚═╝  ╚═╝  ╚═╝╚═════╝╚══════╝
    ██╗  ████╗   ████████╗                                 
    ██║  ████║   ████╔══██╗                                
    █████████║   ████████╔╝                                
    ██╔══████║   ████╔══██╗                                
    ██║  ██╚██████╔██████╔╝                                
    ╚═╝  ╚═╝╚═════╝╚═════╝                                 

                                                                                 
                                                                         
   `);
   Logtastic.log(`👋 Welcome to ControlHub - I hope you find this application useful.`, {color: 'blue'});
   Logtastic.log(`📢 If you have any questions or want to collab on something feel free to reach out to me https://endquery.com - `, {color: 'green'});
}