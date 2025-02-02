# NodeJavascriptAsyncMethods   

--- 
  
<i>
<p>This assignment explores asynchronous programming in JavaScript.</p>    
<p>Learning Goals:</p> 
<ul>   
<li>The asynchronous programming paradigm.</li>  
<li>The architecture of the JavaScript runtime engine.</li>   
</ul>
</i>

 <hr>

<b>1. Writing N Files Asynchronously [25%]   
Allowed Node.js API Functions: fs.writeFile()   
>Input: Integer n ( 0 < n < 100 )   
>Output: n Files </b>    

Create a program that asynchronously write n files 01-output.txt up to 99-output.txt to
a subdirectory output . Each file should contain the text "Data-1" . After each successful
write, print a message to console with the filename. After all nfiles are finished writing, print
an additional message "Writing Complete". Run the script a few times, the filenames printed
should almost never be in order.
A common mistake is to put the print statements inside the same loop that calls
fs.write(). This is not correct as the print statements will re immediately (before a
single write has been guaranteed to finish). Put them inside the callback function instead.
Use String.padStart() to pad zeros.  


<b>2. Writing N Files Synchronously [25%]  
Allowed Node.js API Functions: fs.writeFile()  
>Input: Integer n ( 0 < n < 100 )  
>Output: n Files </b>   

Create a program that synchronously write nfiles 01-output.txt up to 99-output.txt to a
subdirectory output . Each le should contain the text "Data-2" . After each successful
fs.writeFile() print a message to console with the filename. After all n files are finished,
print an additional message "Writing Complete". Run the script a few times, the filenames
printed should always be in order.
Caution: For this assignment do not use fs.writeFileSync() , the purpose of this
question is to show understanding of how to write synchronous code using asynchronous
methods.
In general check the Allowed Node.js API Functions.
Utility functions that are part of JavaScript (eg. Array.flat , Array.join , Array.split )
are allowed. (Anything on MDN is fine).   


<b>3. Personal Hosts File [20%]   
Allowed Node.js API Functions: fs.readFile() , fs.writeFile() , dns.resolve()   
>Input: File: domains.txt    
>Contains one valid domain name on each line.      
>All supplied domains will only have a single IP addresses associated with it.    
>Output: File hosts.txt </b>    

Write a program that reads from a le domains.txt residing in a directory input . It contains a
list of valid domains one on each line, resolve each domain found to IP addresses, and save the
results into a le hosts.txt residing in a directory output . The output format should be
ip_address , a tab character ( \t ), domain_name .
The order in which the results appear does not matter. (But see Ungraded Additional Question)
Sample Output:
Possibly helpful utility Functions
String.split("\r\n")
Ungraded Additional Question
The order that the IP addresses come back is not guaranteed to match the order the
domains came in, however a minor change can be made to your code such that this
becomes true.
Refer to Example 10: Preserving Order


<b>4. Four synchronous tasks [20%]    
Allowed Node.js API Functions: fs.readFile() , zlib.inflate() , dns.resolve(),
fs.writeFile()   
>Input: domain.deflated   
>Output: File: ip_address.txt</b>   

Write a program that:  
1. Reads domain.deflated (Use {encoding:null} ),
2. Decompresses the contents using zlib.deflate() , covert the resulting buer to a string
using .toString("utf8") the decompressed data will be a valid domain that resolves to a
single IP address.
3. Using dns.resolve() convert the domain into an IP address.
4. Remove the array wrapper and write the IP address to a le ip_address.txt


<b>5. batch-b [5pt]   
Allowed Node.js API Functions: fs.readFile() , fs.writeFile()   
I've also used fs.readdirSync() in the template which will get the filenames of all files in a
directory and put them into an array.   
149.4.199.190 venus.cs.qc.cuny.edu   
149.4.211.163 cs.qc.cuny.edu    
>Input: n ( 0 < n < 100 ) Files  
>Integer b ( 0 < b < n ) Chunk Size
>Output: Files </b>   

Create a program that asynchronously reads n files 01-input.txt up to 99-input.txt .
For every b files read, write the contents of those input files to the next output file. Use
"utf8" encoding. If there are fewer than b input files remaining, put the remaining content in
the last output file.
Use the format 01-output.txt to m-output.txt (Pad filename with 0 if m < 10 )
In total there should be m files where m = Math.Ceil(n / b)
Example:   
n = 11 ( 01-input.txt to 11-input.txt )   
b = 5 (batch 5 at a time)    
m = 3 so we have three files 01-output.txt , 02-output.txt , and 03-output.txt where last file has one line of text and others have five.      
Possibly helpful utility Functions    
Math.ceil() , Array.push() , Array.slice() , String.join   
Try to replicate the example rst, hard code n=11 and b=5 , from there try generalizing
the solution.   


<b>6. Decode the secret message [5pt]    
Allowed Node.js API Functions: fs.readFile() , fs.writeFile() , zlib.inflate()    
I've also used fs.readdirSync() in the template which will get the filenames of all files in a
directory and put them into an array.   
>Input: n Files ( 0 < n < 100 )      
>Each File contains data that has been passed through the DEFLATE compression
algorithm.   
>Output: Binary File ( secret-message.zip ) </b>    

Create a program that reads n files 01-input.txt up to 99-input.txt .
It will then decompress the contents of each one and concatenate the results into a single
buer. The order that they are concatenated in should match their input order.
Save the le as secret-message.zip inside the output directory
Using a standard le decompression tool unzip the result. If the decompression succeeds
you've found the secret message, otherwise there's a bug in your code.
All data is binary in this problem and must be treated as a buer, avoid using "utf8" encoding.
Possibly helpful utility Functions
Buffer.concat()

<em>Vagner++</em>

