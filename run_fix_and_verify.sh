#!/bin/bash
source /mnt/20265E15265DEC72/study/CODE/linux_venv/bin/activate
cd /mnt/20265E15265DEC72/study/CODE/projects/hardware/drone
python3 fix_report_v6.py > /mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/fix_output2.txt 2>&1
echo "Exit: $?" >> /mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/fix_output2.txt
python3 verify_v7.py >> /mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/fix_output2.txt 2>&1
echo "Verify Exit: $?" >> /mnt/20265E15265DEC72/study/CODE/projects/hardware/drone/fix_output2.txt
