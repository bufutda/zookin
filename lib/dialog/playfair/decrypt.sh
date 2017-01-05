#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"

dialog --backtitle "Zookin TUI" --nook --nocancel --separate-widget "	" \
    --inputbox "Ciphertext: " 8 100 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)

CIPHER=$(zookin-playfair -d -c "$MENU")
dialog --backtitle "Zookin TUI" --msgbox "Decrypted text: ${CIPHER^^}" 8 100
