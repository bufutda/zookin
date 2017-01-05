#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
while true; do
    dialog --backtitle "Zookin TUI" --extra-button --extra-label "Return" --menu "Zookin | Ciphers | Bifid" 10 100 90 \
        "Bruteforce" "Attempt a bruteforce on some ciphertext" \
        "Encrypt" "Encrypt some ciphertext" \
        "Decrypt" "Decrypt some ciphertext" 2>$OUTPUT
    CODE=$?
    MENU=$(<$OUTPUT)

    case $CODE in
        0)
            # menu item selected
            case $MENU in
                "Bruteforce")
                    eval "${DLG}bifid/bruteforce.sh"
                    ;;
                "Encrypt")
                    eval "${DLG}bifid/encrypt.sh"
                    ;;
                "Decrypt")
                    eval "${DLG}bifid/decrypt.sh"
                    ;;
            esac
            continue
            ;;
        *)
            exit $CODE
            ;;
    esac
done
