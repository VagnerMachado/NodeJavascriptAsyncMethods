/*
=======================
03-personal-hosts-file.js
=======================

Student ID: 23651127

Comment (Required): I decided to spend a bit of more time and perform the required task 
synchronously by properly nesting call back methods. This would not be desired case the
input to process is large because it may take a long time to resolve a dns while all 
others remain pending. However, i thought it would be interesting to tackle the challenge
of coding it synchronously. My reasoning/algorithm is the following:

    1 - stablish global variables needed, counter, array
    2 - define callback method for dns.resolve
        2.1 - case error, log it
        2.2 - otherwise append IP and domain to result String
        2.3 - incrememnt index array
        2.4 - if there are more domains,  resolve
        2.5 - otherwise write result string to file and process is done
        2.6 - encapsulate 2 to 2.6 into arrayOfDomains method which starts dns.resolve recursion
    3 - define callback method for fs.readFile
        3.1 - if error reading, log it.
        3.2 - else split data line by line into array of domains, taking as delimiter \r\n
        3.3 - if there are domains to resolve, call method on 2.6  and pass array
    4 - after all methods above are defined, call read file with proper paramenters

    Additional comments on code


    Vagner++

=======================
*/
const fs = require("fs");
const dns = require("dns");
const input_file = "./input/domains.txt";
const output_file = "./output/hosts.txt";
let domains = [];
let domainIndex = 0;
let result_output = "";

//I am assuming the folder for output is there, otherwise please uncomment line below
//fs.mkdir("./output", {recursive: false}, function(err) { });

//method that initiates the dns.resolve recursion
arrayOfDomains = function(fullArray)
{
    let after_resolution = function(err, records)
    {  
        //case error during resolve
        if(err)
        {
            console.error("Failed to resolve", fullArray[domainIndex] );
        }
        // otherwise process the recor by writing to file
        else
        { 
            //build a line
            let temp = String(String(records).concat(String(("\t")).concat(String(fullArray[domainIndex]).concat(String("\r\n")))));
           
            // append a  to result
           result_output += temp;
                   //incrememnt index, if more domains, resolve, else write to file.
                   domainIndex++;
                   if(domainIndex < fullArray.length)
                        dns.resolve(fullArray[domainIndex], after_resolution);
                    else
                        fs.writeFile(output_file, result_output, function errorCheck(){
                            if(err)
                                console.log("Error Writing to File")});            
        }
    };
    //resolve first case
    dns.resolve(fullArray[domainIndex], after_resolution);
}

//callback method for the fs.readFile method
let after_readingInput = function(err, data)
{
    //case readFile error print message
    if(err)
        console.error("Error Reading the File in ", input_file);
    //otherwise split input file by new lines
    else
        domains = String(data).split("\r\n");

    //if there are domains to resolve call arrayOfDomains method to initiate fs.resolve
    if(domains.length > 0)
        arrayOfDomains(domains);
    //otherwise print message saying there are no domains to resolve in file
    else
        console.log("There are no domains to resolve in File ", input_file);
};

//readFile is first on stack, processed immediately.
fs.readFile(input_file, {encoding: "utf8"}, after_readingInput);