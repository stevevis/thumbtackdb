# ThumbtackDB

A very simple in-memory database that supports the following commands:

* SET name value – Set the variable name to the value value. Neither variable names nor values will contain spaces.

* GET name – Print out the value of the variable name, or NULL if that variable is not set.

* UNSET name – Unset the variable name, making it just like that variable was never set.

* NUMEQUALTO value – Print out the number of variables that are currently set to value. If no variables equal that value, print 0.

* END – Exit the program. Your program will always receive this as its last command.

* BEGIN – Open a new transaction block. Transaction blocks can be nested; a BEGIN can be issued inside of an existing block.

* ROLLBACK – Undo all of the commands issued in the most recent transaction block, and close the block. Print nothing if successful, or print NO TRANSACTION if no transaction is in progress.

* COMMIT – Close all open transaction blocks, permanently applying the changes made in them. Print nothing if successful, or print NO TRANSACTION if no transaction is in progress.

## Instructions

Install a recent version of Node.js (or io.js) and clone this package to a local directory:

`git clone https://github.com/stevevis/thumbtackdb.git`

Run the interactive command line with:

`npm run thumbtackdb`

Run the test suite with:

`npm run test`

## Implementation Details

This database is built on a hash map. There are much more efficient data structures for building main memory databases including T-Trees (http://www.vldb.org/conf/1986/P294.PDF), B-Trees, and CSS-Trees (http://www.vldb.org/conf/1999/P7.pdf). However, this whole project is only supposed to take 30-90 minutes to build and I don't like my chances of researching and implementing a more advanced data structure in that time. So I went with the simplest solution I could think of.
