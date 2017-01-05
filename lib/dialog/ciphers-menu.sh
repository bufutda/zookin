#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
dialog --backtitle "Zookin TUI" --menu "Zookin | Ciphers" 14 100 90 \
    "Vigenere" "Change the value of N with each letter based on a passphrase" \
    "Caesarian Shift" "Shift each letter by N" \
    "Rotate" "Write the letters in a rectangular grid and then rotate it" \
    "Skip" "Write down the letter, count forward N characters" \
    "Affine" "Caesarian shift with a multiplier" \
    "Bifid" "Some crazy shit right here" \
    "Playfair" "Use pairs of letters and a 5x5 grid to encode a message." 2>$OUTPUT
CODE=$?
MENU=$(<$OUTPUT)

case $CODE in
    0)
        # menu item selected
        case $MENU in
            "Vigenere")
                eval "${DLG}vigenere/menu.sh"
                ;;
            "Caesarian Shift")
                eval "${DLG}casear/menu.sh"
                ;;
            "Rotate")
                eval "${DLG}rotate/menu.sh"
                ;;
            "Skip")
                eval "${DLG}skip/menu.sh"
                ;;
            "Affine")
                eval "${DLG}affine/menu.sh"
                ;;
            "Bifid")
                eval "${DLG}bifid/menu.sh"
                ;;
            "Playfair")
                eval "${DLG}playfair/menu.sh"
                ;;
        esac
        ;;
    *)
        exit $CODE
        ;;
esac
