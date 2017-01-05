#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"

dialog --backtitle "Zookin TUI" --nook --nocancel --separate-widget "	" \
    --inputbox "Plaintext: " 8 100 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)

CIPHER=$(zookin-playfair -e -c "$MENU")
dialog --backtitle "Zookin TUI" --msgbox "Encrypted text: ${CIPHER^^}" 8 100
