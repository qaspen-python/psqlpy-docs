import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,a as t}from"./app-CuL5AJUr.js";const o={},e=t(`<p><code>Transaction</code> object represents <code>PostgreSQL</code> transaction.<br> There are two ways of how we can work with transactions on <code>PSQLPy</code> side.</p><h3 id="control-transaction-fully-on-your-own" tabindex="-1"><a class="header-anchor" href="#control-transaction-fully-on-your-own"><span>Control transaction fully on your own.</span></a></h3><p>First of all, you can get transaction object only from connection object.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">from</span> psqlpy <span class="token keyword">import</span> PSQLPool


db_pool<span class="token punctuation">:</span> Final <span class="token operator">=</span> PSQLPool<span class="token punctuation">(</span>
    dsn<span class="token operator">=</span><span class="token string">&quot;postgres://postgres:postgres@localhost:5432/postgres&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>startup<span class="token punctuation">(</span><span class="token punctuation">)</span>
    connection <span class="token operator">=</span> <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>connection<span class="token punctuation">(</span><span class="token punctuation">)</span>
    transaction <span class="token operator">=</span> connection<span class="token punctuation">.</span>transaction<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After this you need to start you transaction or in <code>PostgreSQL</code> terms you need to BEGIN it.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    connection <span class="token operator">=</span> <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>connection<span class="token punctuation">(</span><span class="token punctuation">)</span>
    transaction <span class="token operator">=</span> connection<span class="token punctuation">.</span>transaction<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span>begin<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>So, after these manipulations you are ready to make you first query with the transaction.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>
        <span class="token string">&quot;INSERT INTO users (id, username) VALUES ($1, $2)&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&quot;100&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Alex&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Good! We&#39;ve inserted our first row, but if we won&#39;t commit the transaction all changes will discard.</p><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>We need to commit our changes.</p></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span>commit<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>So, now everything is fine, changes are committed. But you can say that it&#39;s too complicated and you are right!<br> We have an alternative way to handle <code>begin()</code> and <code>commit()</code> automatically.</p><h3 id="control-transaction-with-async-context-manager" tabindex="-1"><a class="header-anchor" href="#control-transaction-with-async-context-manager"><span>Control transaction with async context manager.</span></a></h3><p>There is previous example but it is rewritten with use of async context manager.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">from</span> psqlpy <span class="token keyword">import</span> PSQLPool


db_pool<span class="token punctuation">:</span> Final <span class="token operator">=</span> PSQLPool<span class="token punctuation">(</span>
    dsn<span class="token operator">=</span><span class="token string">&quot;postgres://postgres:postgres@localhost:5432/postgres&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>startup<span class="token punctuation">(</span><span class="token punctuation">)</span>
    connection <span class="token operator">=</span> <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>connection<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">async</span> <span class="token keyword">with</span> connection<span class="token punctuation">.</span>transaction<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> transaction<span class="token punctuation">:</span>
        <span class="token comment"># begin() calls automatically</span>
        <span class="token keyword">await</span> transaction<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>
            <span class="token string">&quot;INSERT INTO users (id, username) VALUES ($1, $2)&quot;</span><span class="token punctuation">,</span>
            <span class="token punctuation">[</span><span class="token string">&quot;100&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Alex&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span>
        <span class="token comment"># commit() calls automatically.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">Cool tip</p><p>If a query raises an error in our async context manager, <code>ROLLBACK</code> is executed automatically.</p></div><div class="hint-container important"><p class="hint-container-title">Important</p><p>Transaction can be began only once, so if you have already called <code>begin()</code> manually then async context manager initialize will fail, you need to choose what to use.</p></div>`,17),p=[e];function c(i,l){return a(),s("div",null,p)}const d=n(o,[["render",c],["__file","transaction.html.vue"]]),k=JSON.parse('{"path":"/introduction/components/transaction.html","title":"Transaction","lang":"en-US","frontmatter":{"title":"Transaction","description":"Transaction object represents PostgreSQL transaction. There are two ways of how we can work with transactions on PSQLPy side. Control transaction fully on your own. First of all...","head":[["meta",{"property":"og:url","content":"https://github.com/qaspen-python/psqlpy/psqlpy-docs/introduction/components/transaction.html"}],["meta",{"property":"og:title","content":"Transaction"}],["meta",{"property":"og:description","content":"Transaction object represents PostgreSQL transaction. There are two ways of how we can work with transactions on PSQLPy side. Control transaction fully on your own. First of all..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-03-11T18:45:56.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-11T18:45:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Transaction\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-11T18:45:56.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"Control transaction fully on your own.","slug":"control-transaction-fully-on-your-own","link":"#control-transaction-fully-on-your-own","children":[]},{"level":3,"title":"Control transaction with async context manager.","slug":"control-transaction-with-async-context-manager","link":"#control-transaction-with-async-context-manager","children":[]}],"git":{"createdTime":1710182756000,"updatedTime":1710182756000,"contributors":[{"name":"chandr-andr (Kiselev Aleksandr)","email":"askiselev00@gmail.com","commits":1}]},"readingTime":{"minutes":1.01,"words":304},"filePathRelative":"introduction/components/transaction.md","localizedDate":"March 11, 2024","autoDesc":true}');export{d as comp,k as data};
