/*
=======================
04-four-synchronous-tasks.js
=======================

Student ID: 23651127

Comment (Required): I performed the required sync'ed tasks
by first defining the order in which the methods should be called. 
Then added the method m1 in the callback method of method
m0; added method m2 in call back method for m1 and so on..
    This nesting ensures the following task is only performed when the
previous one is done. 

    The execution order due to nesting goes as follows:
    1 - call fs.readFile
    2 - in callback for readFile, if there are no errors reading, zlib.inflate is call to decompress buffer
    3 - in the call back to zlib.inflate, if there are no errors decompressing, dns.resolve is called
    4 - in the call back to dns.resolve, if there are not errors resolving, fs.writeFile is called.
    5 - the call back for writeFile logs any erros it may have found. 

    The nesting in a method's call back method described int he comment section can be noticed in the 
    execution order list above.

    Vagner++

=======================
*/
const fs = require("fs");
const dns = require("dns");
const zlib = require("zlib");

input_file = "./input/domain.deflated";
output_file = "./output/ip_address.txt";

//callback method for the fs.readFile method
let after_readingInput = function(err, data)
{
    //case readFile error print message
    if(err)
        console.error("Error Reading the File in ", input_file);
    else
       zlib.inflate(data, function (err, buff)
       {
           if(err)
               console.error(err);
           else
               dns.resolve(buff.toString("utf8"), function (err, data)
               {
                   if(err)
                        console.log("Failed to resolve domain ", buff.toString("utf8"));
                   else
                   {
                        fs.writeFile(output_file, data, function(err)
                    {
                        if(err)
                            console.log("Error writing ", data, " to file ", output_file);
                    });
                   }
               });
            
       });
};

//readFile is first on stack, processed immediately.
fs.readFile(input_file, {encoding: null}, after_readingInput);

