/*
=======================
02-n-files-synchronously.js
=======================

Student ID: 23651127

Comment (Required): I decided to wirte n files in sych using 
recursion in the following alogrithm:

1 - define variables needed for task
2- define the call back methdo for fs.writeFile
    2.0 - if error in writing, log it
    2.1 - white to console file that finished being written
    2.2 - increment fileNumber and pad it if needed
    2.3 - if there are more files, recursive call to fs.write. otherwise log final message.
3 - encapsulate 2 to 2.3 in passData method, which initiates the recursion at 2.0
4 - when all above is defined, call passData with all required information

Vagner++
=======================
*/

//variables used for the task.
const fs = require("fs");
let input = 57; //i.e input = 57 then files run from 01 to 57.
let folder = "./output/";
let fileNumber = 1;
let partialFileName = "-output.txt";
let fullFileName;
let data = "Data-2"; 

//I am assuming the folder for output is there, otherwise please uncomment line below
//fs.mkdir("./output", {recursive: false}, function(err) { });

//method that encapsulates the call back methdod for fs.write
const passData = function(path, number, file, data)
{
        //call back method for fs.write.
        after_write = function(err)
        {  
            if(err)
                console.log(err);
            else
            {  
               let pad = String(number).padStart(2, "0");
               console.log(pad.concat(file));
               if(++number <= input)
               {
                    let pad = String(number).padStart(2, "0");
                    fs.writeFile(path.concat(pad).concat(file), data, after_write);
               }
               else
               console.log("Writing Complete");
            }
        };
        //first call in the recursion.
        fs.writeFile(path.concat(String(number).padStart(2, "0")).concat(file), data, after_write);
};
    //initiate task by calling passData with all needed information.
    passData(folder, fileNumber, partialFileName, data);

