# zookin
Cipher and Cryptography utility in NodeJS  
Cipher groundwork from [http://rumkin.com](http://rumkin.com) by Tyler Atkins

###Installation
```bash
$ git clone https://github.com/bufutda/zookin.git zookin
$ cd zookin
$ npm install -g
```

###Usage
####Ciphers
Encode text with vigenere using "cipher" as the key
```bash
$ zookin vigenere -e -k cipher -c supersecretmessage
```
Decode text with vigenere using "cipher" as the key
```bash
$ zookin vigenere -d -k cipher -c ucelvjgkglxdgahhkv
```
Bruteforce vignere ciphertext
```bash
$ zookin vignere -c ucelvjgkglxdgahhkv -b
```
Bruteforce unknown ciphertext
```bash
$ zookin bruteforce -c ucelvjgkglxdgahhkv
```
####Altering the Ranking
Use a different dictionary with `-p`  
WordTrees are used to rank cipher results
Export the current wordTree
```bash
$ zookin wordtree --export path/to/wordtree/
```
Import a wordTree
```bash
$ zookin wordtree --import path/to/wordtree/
```
Generate a new wordTree
```bash
$ zookin wordtree -g path/to/dict
```
Add a word to the wordTree
```bash
$ zookin wordtree -a foobar
```
