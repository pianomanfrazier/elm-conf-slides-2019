#!./venv/bin/python3

import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

font = { 'weight': 'bold' }

sns.set()
sns.set_context('talk')
plt.rc('text')

x = [1, 2, 3.5]
y1 = [5, 6.5, 12]
plt.plot(x, y1, label="Meaningful", marker="o")

y2 = [2, 2.1, 2.2]
plt.plot(x, y2, label="Random", marker="o")


plt.xticks(x, ('1000 to 1200', '1250 to 1350', '1550 to 1750'))
plt.xlabel(r"USCF Rating", fontdict=font)
plt.ylabel(r"Number of Pieces Placed Correctly", fontdict=font)
plt.tight_layout()
plt.legend()
plt.show()
# plt.savefig('../img/chess.svg')
