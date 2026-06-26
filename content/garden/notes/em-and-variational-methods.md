---
title: "EM and Variational Methods"
description: "A short technical bridge between EM, ELBOs, variational inference, and approximate inference."
kind: note
status: seed
version: v2
topics: [statistics, machine-learning, approximate-inference]
tags: [technical-note, em, variational-inference, elbo]
date: 2026-06-25
updated: 2026-06-25
draft: false
sketch: ""
---

The useful bridge between EM and variational methods is that both replace a hard likelihood problem with an easier optimization problem over a lower bound or surrogate.

## The Basic Problem

Suppose $x_1,\ldots,x_n$ are observed and $z_1,\ldots,z_n$ are latent or missing. The observed log likelihood is hard because the latent variables have been integrated out:

$$
\ell(\theta)
= \sum_{i=1}^n \log p_\theta(x_i)
= \sum_{i=1}^n \log \int p_\theta(x_i,z_i) dz_i.
$$

If the complete data $(x_i,z_i)$ were observed, we would maximize $\sum_i \log p_\theta(x_i,z_i)$ directly. EM and variational methods are ways to proceed when that complete-data likelihood is unavailable.

For any distribution $q_i(z_i)$ over the latent variable, the central identity is:

$$
\log p_\theta(x_i)
= \underbrace{E_{q_i}\{\log p_\theta(x_i,z_i)\} - E_{q_i}\{\log q_i(z_i)\}}_{\operatorname{ELBO}_i(\theta,q_i)}
+ \underbrace{KL(q_i(z_i)\|p_\theta(z_i\mid x_i))}_{\text{gap}}.
$$

Because the KL gap is nonnegative, the ELBO is a lower bound on the observed log likelihood:

$$
\operatorname{ELBO}_i(\theta,q_i) \leq \log p_\theta(x_i).
$$

This identity is the hinge between EM and variational inference.

## EM as Exact Coordinate Ascent

Classical EM alternates between optimizing over the latent-variable distribution and optimizing over the model parameter.

At iteration $t$, the E-step sets

$$
q_i^{(t)}(z_i) = p_{\theta^{(t)}}(z_i\mid x_i).
$$

This makes the KL gap equal to zero at the current parameter value. The M-step then updates

$$
\theta^{(t+1)}
= \arg\max_\theta \sum_{i=1}^n E_{q_i^{(t)}}\{\log p_\theta(x_i,z_i)\}.
$$

The usual $Q$-function is therefore:

$$
Q(\theta\mid\theta^{(t)})
= \sum_{i=1}^n E_{p_{\theta^{(t)}}(z_i\mid x_i)}
\{\log p_\theta(x_i,z_i)\}.
$$

The monotonicity result follows from the ELBO identity. Since $q_i^{(t)}$ is the exact posterior under $\theta^{(t)}$,

$$
\ell(\theta^{(t)})
= \sum_{i=1}^n \operatorname{ELBO}_i(\theta^{(t)},q_i^{(t)}).
$$

For any proposed $\theta$,

$$
\ell(\theta)
\geq \sum_{i=1}^n \operatorname{ELBO}_i(\theta,q_i^{(t)}).
$$

So if the M-step improves the surrogate,

$$
\sum_i \operatorname{ELBO}_i(\theta^{(t+1)},q_i^{(t)})
\geq
\sum_i \operatorname{ELBO}_i(\theta^{(t)},q_i^{(t)}),
$$

then the observed likelihood cannot decrease:

$$
\ell(\theta^{(t+1)}) \geq \ell(\theta^{(t)}).
$$

This is the clean version of the Jensen/KL argument: the proof is not magic, it is lower-bound optimization with the bound tight at the current iterate.

## Generalized and Variational EM

Exact EM is not the only useful version.

Generalized EM does not require an exact maximizer in the M-step. It only requires an update that improves the surrogate. This is useful when the M-step is itself difficult.

Variational EM changes the E-step. Instead of setting $q_i$ equal to the exact posterior, we restrict $q_i$ to a tractable family $\mathcal Q$ and optimize:

$$
q_i^{(t)}
= \arg\max_{q_i\in\mathcal Q}
\operatorname{ELBO}_i(\theta^{(t)},q_i).
$$

Then the M-step maximizes the same ELBO with respect to $\theta$:

