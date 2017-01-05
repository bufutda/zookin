#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
>$OUTPUT
dialog --backtitle "Zookin TUI" --nook --nocancel --inputbox "Ciphertext: " 8 100 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)
case $CODE in
    0)
        # ciphertext entered
        zookin-bruteforce --table -c "$MENU" 2>&1 | ansifilter > /tmp/zookinoutp.txt
        dialog --backtitle "Zookin TUI" --textbox /tmp/zookinoutp.txt $(($(tput lines) - 10)) $(($(tput cols) - 10))
        rm /tmp/zookinoutp.txt
        ;;
    *)
        exit $CODE
        ;;
esac
