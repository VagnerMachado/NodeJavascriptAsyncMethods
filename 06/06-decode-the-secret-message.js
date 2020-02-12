/*
=======================
06-decode-the-secret-message.js
=======================
Student ID: 23651127
Comment (Required): I think this was a very interesting task to accomplish.
I may ask you in class, but if I do not, would you send me a link to how
you split the song into different files?

To accomplish this task, I developed this algorithm:

1 - define variables that are needed for the task.
2 - define the call back method for afterRead, this is where the 'magic' happens!
    2.1 - if there are errors reading the data, log it
    2.2 - otherwise inflate the data using zlib
        2.2.1 - if there are errors inflating, log it
        2.2.2 - otherwise add inflated data to sequential position into buffere array
        2.2.3 - if there are more files to read, call readFile to continue recurion
        2.2.4 - othersive call Buffer.concat to join all buffers in array of buffers
        2.2.5 - write the concatenated buffer to the desired zip file
        2.2.6 - if there are errors writing the zipped file, log it
3 - encapsulate the steps 2 - 2.2.6 in methdod outterMethod that accpets the bufferArrayPostion as paramenter
4 - with all above defined, call outterMethod with parameter 0 to perform task.

Vagner++

=======================
*/

//some variables
const fs = require("fs");
const zlib = require("zlib");
const files_dir = "./input/";
let files = fs.readdirSync(files_dir);
bufferHolder = [files.length];
let inputFileArrayIndex = 0;
let bufferArrayIndex = 0;

//method that surrounds the call back method for fs.readFile
let outtperMethod = function(position)
{
    // call back method for fs.readFile
    let after_readingInput = function(err, data)
    {
        //case readFile error, print message
        if(err)
            console.error("Error Reading the File in Array", err, "index", inputFileArrayIndex);
        else
            //else inflate the content
            zlib.inflate(data, function (err, buff)
            {
                //case error inflating, log it
                if (err)
                console.log("ERROR");
                else
                {
                    //else add it to the sequential spot in the buffer holder and read next if any
                    bufferHolder[bufferArrayIndex++] = buff;
                    if(inputFileArrayIndex < files.length)
                        fs.readFile(files_dir.concat(String(files[inputFileArrayIndex++])), {encoding: null}, after_readingInput);
                    
                    //when there are not files to be read, use Buffer.concat to join all bufferes
                    else
                    {
                        const masterBuff = Buffer.concat(bufferHolder);
                        //write the joined buffer into  the destination
                        fs.writeFile("./output/secret-message.zip", masterBuff, function(err)
                        {
                            //if error in writing the zipped file,log it
                            if(err)
                                 console.log("Error in Writing to Zipped File");
                        });
                    }
                }
            });      
    };
    //initiate the recursion to readFile sequentially
    fs.readFile(String(files_dir.concat(files[inputFileArrayIndex++])), {encoding: null}, after_readingInput);
};
   //call this method to start the party, passing the first index in the array to be analyzed
   outtperMethod(0);

   