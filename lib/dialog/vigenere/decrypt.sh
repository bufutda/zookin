#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"

dialog --backtitle "Zookin TUI" --nook --nocancel --separate-widget "	" \
    --begin 4 4 --inputbox "Ciphertext: " 8 100 \
    --and-widget \
    --begin 8 8 --inputbox "Key: " 8 100 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)
IFS="	"
SWITCH=1
for i in $MENU; do
    if [ $SWITCH -eq 1 ]; then
        A=$i
        SWITCH=2
    else
        B=$i
    fi
done
unset IFS

CIPHER=$(zookin-vigenere -d -c "$A" -k "$B")
dialog --backtitle "Zookin TUI" --msgbox "Decrypted text: ${CIPHER^^}" 8 100
