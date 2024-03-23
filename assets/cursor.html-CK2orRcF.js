import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o,c,b as n,d as s,e as p,a as r}from"./app-DV2NrPaJ.js";const l={},i=n("code",null,"Cursor",-1),u=n("code",null,"Cursor",-1),d=n("code",null,"PostgreSQL",-1),k={href:"https://www.postgresql.org/docs/current/plpgsql-cursors.html",target:"_blank",rel:"noopener noreferrer"},h=n("br",null,null,-1),m=n("code",null,"Transaction",-1),v=r(`<h2 id="cursor-parameters" tabindex="-1"><a class="header-anchor" href="#cursor-parameters"><span>Cursor Parameters</span></a></h2><ul><li><code>querystring</code>: specify query for cursor.</li><li><code>parameters</code>: parameters for the querystring. Default <code>None</code></li><li><code>fetch_number</code>: default fetch number. It is used in <code>fetch()</code> method and in async iterator. Default 10</li><li><code>scroll</code>: is cursor scrollable or not. Default as in <code>PostgreSQL</code>.</li></ul><h2 id="cursor-as-async-iterator" tabindex="-1"><a class="header-anchor" href="#cursor-as-async-iterator"><span>Cursor as async iterator</span></a></h2><p>The most common situation is using <code>Cursor</code> as async iterator.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">from</span> psqlpy <span class="token keyword">import</span> PSQLPool<span class="token punctuation">,</span> QueryResult


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    db_pool <span class="token operator">=</span> PSQLPool<span class="token punctuation">(</span><span class="token punctuation">)</span>


    connection <span class="token operator">=</span> <span class="token keyword">await</span> db_pool<span class="token punctuation">.</span>connection<span class="token punctuation">(</span><span class="token punctuation">)</span>
    transaction <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span>transaction<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># Here we fetch 5 results in each iteration.</span>
    <span class="token keyword">async</span> <span class="token keyword">for</span> fetched_result <span class="token keyword">in</span> transaction<span class="token punctuation">.</span>cursor<span class="token punctuation">(</span>
        querystring<span class="token operator">=</span><span class="token string">&quot;SELECT * FROM users WHERE username = $1&quot;</span><span class="token punctuation">,</span>
        parameters<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;Some_Username&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        fetch_number<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">:</span>
        dict_result<span class="token punctuation">:</span> List<span class="token punctuation">[</span>Dict<span class="token punctuation">[</span>Any<span class="token punctuation">,</span> Any<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> fetched_result<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token comment"># do something with this result.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cursor-methods" tabindex="-1"><a class="header-anchor" href="#cursor-methods"><span>Cursor methods</span></a></h2><p>There are a lot of methods to work with cursor.</p><h3 id="close" tabindex="-1"><a class="header-anchor" href="#close"><span>Close</span></a></h3><p>Close the cursor</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch" tabindex="-1"><a class="header-anchor" href="#fetch"><span>Fetch</span></a></h3><p>You can fetch next <code>N</code> records from the cursor.<br> It&#39;s possible to specify <code>N</code> fetch record with parameter <code>fetch_number</code>, otherwise will be used <code>fetch_number</code> from the <code>Cursor</code> initialization.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch<span class="token punctuation">(</span>
        fetch_number<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch-next" tabindex="-1"><a class="header-anchor" href="#fetch-next"><span>Fetch Next</span></a></h3><p>Just fetch next record from the <code>Cursor</code>.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch_next<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch-prior" tabindex="-1"><a class="header-anchor" href="#fetch-prior"><span>Fetch Prior</span></a></h3><p>Just fetch previous record.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch_prior<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch-first" tabindex="-1"><a class="header-anchor" href="#fetch-first"><span>Fetch First</span></a></h3><p>Just fetch the first record.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch_first<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch-last" tabindex="-1"><a class="header-anchor" href="#fetch-last"><span>Fetch Last</span></a></h3><p>Just fetch the last record.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch_last<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch-absolute" tabindex="-1"><a class="header-anchor" href="#fetch-absolute"><span>Fetch Absolute</span></a></h3><p>Just fetch absolute records. It has <code>absolute_number</code> parameter, you must specify it.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch_absolute<span class="token punctuation">(</span>
        absolute_number<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch-relative" tabindex="-1"><a class="header-anchor" href="#fetch-relative"><span>Fetch Relative</span></a></h3><p>Just fetch absolute records. It has <code>relative_number</code> parameter, you must specify it.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch_relative<span class="token punctuation">(</span>
        relative_number<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch-forward-all" tabindex="-1"><a class="header-anchor" href="#fetch-forward-all"><span>Fetch Forward All</span></a></h3><p>Fetch forward all records in the cursor.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch_forward_all<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch-backward" tabindex="-1"><a class="header-anchor" href="#fetch-backward"><span>Fetch Backward</span></a></h3><p>Just backward records. It has <code>backward_count</code> parameter, you must specify it.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch_backward<span class="token punctuation">(</span>
        backward_count<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fetch-backward-all" tabindex="-1"><a class="header-anchor" href="#fetch-backward-all"><span>Fetch Backward All</span></a></h3><p>Fetch backward all records in the cursor.</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    result<span class="token punctuation">:</span> QueryResult <span class="token operator">=</span> <span class="token keyword">await</span> cursor<span class="token punctuation">.</span>fetch_backward_all<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,40);function y(b,f){const a=t("ExternalLinkIcon");return o(),c("div",null,[n("p",null,[i,s(" objects represents real "),u,s(" in the "),d,s(". "),n("a",k,[s("PostgreSQL docs"),p(a)]),h,s(" It can be built only from "),m,s(".")]),v])}const _=e(l,[["render",y],["__file","cursor.html.vue"]]),x=JSON.parse('{"path":"/introduction/components/cursor.html","title":"Cursor","lang":"en-US","frontmatter":{"title":"Cursor","description":"Cursor objects represents real Cursor in the PostgreSQL. PostgreSQL docs It can be built only from Transaction. Cursor Parameters querystring: specify query for cursor. paramete...","head":[["meta",{"property":"og:url","content":"https://github.com/qaspen-python/psqlpy/psqlpy-docs/introduction/components/cursor.html"}],["meta",{"property":"og:title","content":"Cursor"}],["meta",{"property":"og:description","content":"Cursor objects represents real Cursor in the PostgreSQL. PostgreSQL docs It can be built only from Transaction. Cursor Parameters querystring: specify query for cursor. paramete..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-03-20T20:19:47.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-20T20:19:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Cursor\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-20T20:19:47.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Cursor Parameters","slug":"cursor-parameters","link":"#cursor-parameters","children":[]},{"level":2,"title":"Cursor as async iterator","slug":"cursor-as-async-iterator","link":"#cursor-as-async-iterator","children":[]},{"level":2,"title":"Cursor methods","slug":"cursor-methods","link":"#cursor-methods","children":[{"level":3,"title":"Close","slug":"close","link":"#close","children":[]},{"level":3,"title":"Fetch","slug":"fetch","link":"#fetch","children":[]},{"level":3,"title":"Fetch Next","slug":"fetch-next","link":"#fetch-next","children":[]},{"level":3,"title":"Fetch Prior","slug":"fetch-prior","link":"#fetch-prior","children":[]},{"level":3,"title":"Fetch First","slug":"fetch-first","link":"#fetch-first","children":[]},{"level":3,"title":"Fetch Last","slug":"fetch-last","link":"#fetch-last","children":[]},{"level":3,"title":"Fetch Absolute","slug":"fetch-absolute","link":"#fetch-absolute","children":[]},{"level":3,"title":"Fetch Relative","slug":"fetch-relative","link":"#fetch-relative","children":[]},{"level":3,"title":"Fetch Forward All","slug":"fetch-forward-all","link":"#fetch-forward-all","children":[]},{"level":3,"title":"Fetch Backward","slug":"fetch-backward","link":"#fetch-backward","children":[]},{"level":3,"title":"Fetch Backward All","slug":"fetch-backward-all","link":"#fetch-backward-all","children":[]}]}],"git":{"createdTime":1710190666000,"updatedTime":1710965987000,"contributors":[{"name":"chandr-andr (Kiselev Aleksandr)","email":"askiselev00@gmail.com","commits":3},{"name":"reqww","email":"my.gurbanov@gmail.com","commits":1}]},"readingTime":{"minutes":1.25,"words":375},"filePathRelative":"introduction/components/cursor.md","localizedDate":"March 11, 2024","autoDesc":true}');export{_ as comp,x as data};