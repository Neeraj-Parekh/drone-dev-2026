#!/bin/bash
source /mnt/20265E15265DEC72/study/CODE/linux_venv/bin/activate
cd /mnt/20265E15265DEC72/study/CODE/projects/hardware/drone
python3 verify_v7.py > /mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/verify_output.txt 2>&1
echo "Exit: $?" >> /mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/verify_output.txt
