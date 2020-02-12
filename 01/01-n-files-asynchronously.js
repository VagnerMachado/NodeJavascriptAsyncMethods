/*
=======================
01-n-files-asynchronously.js
=======================

Student ID: 23651127

Comment (Required): The tasks fo this process are
done async'ly because fs.writeFile is called while other fs.writeFile
are still in Thread pool. Whichever writeFile call ends, is added to call back queue
which allows them to process call back menthod once call stack is empty.

For the asychronous assignemnt,
id decided to implement the following algorithm:

1 - define variables and data needed for the process.
2 - define call back method for fs.writeFile
    2.1 - if error writing, log it
    2.2 - display the file
    2.3 - increment number of files processed
    2.4 - if there are not more files, log "writing complete";
3 - encapsulate steps from 2 to 2.4 in method pass data which calls fs.writeFile.
4 - implement a while loop
    4.1 - if file name needs padding, pad it
    4.2 - increment the number of files processed
    4.3 - call passData and pass file information.
    4.4 - if there are more files goto 4.1

    Vagner++

=======================
*/
//some variables;
const fs = require("fs");
let input = 55; //i.e input = 53 then files run from 01 to 53.
let folder = "./output/";
let fileNumber = 1;
let partialFileName = "-output.txt";
let fullFileName;
let data = "Data-1"; 
let filesProcessed = 0;

//I am assuming the folder for output is there, otherwise please uncomment line below
//fs.mkdir("./output", {recursive: false}, function(err) { });

//passData method with data for specific file to write to
const passData = function(path, file, data, number)
{
        //call back method for fs.writeFile
        after_write = function(err)
        {
         if(err)
             console.error(err);
         else
            console.log(file);
            filesProcessed++;
            if(filesProcessed == input)
                console.log("Writing Complete");
        };
        //write info to file.
        fs.writeFile(path, data, after_write);      
};

let fullPath;

/*while loop calls passData while there are file to write. Inside passData is the async
method writeFile which is called and populated to the thead pool. The
callback method is not insantly called due to stack not being empty
because of while loop calls. Then upon thead finishing task, call back methdods
are executed (when call stack is empty) in order they were added to call back queue*/ 

while(fileNumber <= input)
{
    //if need of pad
    if(fileNumber < 10)
    {
        let pad = String(fileNumber).padStart(2, "0");
        fullFileName = pad.concat(partialFileName);
    }   
    //else no pad 
    else
        fullFileName = String(fileNumber).concat(partialFileName);
    //define full path, increment file processed and call passData
    fullPath = folder.concat(fullFileName);
    fileNumber++;
    passData(fullPath, fullFileName, data, fileNumber);
}
