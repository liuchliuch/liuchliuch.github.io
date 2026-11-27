---
layout: mondrian-home
permalink: /
author_profile: false
research_filters: true
excerpt: "Chenghua Liu is a PhD student conducting research on large language models at MiMo, with prior interests in quantum computing, algorithms, and complexity."
redirect_from:
  - /about/
  - /about.html
---

<header class="profile-header">
  <h1 itemprop="name">Chenghua Liu</h1>
  <p class="affiliation" itemprop="jobTitle">Fourth-year PhD student · Advisors: <strong><a href="https://www.cs.tsinghua.edu.cn/csen/info/1312/4388.htm" rel="external">Zhengfeng Ji</a></strong> and <strong><a href="https://www.cs.tsinghua.edu.cn/csen/info/1312/4395.htm" rel="external">Mingsheng Ying</a></strong><br><span itemprop="affiliation">Institute of Software, Chinese Academy of Sciences</span></p>
  <p class="contact-links">
    <a href="mailto:{{ site.author.email }}" itemprop="email">Email</a>
  </p>
</header>

<section class="home-section" aria-labelledby="about-title">
  <h2 id="about-title">About</h2>
  <p>I received my B.Sc. in Computer Science and Technology, with a minor in Statistics, from Tsinghua University. My research interests included quantum computing, algorithms, and complexity.</p>
  <p>Recently, my research focus has shifted to large language models, and I am currently conducting research at <a class="mimo-link" href="https://mimo.xiaomi.com/" rel="external" aria-label="MiMo official website"><span>MiMo</span></a>. I am interested in auto-research, post-training, and—more importantly—<strong>safe</strong> self-improvement (beyond my current research).</p>
</section>

<section class="home-section works-days-section" aria-labelledby="works-days-title">
  <h2 id="works-days-title">Works &amp; Days</h2>
  <ol class="publication-list">
    <li class="publication">
      <div class="publication-title">MiMo-V2.6</div>
      <div class="publication-details">Core contributor · <a href="https://mimo.xiaomi.com/mimo-v2-6">Website</a> · <a href="https://arxiv.org/abs/2610.11959">Technical report</a></div>
    </li>

    <li class="publication harness-family">
      <div class="publication-title">Harness Design</div>
      <div class="publication-details">Harnesses for autonomous research, formal verification, and proof refinement.
        <details class="work-design harness-family-design">
          <summary>Explore</summary>
          {% include harness-design.html %}
        </details>
      </div>
    </li>

    <li class="publication">
      <div class="publication-title"><a href="{{ '/countinglib/' | relative_url }}">CountingLib</a> {% include countinglib-mark.html %}</div>
      <div class="publication-details">A Lean library for counting complexity, unifying reusable foundations, verified algorithms, and classification theorems across counting models. <a href="{{ '/countinglib/' | relative_url }}">Website</a></div>
      <div class="publication-details"><span class="picture-book-mark" aria-hidden="true">🧸</span> <a href="{{ '/files/counting-problems-for-babies.pdf' | relative_url }}">Counting Problems for Babies</a> — A picture-book introduction to counting complexity.</div>
    </li>
  </ol>
  <details class="more-work">
    <summary>More work</summary>
    <ol class="publication-list publication-list--secondary" start="4">
      <li class="publication">
        <div class="publication-title">Flow-Matched Motion Priors: Online Optimal-Transport Rewards for Imitation Learning</div>
        <div class="publication-authors">Yilin Zou, <strong>Chenghua Liu</strong>, Chenglong Wu, and Fanghua Jiang. <abbr class="order-mark" data-order="Contribution order" aria-label="Contribution order">C</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.15631">arXiv</a></div>
      </li>
    </ol>
  </details>
</section>

