/*
=======================
05-batch-b.js
=======================
Student ID:
Comment (Required): For this task I again decided in which order the
methods should be called and the recursion needed to accomplish it. 
I implemented the following algorithm:

1 - define variables needed to accomplish the tasks
2 - define the call back method for fs.writeFile
    2.1 - if error, log it
    2.2 - if there are not more files to write, print information
        2.2.1 - readdirSync call to get all file names into an array
        2.2.2 - call readArrayOfFiles and pass array of file names
3 - ecapsulate 2 - 2.2 in createFileWithData which accepts data for files to be writtens as param
    3.1  - cause a file to be written by calling fs.write
4 - define callback method for fs.readFile
    4.1 - if error, log it;
    4.2 - increment files processed
    4.3 - append file information to string variable
    4.4 - if file limit for string is reached, call fs.writeFile with information
    4.5 - on last pass, fs.writeFile contents of string as you may have some content that did not reach the limit 
5 - define function that accepts an array of file names passed from 2.2.2
    5.1 - call async'ly in a loop fs.writeFile for each file in array received as parameter
6 - while loop to create files to be used as input
6.1 - if padding for file name is needed, pad it
6.2 - increment number of files created
6.3 - call createFileWithData to create one file

NOTE: A lot of times all files are written in order depite calls being made async'ly, but
      when i set my battery usage and CPU to extreme power saving mode I see files written
      out of order. For a while I thought my while loop was somehow not calling
      functions async'ly, but the cache, data uniformity in input files and
      processor speed interfered. Just a heads up. Small 'b' variables show 
      async execution more easyly because frequency fs.writeFile call increases,
      which increases the call back methods in callback queue and probability
      of stuff being written out of order.

      Vagner++

=======================
*/
const fs = require("fs");
const input_dir = "./input/";
const output_dir = "./output/";
const input_files = fs.readdirSync(input_dir);

//some variables;
let input = 61;   // i.e input = 57 then files run from 1 to 57.
let chunk = 5;    // a number less than input, files are written in chunk sizes
let fileNumber = 1;
let partialFileName = "-output.txt";
let fullFileName;
let data = "Contents of Input File "; 
let filesProcessed = 0;
let fileNameArray = [];  //used to write the input file names into
let arrayIndex = 0;
let partialString = "";
let outputFileIndex = 1;

//I am assuming the folder for output is there, otherwise please uncomment line below
//fs.mkdir("./output", {recursive: false}, function(err) { });

//createFileWithData method with data for specific files to write to.
// They will be used as input for the task.
const createFileWithData = function(path, file, data, number)
{
        //call back method for fs.writeFile
        after_write = function(err)
        {
        //if err log it
         if(err)
             console.error(err);
         else
            // increment number of files processed
            filesProcessed++;
            //if there are not more file sto process, write information on console, read all file names in dir, call readArrayOfFiles
            if(filesProcessed == input)
            {
                //prints information on console about the task to be done
                console.log("A total of", filesProcessed, "files created to be used as input.");
                console.log("Each output file has at most" , chunk, "lines.");
                console.log("There are", Math.ceil(input / chunk), "output files with the contents read from input files");
                //read all file names in dir
                fileNameArray = fs.readdirSync(input_dir, {encoding: "utf8"});
                //passes the array of file names to method that will read the contents async'ly
                readArrayOfFiles(fileNameArray);
            }
        };
        //write info to file.
        fs.writeFile(path, data.concat(String(number - 1).padStart(2, "0")), after_write);      
};

//call back method for after reading input.
let after_readingInput = function(err, data)
{
    //case readFile error print message
    if(err)
        console.error("Error Reading the File in Array");
    filesProcessed++;
    partialString += (data.concat("\r\n"));
    //if a chunck of data is read, write to file
    if((filesProcessed ) % (chunk) == 0)
    {
        fs.writeFile(output_dir.concat(String(outputFileIndex++).concat("-output.txt")), partialString, function(){if(err)console.log("ERROR");})
        partialString = "";
    }       
    //leftover of string at the end is written to file
    if(filesProcessed == input && partialString.length > 0)
    {
        fs.writeFile(output_dir.concat(String(outputFileIndex++).concat("-output.txt")), partialString, function(){if(err)console.log("ERROR");})
    }
};

//read array of files names using a while loop in async manner
function readArrayOfFiles(fileArray)
{
    filesProcessed = 0;
    while(arrayIndex < fileArray.length)
    {
        fs.readFile(input_dir.concat(fileArray[arrayIndex++]), {encoding: "utf8"}, after_readingInput)
    }
}

/*while loop calls createFileWithData while there are file to write. Inside createFileWithData is the async
method writeFile which is called and populated to the thead pool. The
callback method is not insantly called due to stack not being empty
because of while loop calls. Then upon thead finishing task, call back methdods
are executed (when call stack is empty) in order they were added to callback queue*/ 
let fullPath;
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
    fullPath = input_dir.concat(fullFileName);
    fileNumber++;
    //create a file with data
    createFileWithData(fullPath, fullFileName, data, fileNumber);
}

