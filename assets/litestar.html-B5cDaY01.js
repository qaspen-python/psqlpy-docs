import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,a as t}from"./app-D3XsAhRY.js";const e={},o=t(`<p>There is the default example for <code>AioHTTP</code> framework.</p><p>We strongly recommend to use the following example as a standard way to use <code>PSQLPy</code> with <code>AioHTTP</code> framework.</p><h2 id="complete-example" tabindex="-1"><a class="header-anchor" href="#complete-example"><span>Complete example</span></a></h2><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># Start example</span>
<span class="token keyword">from</span> __future__ <span class="token keyword">import</span> annotations

<span class="token keyword">from</span> typing <span class="token keyword">import</span> Any<span class="token punctuation">,</span> cast

<span class="token keyword">import</span> uvicorn
<span class="token keyword">from</span> litestar <span class="token keyword">import</span> Litestar<span class="token punctuation">,</span> Request<span class="token punctuation">,</span> get
<span class="token keyword">from</span> psqlpy <span class="token keyword">import</span> PSQLPool


<span class="token keyword">def</span> <span class="token function">start_db_pool</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Litestar<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> PSQLPool<span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Return the db pool.

    If it doesn&#39;t exist, creates it and saves it in on the application state object
    &quot;&quot;&quot;</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>app<span class="token punctuation">.</span>state<span class="token punctuation">,</span> <span class="token string">&quot;db_pool&quot;</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        app<span class="token punctuation">.</span>state<span class="token punctuation">.</span>db_pool <span class="token operator">=</span> PSQLPool<span class="token punctuation">(</span>
            dsn<span class="token operator">=</span><span class="token string">&quot;postgres://postgres:postgres@localhost:5432/postgres&quot;</span><span class="token punctuation">,</span>
            max_db_pool_size<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span>

    <span class="token keyword">return</span> cast<span class="token punctuation">(</span><span class="token string">&quot;PSQLPool&quot;</span><span class="token punctuation">,</span> app<span class="token punctuation">.</span>state<span class="token punctuation">.</span>db_pool<span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">stop_db_pool</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Litestar<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Close database connection pool.&quot;&quot;&quot;</span>
    <span class="token keyword">if</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>app<span class="token punctuation">.</span>state<span class="token punctuation">,</span> <span class="token string">&quot;engine&quot;</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        db_pool <span class="token operator">=</span> cast<span class="token punctuation">(</span>PSQLPool<span class="token punctuation">,</span> app<span class="token punctuation">.</span>state<span class="token punctuation">.</span>db_pool<span class="token punctuation">)</span>
        <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@get</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">pg_pool_example</span><span class="token punctuation">(</span>request<span class="token punctuation">:</span> Request<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">list</span><span class="token punctuation">[</span><span class="token builtin">dict</span><span class="token punctuation">[</span>Any<span class="token punctuation">,</span> Any<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    db_pool <span class="token operator">=</span> cast<span class="token punctuation">(</span>PSQLPool<span class="token punctuation">,</span> request<span class="token punctuation">.</span>app<span class="token punctuation">.</span>state<span class="token punctuation">.</span>db_pool<span class="token punctuation">)</span>
    connection <span class="token operator">=</span> <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>connection<span class="token punctuation">(</span><span class="token punctuation">)</span>
    query_result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>
        <span class="token string">&quot;SELECT * FROM users&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span> query_result<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span>


app <span class="token operator">=</span> Litestar<span class="token punctuation">(</span>
    <span class="token punctuation">[</span>pg_pool_example<span class="token punctuation">]</span><span class="token punctuation">,</span>
    on_startup<span class="token operator">=</span><span class="token punctuation">[</span>start_db_pool<span class="token punctuation">]</span><span class="token punctuation">,</span>
    on_shutdown<span class="token operator">=</span><span class="token punctuation">[</span>stop_db_pool<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    uvicorn<span class="token punctuation">.</span>run<span class="token punctuation">(</span>
        <span class="token string">&quot;start_example:app&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),p=[o];function i(l,c){return s(),a("div",null,p)}const d=n(e,[["render",i],["__file","litestar.html.vue"]]),k=JSON.parse('{"path":"/usage/litestar.html","title":"AioHTTP Usage","lang":"en-US","frontmatter":{"title":"AioHTTP Usage","description":"There is the default example for AioHTTP framework. We strongly recommend to use the following example as a standard way to use PSQLPy with AioHTTP framework. Complete example","head":[["meta",{"property":"og:url","content":"https://github.com/qaspen-python/psqlpy/psqlpy-docs/usage/litestar.html"}],["meta",{"property":"og:title","content":"AioHTTP Usage"}],["meta",{"property":"og:description","content":"There is the default example for AioHTTP framework. We strongly recommend to use the following example as a standard way to use PSQLPy with AioHTTP framework. Complete example"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-03-23T17:27:06.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-23T17:27:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"AioHTTP Usage\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-23T17:27:06.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Complete example","slug":"complete-example","link":"#complete-example","children":[]}],"git":{"createdTime":1711214826000,"updatedTime":1711214826000,"contributors":[{"name":"reqww","email":"my.gurbanov@gmail.com","commits":1}]},"readingTime":{"minutes":0.53,"words":159},"filePathRelative":"usage/litestar.md","localizedDate":"March 23, 2024","autoDesc":true}');export{d as comp,k as data};