$$
\theta^{(t+1)}
= \arg\max_\theta
\sum_{i=1}^n \operatorname{ELBO}_i(\theta,q_i^{(t)}).
$$

If $\mathcal Q$ contains the true posterior, variational EM reduces to exact EM. If $\mathcal Q$ is restricted, the procedure optimizes a different target: the best approximation available inside the variational family.

That distinction matters. Variational methods can converge perfectly to the wrong statistical target if the approximating family is too restrictive.

## Why Mixtures Are the Canonical Example

Finite mixtures make the EM logic visible. If $z_i$ is the latent class label for observation $x_i$, the E-step computes responsibilities:

$$
r_{id}
= p_{\theta^{(t)}}(z_i=d\mid x_i)
\propto \pi_d^{(t)} f_d(x_i\mid\mu_d^{(t)},V_d^{(t)}),
$$

with $\sum_d r_{id}=1$. The M-step then treats those responsibilities like soft class memberships:

$$
\pi_d^{(t+1)} = \frac{1}{n}\sum_i r_{id},
$$

$$
\mu_d^{(t+1)}
= \frac{\sum_i r_{id}x_i}{\sum_i r_{id}},
$$

$$
V_d^{(t+1)}
= \frac{\sum_i r_{id}(x_i-\mu_d^{(t+1)})(x_i-\mu_d^{(t+1)})^\top}{\sum_i r_{id}}.
$$

This example is useful because the hidden labels are intuitive, the E-step has a concrete probabilistic meaning, and the M-step resembles weighted maximum likelihood.

## Variational Inference as M-Estimation

Once the variational family is fixed, variational inference can often be viewed as $M$-estimation with a profiled criterion.

Let

$$
v(\theta,\psi;x)
= E_{q_\psi}\{\log p_\theta(x,z) - \log q_\psi(z)\}.
$$

Here $\theta$ is the structural parameter and $\psi$ indexes the variational approximation for the latent variables. Define the profiled criterion:

$$
m(\theta;x)
= \sup_{\psi\in\Psi} v(\theta,\psi;x).
$$

Then the variational estimator solves:

$$
\hat\theta_n
= \arg\max_{\theta\in\Theta}
\frac{1}{n}\sum_{i=1}^n m(\theta;x_i).
$$

This framing separates algorithmic convergence from statistical validity. Under regularity conditions, $\hat\theta_n$ may converge to

$$
\bar\theta
= \arg\max_\theta E_{P_0}\{m(\theta;X)\}.
$$

But $\bar\theta$ is the variational target, not automatically the true parameter $\theta_0$. If the model is correctly specified and the variational family is rich enough, the two may coincide. If the variational family is too restrictive, $\bar\theta$ may be a pseudo-true parameter induced by the approximation.

## Variational Bayes

Variational Bayes moves the approximation from latent variables alone to latent variables and parameters together. Instead of approximating $p_\theta(z\mid x)$ for a fixed $\theta$, VB approximates:

$$
p(\theta,z\mid x).
$$

A common mean-field approximation uses a factorization such as:

$$
q(\theta,z)
= q_\theta(\theta)\prod_i q_i(z_i).
$$

This factorization often makes computation much easier, but it deliberately removes posterior dependence. That is why mean-field variational Bayes can produce useful point estimates while understating posterior uncertainty.

## Modern Extensions Worth Knowing

Recent variational work mostly changes one of four things: how the ELBO is optimized, how expressive $q$ is, which divergence is minimized, or whether the approximation is represented by parameters, neural networks, particles, or transport maps.

### Stochastic and Black-Box VI

The classical derivation of EM often depends on model-specific algebra. Black-box and automatic-differentiation VI make the objective more reusable by estimating gradients of the ELBO directly.

A generic score-function gradient is:

$$
\nabla_\lambda \operatorname{ELBO}(\lambda)
= E_{q_\lambda(z)}
\left[
\nabla_\lambda \log q_\lambda(z)
\{\log p(x,z)-\log q_\lambda(z)\}
\right].
$$

When $z=g_\lambda(\epsilon)$ for fixed noise $\epsilon$, the reparameterization gradient instead differentiates through the sampled latent variable:

$$
\nabla_\lambda E_{q_\lambda(z)}[h(z)]
= \nabla_\lambda E_{\epsilon}[h(g_\lambda(\epsilon))].
$$

This is the mathematical move behind much of modern scalable VI, including VAEs and probabilistic programming implementations.

### Amortized VI

Classical variational inference often gives each observation its own variational parameter $\psi_i$. Amortized VI replaces those local parameters with an inference network:

$$
\psi_i = h_\phi(x_i).
$$

This is faster at scale because the network learns a reusable map from data to variational parameters. The tradeoff is an amortization gap: even if the variational family is expressive enough, the inference network may fail to find the best member of that family for each observation.

A useful decomposition is:

$$
\log p_\theta(x) - \operatorname{ELBO}(\theta,\phi;x)
= \text{approximation gap} + \text{amortization gap} + \text{optimization gap}.
$$

For an applied note, this is often more useful than a longer derivation because it explains where the error comes from.

### Richer Variational Families

Mean-field VI is computationally convenient but often too rigid. Normalizing flows improve the approximation by transforming a simple base draw through an invertible map:

$$
z_K = f_K\circ\cdots\circ f_1(z_0).
$$

The density changes by the Jacobian correction:

$$
\log q_K(z_K)
= \log q_0(z_0)
- \sum_{k=1}^K
\log \left|
\det \frac{\partial f_k}{\partial z_{k-1}}
\right|.
$$

This lets $q$ represent more complex posterior geometry while keeping density evaluation tractable.

### Tighter and Alternative Bounds

The standard ELBO uses reverse KL:

$$
KL(q(z)\|p(z\mid x)).
$$

That choice is computationally useful, but it can be mode-seeking and uncertainty-shrinking. More recent work studies alternative objectives, including importance-weighted bounds and Rényi bounds.

The importance-weighted objective is:

$$
\mathcal L_K
= E_{z_{1:K}\sim q}
\left[
\log \frac{1}{K}
\sum_{k=1}^K
\frac{p(x,z_k)}{q(z_k)}
\right].
$$

As $K$ increases, this can give a tighter lower bound than the one-sample ELBO.

Rényi variational objectives replace the KL-based ELBO with a family indexed by $\alpha$, letting the analyst trade off different approximation behavior:

$$
D_\alpha(p\|q)
= \frac{1}{\alpha-1}
\log E_q\left[\left(\frac{p(z)}{q(z)}\right)^\alpha\right].
$$

The practical lesson is that "variational inference" is no longer just mean-field ELBO maximization. It is a family of optimization-based approximations, and the choice of objective determines what kinds of errors the approximation is likely to make.

### Particle and Transport Views

Another modern direction treats inference as moving particles or probability measures toward a target distribution. Stein variational gradient descent, for example, updates particles through a functional gradient flow designed to reduce KL divergence. Wasserstein-gradient-flow approaches similarly frame variational inference as optimization over probability measures rather than only over finite-dimensional variational parameters.

This is probably too much for the first version of the note, but it is worth remembering as the conceptual endpoint: EM starts as surrogate optimization for missing data, while modern variational inference becomes optimization over distributions.

## References To Expand

- [[https://arxiv.org/abs/1601.00670|Blei, Kucukelbir, and McAuliffe, Variational Inference: A Review for Statisticians]]
- [[https://arxiv.org/abs/1401.0118|Ranganath, Gerrish, and Blei, Black Box Variational Inference]]
- [[https://arxiv.org/abs/1603.00788|Kucukelbir et al., Automatic Differentiation Variational Inference]]
- [[https://arxiv.org/abs/1801.03558|Cremer, Li, and Duvenaud, Inference Suboptimality in Variational Autoencoders]]
- [[https://arxiv.org/abs/1505.05770|Rezende and Mohamed, Variational Inference with Normalizing Flows]]
- [[https://arxiv.org/abs/1509.00519|Burda, Grosse, and Salakhutdinov, Importance Weighted Autoencoders]]
- [[https://arxiv.org/abs/1602.02311|Li and Turner, Rényi Divergence Variational Inference]]
- [[https://arxiv.org/abs/1608.04471|Liu and Wang, Stein Variational Gradient Descent]]
- [[https://arxiv.org/abs/2207.08074|Yao and Yang, Mean-field Variational Inference via Wasserstein Gradient Flow]]
