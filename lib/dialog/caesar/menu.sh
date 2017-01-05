#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
while true; do
    dialog --backtitle "Zookin TUI" --extra-button --extra-label "Return" --menu "Zookin | Ciphers | Caesarian Shift" 11 100 90 \
        "Bruteforce" "Attempt a bruteforce on some ciphertext" \
        "Encrypt" "Encrypt some ciphertext" \
        "Decrypt" "Decrypt some ciphertext" \
        "Look at All" "View all options of decryption" 2>$OUTPUT
    CODE=$?
    MENU=$(<$OUTPUT)

    case $CODE in
        0)
            # menu item selected
            case $MENU in
                "Bruteforce")
                    eval "${DLG}caesar/bruteforce.sh"
                    ;;
                "Encrypt")
                    eval "${DLG}caesar/encrypt.sh"
                    ;;
                "Decrypt")
                    eval "${DLG}caesar/decrypt.sh"
                    ;;
                "Look at All")
                    eval "${DLG}caesar/all.sh"
                    ;;
            esac
            continue
            ;;
        *)
            exit $CODE
            ;;
    esac
done
