#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"

dialog --backtitle "Zookin TUI" --nook --nocancel --separate-widget "	" \
    --begin 4 4 --inputbox "Plaintext: " 8 100 \
    --and-widget \
    --begin 8 8 --inputbox "Letter to remove from Tableau: " 8 100 \
    --and-widget \
    --begin 12 12 --inputbox "Letter to map to the removed letter: " 8 100 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)
IFS="	"
SWITCH=1
for i in $MENU; do
    case $SWITCH in
        1)
            A=$i
            SWITCH=2
            ;;
        2)
            B=$i
            SWITCH=3
            ;;
        3)
            C=$i
            SWITCH=4
            ;;
    esac
done
unset IFS

CIPHER=$(zookin-bifid -d -c "$A" -1 "$B" -2 "$C")
dialog --backtitle "Zookin TUI" --msgbox "Decrypted text: ${CIPHER^^}" 8 100
