import numpy as np

border: float = 2.0


def module_deviation(x, mu: float, sigma: float) -> float:
    return abs((x - mu) / sigma)


def delete_deviations(values):
    x = np.array([values[_][0] for _ in range(len(values))])
    y = np.array([values[_][1] for _ in range(len(values))])
    mu_x = np.mean(x)
    mu_y = np.mean(y)
    sigma_x = np.std(x)
    sigma_y = np.std(y)
    res = []
    for _ in range(len(values)):
        if module_deviation(x[_], mu_x, sigma_x) < border and module_deviation(y[_], mu_y, sigma_y) < border:
            res.append([x[_], y[_]])
    return res