<section class="home-section rising-sea-section" aria-labelledby="rising-sea-title">
  <div class="section-heading">
    <h2 id="rising-sea-title">Rising Sea {% include pinkarc-mark.html %}</h2>
    <a class="repository-link" href="{{ '/repository.html' | relative_url }}">Repository <span aria-hidden="true">→</span></a>
  </div>

  <nav class="research-filters" aria-label="Filter papers by research area" hidden>
    <button type="button" data-research-filter="all" aria-pressed="true">All <span class="research-count">25</span></button>
    <button type="button" data-research-filter="quantum" aria-pressed="false">Quantum <span class="research-count">5</span></button>
    <button type="button" data-research-filter="combinatorics" aria-pressed="false">Combinatorics &amp; complexity <span class="research-count">8</span></button>
    <button type="button" data-research-filter="algorithms" aria-pressed="false">Algorithms &amp; optimization <span class="research-count">10</span></button>
    <button type="button" data-research-filter="simpler" aria-pressed="false">Simpler proofs <span class="research-count">2</span></button>
  </nav>
  <div class="research-group" data-research-group="quantum" role="region" aria-labelledby="research-quantum-title">
    <h3 class="research-group-title" id="research-quantum-title">Quantum computing</h3>
    <ol class="publication-list">
      <li class="publication">
      <div class="publication-title">A Dichotomy for Exact Quantum Circuit <span class="publication-title-tail">Amplitudes {% include pinkarc-mark.html %}</span></div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2611.22899">arXiv</a> · <a href="https://arxiv.org/pdf/2611.22899">PDF</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">Simultaneously Query-Optimal Quantum Linear-System <span class="publication-title-tail">Algorithm {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors">Minbo Gao, Zhengfeng Ji, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.33686">arXiv</a> · <a href="https://github.com/liuchliuch/optimal-qls-lean">Lean</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">A Generalized Stein Lemma for Quantum <span class="publication-title-tail">Channels {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors">Minbo Gao, Zhengfeng Ji, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.30762">arXiv</a> · <a href="https://github.com/liuchliuch/generalized-channel-stein-lean">Lean</a> · <a href="https://arxiv.org/pdf/2609.30762">PDF</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">Quantum Channel Stein’s Lemma with an Exponential Strong <span class="publication-title-tail">Converse {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors">Minbo Gao, Zhengfeng Ji, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.27196">arXiv</a> · <a href="https://github.com/liuchliuch/quantum-channel-stein-lean">Lean</a> · <a href="https://arxiv.org/pdf/2609.27196">PDF</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">Quantum Behaviors Are Not <span class="publication-title-tail">Semialgebraic {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors">Minbo Gao, Zhengfeng Ji, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.18865">arXiv</a> · <a href="https://github.com/liuchliuch/nonsemialgebraic-quantum-behaviors-lean">Lean</a></div>
    </li>
    </ol>
  </div>
  <div class="research-group" data-research-group="combinatorics" role="region" aria-labelledby="research-combinatorics-title">
    <h3 class="research-group-title" id="research-combinatorics-title">Combinatorics &amp; complexity</h3>
    <ol class="publication-list">
      <li class="publication">
      <div class="publication-title">A Dichotomy for Planar Graph Homomorphisms with Nonnegative <span class="publication-title-tail">Weights {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2610.05412">arXiv</a> · <a href="https://github.com/liuchliuch/planar-homomorphisms-lean">Lean</a> · <a href="https://arxiv.org/pdf/2610.05412">PDF</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">A Full Complexity Dichotomy for Complex-Valued Boolean Holant <span class="publication-title-tail">Problems {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors"><strong>Chenghua Liu</strong>, Boning Meng, and Juqiu Wang. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2610.00081">arXiv</a> · <a href="https://github.com/liuchliuch/holant-dichotomy-lean">Lean</a> · <a href="https://arxiv.org/pdf/2610.00081">PDF</a> · <a href="{{ '/holant-comic.html' | relative_url }}"><span aria-hidden="true">💬</span> Comic</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">From Block Orthogonality to Decidability in Complex-Weighted Counting <span class="publication-title-tail">CSP {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2608.14845">arXiv</a> · <a href="https://github.com/liuchliuch/complex-csp-decidability-lean">Lean</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">Hidden Circuits and Exact Counting in Ordered <span class="publication-title-tail">Graphs {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.18132">arXiv</a> · <a href="https://github.com/liuchliuch/hidden-circuits-lean">Lean</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">When Matchgate Base Collapse <span class="publication-title-tail">Fails {% include pinkarc-mark.html %}</span></div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2610.00079">arXiv</a> · <a href="https://arxiv.org/pdf/2610.00079">PDF</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">A Dichotomy for Complex Boolean Holant with Binary <span class="publication-title-tail">Disequality {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.00219">arXiv</a> · <a href="https://github.com/liuchliuch/holant-binary-disequality-lean">Lean</a></div>
    </li>

      <li class="publication">
        <div class="publication-title">Separating Kolmogorov–Loveland randomness from Martin–Löf <span class="publication-title-tail">randomness {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2611.31004">arXiv</a></div>
      </li>

      <li class="publication">
        <div class="publication-title">A disproof of the El-Zahar–Erdős <span class="publication-title-tail">conjecture {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2611.24735">arXiv</a></div>
      </li>
    </ol>
  </div>
  <div class="research-group" data-research-group="algorithms" role="region" aria-labelledby="research-algorithms-title">
    <h3 class="research-group-title" id="research-algorithms-title">Algorithms &amp; optimization</h3>
    <ol class="publication-list">
      <li class="publication">
        <div class="publication-title">The Gvozdenović–Laurent neighborhood bound for the stability <span class="publication-title-tail">number {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://hexagonmath.org/2611.01074v1">Hexagon</a></div>
      </li>

      <li class="publication">
        <div class="publication-title">Tight Bounds for Differentially Private Cut <span class="publication-title-tail">Release {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2611.19538">arXiv</a></div>
      </li>

      <li class="publication">
      <div class="publication-title">Bounded Relative Boundary Implies Narrow DNF <span class="publication-title-tail">Approximation {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.00240">arXiv</a> · <a href="https://github.com/liuchliuch/narrow-dnf-lean">Lean</a></div>
    </li>

      <li class="publication">
        <div class="publication-title">Approximating Combinatorial Contracts with Arbitrary <span class="publication-title-tail">Costs {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors">Xiaotie Deng, Hanyu Li, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">SOSA 2027 · <a href="https://arxiv.org/abs/2609.35803">arXiv</a> · <a href="https://github.com/liuchliuch/combinatorial-contracts-lean">Lean</a></div>
      </li>

      <li class="publication">
        <div class="publication-title">Cardinality-Constrained Randomized Assortments with Balanced Market <span class="publication-title-tail">Share {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors">Xiaotie Deng, Hanyu Li, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.35802">arXiv</a> · <a href="https://github.com/liuchliuch/balanced-assortments-lean">Lean</a></div>
      </li>

      <li class="publication">
        <div class="publication-title">Exact Hill Shares Are Simultaneous <span class="publication-title-tail">Guarantees {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors">Bo Li, Hanyu Li, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.35801">arXiv</a> · <a href="https://github.com/liuchliuch/exact-hill-shares-lean">Lean</a></div>
      </li>

      <li class="publication">
        <div class="publication-title">Optimal Covariance Inflation under Gaussian <span class="publication-title-tail">Tilts {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors">Minbo Gao, Zhengfeng Ji, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.08930">arXiv</a> · <a href="https://github.com/liuchliuch/gaussian-tilt-covariance-lean">Lean</a></div>
      </li>

      <li class="publication">
        <div class="publication-title">Independent Set Discovery on Biclique-Free Graphs Is Fixed-Parameter <span class="publication-title-tail">Tractable {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2609.27837">arXiv</a> · <a href="https://github.com/liuchliuch/independent-set-discovery-lean">Lean</a> · <a href="https://arxiv.org/pdf/2609.27837">PDF</a></div>
      </li>

      <li class="publication">
        <div class="publication-title">Lower Bounds for Domination-Type Problems Parameterized by <span class="publication-title-tail">Rank-Width {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2608.18854">arXiv</a> · <a href="https://github.com/liuchliuch/rankwidth-domination-lean">Lean</a></div>
      </li>

      <li class="publication">
        <div class="publication-title">A Correlation-Gap Bound for Nonlinear Gaussian <span class="publication-title-tail">PCA {% include pinkarc-mark.html %} {% include pinkfold-mark.html tooltip=true %}</span></div>
        <div class="publication-authors">Minbo Gao, Zhengfeng Ji, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
        <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2607.15035">arXiv</a> · <a href="https://github.com/liuchliuch/gaussian-pca-lean">Lean</a></div>
      </li>
    </ol>
  </div>
  <div class="research-group" data-research-group="simpler" role="region" aria-labelledby="research-simpler-title">
    <h3 class="research-group-title" id="research-simpler-title">Simpler proofs</h3>
    <ol class="publication-list">
      <li class="publication">
      <div class="publication-title">A Simplified Proof of PARITY ∉ <span class="publication-title-tail">QAC<sup>0</sup> {% include pinkyak-mark.html tooltip=true %}</span></div>
      <div class="publication-authors">Minbo Gao, Zhengfeng Ji, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://eccc.weizmann.ac.il/report/2026/258/">ECCC</a></div>
    </li>

      <li class="publication">
      <div class="publication-title">A Simplified Proof of the FPRAS for Counting Perfect <span class="publication-title-tail">Matchings {% include pinkyak-mark.html tooltip=true %}</span></div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Boning Meng. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">Preprint · <a href="https://arxiv.org/abs/2610.26803">arXiv</a></div>
    </li>
    </ol>
  </div>
</section>

<section class="home-section publications-section" aria-labelledby="publications-title">
  <h2 id="publications-title">Publications <span class="section-era">(Ancient)</span></h2>

  <ol class="publication-list">
    <li class="publication">
      <div class="publication-title">Quantum Communication Lower Bounds for Search Problems via Matrix Discrepancy</div>
      <div class="publication-authors">Minbo Gao, <strong>Chenghua Liu</strong>, Guangxu Yang, and Tianyi Zhang. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">SODA 2027 · <a href="https://arxiv.org/abs/2607.08517">arXiv</a></div>
    </li>

    <li class="publication">
      <div class="publication-title">Lévy-Khintchine Structure Enables Fast-Forwardable Lindbladian Simulation</div>
      <div class="publication-authors">Minbo Gao, Zhengfeng Ji, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details"><em>Physical Review Letters</em> · <a href="https://journals.aps.org/prl/accepted/29072Y78A3e1f69775ac7c56757f9afcfd0003bc9">APS</a> · <a href="https://arxiv.org/abs/2511.10253">arXiv</a></div>
    </li>

    <li class="publication">
      <div class="publication-title">Quantum Speedups for Log-Concave Sampling from Local Structure</div>
      <div class="publication-authors"><strong>Chenghua Liu</strong>, Qisheng Wang, and Zhengfeng Ji. <abbr class="order-mark" data-order="Contribution order" aria-label="Contribution order">C</abbr></div>
      <div class="publication-details"><span title="Not accepted to NeurIPS 2026">🪦 NeurIPS 2026 <em>casualty</em></span> (<abbr class="rip-mark" tabindex="0" data-tooltip="Laid to rest on arXiv. For eternity." aria-label="R.I.P. — Laid to rest on arXiv. For eternity.">R.I.P.</abbr>) · <a href="https://arxiv.org/abs/2609.20253">arXiv</a></div>
    </li>

    <li class="publication">
      <div class="publication-title">Quantum Composite Hypothesis Testing with Small Error</div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Qisheng Wang. <abbr class="order-mark" data-order="Contribution order" aria-label="Contribution order">C</abbr></div>
      <div class="publication-details">NeurIPS 2026 (to appear)</div>
    </li>

    <li class="publication">
      <div class="publication-title">Accelerating Regression Tasks with Quantum Algorithms</div>
      <div class="publication-authors"><strong>Chenghua Liu</strong> and Zhengfeng Ji. <abbr class="order-mark" data-order="Contribution order" aria-label="Contribution order">C</abbr></div>
      <div class="publication-details">ICML 2026 · <a href="https://arxiv.org/abs/2509.24757">arXiv</a></div>
    </li>

    <li class="publication">
      <div class="publication-title">Quantum Speedup for Hypergraph Sparsification</div>
      <div class="publication-authors"><strong>Chenghua Liu</strong>, Minbo Gao, Zhengfeng Ji, and Mingsheng Ying. <abbr class="order-mark" data-order="Contribution order" aria-label="Contribution order">C</abbr></div>
      <div class="publication-details">ICML 2025 · <a href="https://arxiv.org/abs/2505.01763">arXiv</a> · <a href="{{ '/files/2505.01763-Poster.pdf' | relative_url }}">Poster</a></div>
    </li>

    <li class="publication">
      <div class="publication-title">Quantum Speedup for Sampling Random Spanning Trees</div>
      <div class="publication-authors">Simon Apers, Minbo Gao, Zhengfeng Ji, and <strong>Chenghua Liu</strong>. <abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr></div>
      <div class="publication-details">ICALP 2025 · <a href="https://arxiv.org/abs/2504.15603">arXiv</a> · <a href="{{ '/files/2504.15603-Poster.pdf' | relative_url }}">Poster</a> · <a href="{{ '/files/2504.15603-Lecture.pdf' | relative_url }}">Lecture</a></div>
    </li>
  </ol>
</section>

<aside class="author-order-notes" aria-label="Author order notes">
  <p><abbr class="order-mark" data-order="Alphabetical order" aria-label="Alphabetical order">A</abbr><span>Alphabetical order, common in theoretical fields.</span></p>
  <p><abbr class="order-mark" data-order="Contribution order" aria-label="Contribution order">C</abbr><span>Authors listed in order of contribution.</span></p>
</aside>
