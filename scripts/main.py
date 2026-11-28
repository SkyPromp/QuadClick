from math import floor, ceil, log2
from typing import Tuple
from matplotlib.pyplot import plot, xlim, ylabel, xlabel, title, ylim, xscale, legend, xticks, vlines, savefig, hlines


def getAverage(resolution: float, min_size: int = 1) -> Tuple[float, int]:
    print(resolution)
    amount = []
    max_resolution = ceil(resolution / min_size)  # should always be the biggest one
    resolution = max_resolution
    all_resolutions = set()

    while resolution > 1:
        resolution /= 2
        local_res = resolution

        curr_set = set()
        i = 0

        while max_resolution / 2 + local_res * i < max_resolution:
            curr_set.add(floor(max_resolution / 2 + local_res * i))
            curr_set.add(floor(max_resolution / 2 - local_res * i))

            i += 1

        amount.append(curr_set - all_resolutions)
        all_resolutions = all_resolutions.union(curr_set)

    amount = [len(x) for x in amount]
    weighted = [i * x for i, x in enumerate(amount, start=0)]

    total = sum(amount)
    if total == 0:
        return 0, len(amount) - 1 if len(amount) > 0 else 0

    return sum(weighted)/total, len(amount) - 1


max_res = 3840

xlabel("Effective resolution (log2(px))")
ylabel("Average motions")
title("Average motions per effective resolution")
x = [i for i in range(1, max_res + 1)]
y = [getAverage(i, 1)[0] for i in range(1, max_res + 1)]

vlines(x=(px := max_res), ymin=0, ymax=getAverage(px, 1)[0], color="red", linestyle="--", label=f"{px}px")
vlines(x=(px := 2560), ymin=0, ymax=getAverage(px, 1)[0], color="blue", linestyle="--", label=f"{px}px")
vlines(x=(px := 1920), ymin=0, ymax=getAverage(px, 1)[0], color="green", linestyle="--", label=f"{px}px")
vlines(x=(px := 1280), ymin=0, ymax=getAverage(px, 1)[0], color="pink", linestyle="--", label=f"{px}px")
vlines(x=(px := 1920/50), ymin=0, ymax=getAverage(px, 1)[0], color="purple", linestyle="--", label="1920px -> 50px box")
vlines(x=(px := 1920/100), ymin=0, ymax=getAverage(px, 1)[0], color="black", linestyle="--", label="1920px -> 100px box")

hlines(y=getAverage(px := max_res, 1)[0], xmin=0, xmax=px, color="red", linestyle="--")
hlines(y=getAverage(px := 2560, 1)[0], xmin=0, xmax=px, color="blue", linestyle="--")
hlines(y=getAverage(px := 1920, 1)[0], xmin=0, xmax=px, color="green", linestyle="--")
hlines(y=getAverage(px := 1280, 1)[0], xmin=0, xmax=px, color="pink", linestyle="--")
hlines(y=getAverage(px := ceil(1920/50), 1)[0], xmin=0, xmax=px, color="purple", linestyle="--")
hlines(y=getAverage(px := ceil(1920/100), 1)[0], xmin=0, xmax=px, color="black", linestyle="--")

xscale("log", base=2)
xlim(0, max_res + 1)

ticks = [2 ** i for i in range(ceil(log2(max(x) + 1)) + 1)]
xticks(ticks, [str(tick) for tick in ticks])

plot(x, y, color="C0", label="average amount")

y = [getAverage(i, 1)[1] for i in range(1, max_res + 1)]
plot(x, y, color="black", drawstyle="steps-pre", label="max amount")
ylim(0, ceil(max(y) + 0.1))

legend(loc="upper left", bbox_to_anchor=(0.51, 0.37), fontsize=8, labelspacing=0.3)

savefig("QuadClickMotionsPerResolution.png", dpi=300, bbox_inches="tight")
