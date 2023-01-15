
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function xlink_attr(node, attribute, value) {
        node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/LibLoadder.svelte generated by Svelte v3.49.0 */

    const { console: console_1$1 } = globals;
    const file$E = "src/components/LibLoadder.svelte";

    function create_fragment$G(ctx) {
    	let script_1;
    	let script_1_src_value;

    	const block = {
    		c: function create() {
    			script_1 = element("script");
    			if (!src_url_equal(script_1.src, script_1_src_value = /*url*/ ctx[0])) attr_dev(script_1, "src", script_1_src_value);
    			add_location(script_1, file$E, 20, 2, 416);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, script_1);
    			/*script_1_binding*/ ctx[2](script_1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*url*/ 1 && !src_url_equal(script_1.src, script_1_src_value = /*url*/ ctx[0])) {
    				attr_dev(script_1, "src", script_1_src_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(script_1);
    			/*script_1_binding*/ ctx[2](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$G.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$G($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LibLoadder', slots, []);
    	const dispatch = createEventDispatcher();
    	let { url } = $$props;
    	let script;

    	onMount(async () => {
    		script.addEventListener('load', () => {
    			dispatch('loaded');
    		});

    		script.addEventListener('error', event => {
    			console.error("something went wrong", event);
    			dispatch('error');
    		});
    	});

    	const writable_props = ['url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<LibLoadder> was created with unknown prop '${key}'`);
    	});

    	function script_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			script = $$value;
    			$$invalidate(1, script);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		createEventDispatcher,
    		dispatch,
    		url,
    		script
    	});

    	$$self.$inject_state = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    		if ('script' in $$props) $$invalidate(1, script = $$props.script);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url, script, script_1_binding];
    }

    class LibLoadder extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$G, create_fragment$G, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LibLoadder",
    			options,
    			id: create_fragment$G.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*url*/ ctx[0] === undefined && !('url' in props)) {
    			console_1$1.warn("<LibLoadder> was created without expected prop 'url'");
    		}
    	}

    	get url() {
    		throw new Error("<LibLoadder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<LibLoadder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* node_modules/carbon-components-svelte/src/Button/ButtonSkeleton.svelte generated by Svelte v3.49.0 */

    const file$D = "node_modules/carbon-components-svelte/src/Button/ButtonSkeleton.svelte";

    // (35:0) {:else}
    function create_else_block$6(ctx) {
    	let div;
    	let mounted;
    	let dispose;
    	let div_levels = [/*$$restProps*/ ctx[2]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--skeleton", true);
    			toggle_class(div, "bx--btn", true);
    			toggle_class(div, "bx--btn--field", /*size*/ ctx[1] === 'field');
    			toggle_class(div, "bx--btn--sm", /*size*/ ctx[1] === 'small');
    			toggle_class(div, "bx--btn--lg", /*size*/ ctx[1] === 'lg');
    			toggle_class(div, "bx--btn--xl", /*size*/ ctx[1] === 'xl');
    			add_location(div, file$D, 35, 2, 801);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", /*click_handler_1*/ ctx[7], false, false, false),
    					listen_dev(div, "mouseover", /*mouseover_handler_1*/ ctx[8], false, false, false),
    					listen_dev(div, "mouseenter", /*mouseenter_handler_1*/ ctx[9], false, false, false),
    					listen_dev(div, "mouseleave", /*mouseleave_handler_1*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]]));
    			toggle_class(div, "bx--skeleton", true);
    			toggle_class(div, "bx--btn", true);
    			toggle_class(div, "bx--btn--field", /*size*/ ctx[1] === 'field');
    			toggle_class(div, "bx--btn--sm", /*size*/ ctx[1] === 'small');
    			toggle_class(div, "bx--btn--lg", /*size*/ ctx[1] === 'lg');
    			toggle_class(div, "bx--btn--xl", /*size*/ ctx[1] === 'xl');
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(35:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (16:0) {#if href}
    function create_if_block$t(ctx) {
    	let a;
    	let t_value = "" + "";
    	let t;
    	let a_rel_value;
    	let mounted;
    	let dispose;

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{
    			rel: a_rel_value = /*$$restProps*/ ctx[2].target === '_blank'
    			? 'noopener noreferrer'
    			: undefined
    		},
    		{ role: "button" },
    		/*$$restProps*/ ctx[2]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			t = text(t_value);
    			set_attributes(a, a_data);
    			toggle_class(a, "bx--skeleton", true);
    			toggle_class(a, "bx--btn", true);
    			toggle_class(a, "bx--btn--field", /*size*/ ctx[1] === 'field');
    			toggle_class(a, "bx--btn--sm", /*size*/ ctx[1] === 'small');
    			toggle_class(a, "bx--btn--lg", /*size*/ ctx[1] === 'lg');
    			toggle_class(a, "bx--btn--xl", /*size*/ ctx[1] === 'xl');
    			add_location(a, file$D, 16, 2, 337);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t);

    			if (!mounted) {
    				dispose = [
    					listen_dev(a, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(a, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(a, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(a, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*href*/ 1 && { href: /*href*/ ctx[0] },
    				dirty & /*$$restProps*/ 4 && a_rel_value !== (a_rel_value = /*$$restProps*/ ctx[2].target === '_blank'
    				? 'noopener noreferrer'
    				: undefined) && { rel: a_rel_value },
    				{ role: "button" },
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]
    			]));

    			toggle_class(a, "bx--skeleton", true);
    			toggle_class(a, "bx--btn", true);
    			toggle_class(a, "bx--btn--field", /*size*/ ctx[1] === 'field');
    			toggle_class(a, "bx--btn--sm", /*size*/ ctx[1] === 'small');
    			toggle_class(a, "bx--btn--lg", /*size*/ ctx[1] === 'lg');
    			toggle_class(a, "bx--btn--xl", /*size*/ ctx[1] === 'xl');
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$t.name,
    		type: "if",
    		source: "(16:0) {#if href}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$F(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*href*/ ctx[0]) return create_if_block$t;
    		return create_else_block$6;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$F($$self, $$props, $$invalidate) {
    	const omit_props_names = ["href","size"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ButtonSkeleton', slots, []);
    	let { href = undefined } = $$props;
    	let { size = "default" } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('href' in $$new_props) $$invalidate(0, href = $$new_props.href);
    		if ('size' in $$new_props) $$invalidate(1, size = $$new_props.size);
    	};

    	$$self.$capture_state = () => ({ href, size });

    	$$self.$inject_state = $$new_props => {
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('size' in $$props) $$invalidate(1, size = $$new_props.size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		href,
    		size,
    		$$restProps,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		click_handler_1,
    		mouseover_handler_1,
    		mouseenter_handler_1,
    		mouseleave_handler_1
    	];
    }

    class ButtonSkeleton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$F, create_fragment$F, safe_not_equal, { href: 0, size: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ButtonSkeleton",
    			options,
    			id: create_fragment$F.name
    		});
    	}

    	get href() {
    		throw new Error("<ButtonSkeleton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<ButtonSkeleton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<ButtonSkeleton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ButtonSkeleton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Button/Button.svelte generated by Svelte v3.49.0 */
    const file$C = "node_modules/carbon-components-svelte/src/Button/Button.svelte";
    const get_default_slot_changes$4 = dirty => ({ props: dirty[0] & /*buttonProps*/ 512 });
    const get_default_slot_context$4 = ctx => ({ props: /*buttonProps*/ ctx[9] });

    // (163:0) {:else}
    function create_else_block$5(ctx) {
    	let button;
    	let t;
    	let switch_instance;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*hasIconOnly*/ ctx[8] && create_if_block_4$4(ctx);
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);
    	var switch_value = /*icon*/ ctx[2];

    	function switch_props(ctx) {
    		return {
    			props: {
    				"aria-hidden": "true",
    				class: "bx--btn__icon",
    				"aria-label": /*iconDescription*/ ctx[3]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	let button_levels = [/*buttonProps*/ ctx[9]];
    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			set_attributes(button, button_data);
    			add_location(button, file$C, 163, 2, 4429);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			if (if_block) if_block.m(button, null);
    			append_dev(button, t);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			if (switch_instance) {
    				mount_component(switch_instance, button, null);
    			}

    			if (button.autofocus) button.focus();
    			/*button_binding*/ ctx[33](button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*click_handler_2*/ ctx[24], false, false, false),
    					listen_dev(button, "mouseover", /*mouseover_handler_2*/ ctx[25], false, false, false),
    					listen_dev(button, "mouseenter", /*mouseenter_handler_2*/ ctx[26], false, false, false),
    					listen_dev(button, "mouseleave", /*mouseleave_handler_2*/ ctx[27], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*hasIconOnly*/ ctx[8]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_4$4(ctx);
    					if_block.c();
    					if_block.m(button, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			const switch_instance_changes = {};
    			if (dirty[0] & /*iconDescription*/ 8) switch_instance_changes["aria-label"] = /*iconDescription*/ ctx[3];

    			if (switch_value !== (switch_value = /*icon*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, button, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [dirty[0] & /*buttonProps*/ 512 && /*buttonProps*/ ctx[9]]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			if (switch_instance) destroy_component(switch_instance);
    			/*button_binding*/ ctx[33](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(163:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (143:28) 
    function create_if_block_2$6(ctx) {
    	let a;
    	let t;
    	let switch_instance;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*hasIconOnly*/ ctx[8] && create_if_block_3$4(ctx);
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);
    	var switch_value = /*icon*/ ctx[2];

    	function switch_props(ctx) {
    		return {
    			props: {
    				"aria-hidden": "true",
    				class: "bx--btn__icon",
    				"aria-label": /*iconDescription*/ ctx[3]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	let a_levels = [/*buttonProps*/ ctx[9]];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			set_attributes(a, a_data);
    			add_location(a, file$C, 144, 2, 4046);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			if (if_block) if_block.m(a, null);
    			append_dev(a, t);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			if (switch_instance) {
    				mount_component(switch_instance, a, null);
    			}

    			/*a_binding*/ ctx[32](a);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(a, "click", /*click_handler_1*/ ctx[20], false, false, false),
    					listen_dev(a, "mouseover", /*mouseover_handler_1*/ ctx[21], false, false, false),
    					listen_dev(a, "mouseenter", /*mouseenter_handler_1*/ ctx[22], false, false, false),
    					listen_dev(a, "mouseleave", /*mouseleave_handler_1*/ ctx[23], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*hasIconOnly*/ ctx[8]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3$4(ctx);
    					if_block.c();
    					if_block.m(a, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			const switch_instance_changes = {};
    			if (dirty[0] & /*iconDescription*/ 8) switch_instance_changes["aria-label"] = /*iconDescription*/ ctx[3];

    			if (switch_value !== (switch_value = /*icon*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, a, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [dirty[0] & /*buttonProps*/ 512 && /*buttonProps*/ ctx[9]]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			if (switch_instance) destroy_component(switch_instance);
    			/*a_binding*/ ctx[32](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$6.name,
    		type: "if",
    		source: "(143:28) ",
    		ctx
    	});

    	return block;
    }

    // (141:13) 
    function create_if_block_1$7(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], get_default_slot_context$4);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope, buttonProps*/ 262656)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, get_default_slot_changes$4),
    						get_default_slot_context$4
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$7.name,
    		type: "if",
    		source: "(141:13) ",
    		ctx
    	});

    	return block;
    }

    // (130:0) {#if skeleton}
    function create_if_block$s(ctx) {
    	let buttonskeleton;
    	let current;

    	const buttonskeleton_spread_levels = [
    		{ href: /*href*/ ctx[7] },
    		{ size: /*size*/ ctx[1] },
    		/*$$restProps*/ ctx[10],
    		{
    			style: /*hasIconOnly*/ ctx[8] && 'width: 3rem;'
    		}
    	];

    	let buttonskeleton_props = {};

    	for (let i = 0; i < buttonskeleton_spread_levels.length; i += 1) {
    		buttonskeleton_props = assign(buttonskeleton_props, buttonskeleton_spread_levels[i]);
    	}

    	buttonskeleton = new ButtonSkeleton({
    			props: buttonskeleton_props,
    			$$inline: true
    		});

    	buttonskeleton.$on("click", /*click_handler*/ ctx[28]);
    	buttonskeleton.$on("mouseover", /*mouseover_handler*/ ctx[29]);
    	buttonskeleton.$on("mouseenter", /*mouseenter_handler*/ ctx[30]);
    	buttonskeleton.$on("mouseleave", /*mouseleave_handler*/ ctx[31]);

    	const block = {
    		c: function create() {
    			create_component(buttonskeleton.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buttonskeleton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const buttonskeleton_changes = (dirty[0] & /*href, size, $$restProps, hasIconOnly*/ 1410)
    			? get_spread_update(buttonskeleton_spread_levels, [
    					dirty[0] & /*href*/ 128 && { href: /*href*/ ctx[7] },
    					dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] },
    					dirty[0] & /*$$restProps*/ 1024 && get_spread_object(/*$$restProps*/ ctx[10]),
    					dirty[0] & /*hasIconOnly*/ 256 && {
    						style: /*hasIconOnly*/ ctx[8] && 'width: 3rem;'
    					}
    				])
    			: {};

    			buttonskeleton.$set(buttonskeleton_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonskeleton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonskeleton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buttonskeleton, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$s.name,
    		type: "if",
    		source: "(130:0) {#if skeleton}",
    		ctx
    	});

    	return block;
    }

    // (172:4) {#if hasIconOnly}
    function create_if_block_4$4(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*iconDescription*/ ctx[3]);
    			toggle_class(span, "bx--assistive-text", true);
    			add_location(span, file$C, 172, 6, 4578);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*iconDescription*/ 8) set_data_dev(t, /*iconDescription*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$4.name,
    		type: "if",
    		source: "(172:4) {#if hasIconOnly}",
    		ctx
    	});

    	return block;
    }

    // (153:4) {#if hasIconOnly}
    function create_if_block_3$4(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*iconDescription*/ ctx[3]);
    			toggle_class(span, "bx--assistive-text", true);
    			add_location(span, file$C, 153, 6, 4190);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*iconDescription*/ 8) set_data_dev(t, /*iconDescription*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$4.name,
    		type: "if",
    		source: "(153:4) {#if hasIconOnly}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$E(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$s, create_if_block_1$7, create_if_block_2$6, create_else_block$5];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*skeleton*/ ctx[5]) return 0;
    		if (/*as*/ ctx[4]) return 1;
    		if (/*href*/ ctx[7] && !/*disabled*/ ctx[6]) return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
    	let hasIconOnly;
    	let buttonProps;

    	const omit_props_names = [
    		"kind","size","expressive","isSelected","icon","iconDescription","tooltipAlignment","tooltipPosition","as","skeleton","disabled","href","tabindex","type","ref"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	const $$slots = compute_slots(slots);
    	let { kind = "primary" } = $$props;
    	let { size = "default" } = $$props;
    	let { expressive = false } = $$props;
    	let { isSelected = false } = $$props;
    	let { icon = undefined } = $$props;
    	let { iconDescription = undefined } = $$props;
    	let { tooltipAlignment = "center" } = $$props;
    	let { tooltipPosition = "bottom" } = $$props;
    	let { as = false } = $$props;
    	let { skeleton = false } = $$props;
    	let { disabled = false } = $$props;
    	let { href = undefined } = $$props;
    	let { tabindex = "0" } = $$props;
    	let { type = "button" } = $$props;
    	let { ref = null } = $$props;
    	const ctx = getContext("ComposedModal");

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('kind' in $$new_props) $$invalidate(11, kind = $$new_props.kind);
    		if ('size' in $$new_props) $$invalidate(1, size = $$new_props.size);
    		if ('expressive' in $$new_props) $$invalidate(12, expressive = $$new_props.expressive);
    		if ('isSelected' in $$new_props) $$invalidate(13, isSelected = $$new_props.isSelected);
    		if ('icon' in $$new_props) $$invalidate(2, icon = $$new_props.icon);
    		if ('iconDescription' in $$new_props) $$invalidate(3, iconDescription = $$new_props.iconDescription);
    		if ('tooltipAlignment' in $$new_props) $$invalidate(14, tooltipAlignment = $$new_props.tooltipAlignment);
    		if ('tooltipPosition' in $$new_props) $$invalidate(15, tooltipPosition = $$new_props.tooltipPosition);
    		if ('as' in $$new_props) $$invalidate(4, as = $$new_props.as);
    		if ('skeleton' in $$new_props) $$invalidate(5, skeleton = $$new_props.skeleton);
    		if ('disabled' in $$new_props) $$invalidate(6, disabled = $$new_props.disabled);
    		if ('href' in $$new_props) $$invalidate(7, href = $$new_props.href);
    		if ('tabindex' in $$new_props) $$invalidate(16, tabindex = $$new_props.tabindex);
    		if ('type' in $$new_props) $$invalidate(17, type = $$new_props.type);
    		if ('ref' in $$new_props) $$invalidate(0, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		kind,
    		size,
    		expressive,
    		isSelected,
    		icon,
    		iconDescription,
    		tooltipAlignment,
    		tooltipPosition,
    		as,
    		skeleton,
    		disabled,
    		href,
    		tabindex,
    		type,
    		ref,
    		getContext,
    		ButtonSkeleton,
    		ctx,
    		hasIconOnly,
    		buttonProps
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('kind' in $$props) $$invalidate(11, kind = $$new_props.kind);
    		if ('size' in $$props) $$invalidate(1, size = $$new_props.size);
    		if ('expressive' in $$props) $$invalidate(12, expressive = $$new_props.expressive);
    		if ('isSelected' in $$props) $$invalidate(13, isSelected = $$new_props.isSelected);
    		if ('icon' in $$props) $$invalidate(2, icon = $$new_props.icon);
    		if ('iconDescription' in $$props) $$invalidate(3, iconDescription = $$new_props.iconDescription);
    		if ('tooltipAlignment' in $$props) $$invalidate(14, tooltipAlignment = $$new_props.tooltipAlignment);
    		if ('tooltipPosition' in $$props) $$invalidate(15, tooltipPosition = $$new_props.tooltipPosition);
    		if ('as' in $$props) $$invalidate(4, as = $$new_props.as);
    		if ('skeleton' in $$props) $$invalidate(5, skeleton = $$new_props.skeleton);
    		if ('disabled' in $$props) $$invalidate(6, disabled = $$new_props.disabled);
    		if ('href' in $$props) $$invalidate(7, href = $$new_props.href);
    		if ('tabindex' in $$props) $$invalidate(16, tabindex = $$new_props.tabindex);
    		if ('type' in $$props) $$invalidate(17, type = $$new_props.type);
    		if ('ref' in $$props) $$invalidate(0, ref = $$new_props.ref);
    		if ('hasIconOnly' in $$props) $$invalidate(8, hasIconOnly = $$new_props.hasIconOnly);
    		if ('buttonProps' in $$props) $$invalidate(9, buttonProps = $$new_props.buttonProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*ref*/ 1) {
    			if (ctx && ref) {
    				ctx.declareRef(ref);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*icon*/ 4) {
    			$$invalidate(8, hasIconOnly = icon && !$$slots.default);
    		}

    		$$invalidate(9, buttonProps = {
    			type: href && !disabled ? undefined : type,
    			tabindex,
    			disabled: disabled === true ? true : undefined,
    			href,
    			"aria-pressed": hasIconOnly && kind === "ghost" && !href
    			? isSelected
    			: undefined,
    			...$$restProps,
    			class: [
    				"bx--btn",
    				expressive && "bx--btn--expressive",
    				(size === "small" && !expressive || size === "sm" && !expressive || size === "small" && !expressive) && "bx--btn--sm",
    				size === "field" && !expressive || size === "md" && !expressive && "bx--btn--md",
    				size === "field" && "bx--btn--field",
    				size === "small" && "bx--btn--sm",
    				size === "lg" && "bx--btn--lg",
    				size === "xl" && "bx--btn--xl",
    				kind && `bx--btn--${kind}`,
    				disabled && "bx--btn--disabled",
    				hasIconOnly && "bx--btn--icon-only",
    				hasIconOnly && "bx--tooltip__trigger",
    				hasIconOnly && "bx--tooltip--a11y",
    				hasIconOnly && tooltipPosition && `bx--btn--icon-only--${tooltipPosition}`,
    				hasIconOnly && tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`,
    				hasIconOnly && isSelected && kind === "ghost" && "bx--btn--selected",
    				$$restProps.class
    			].filter(Boolean).join(" ")
    		});
    	};

    	return [
    		ref,
    		size,
    		icon,
    		iconDescription,
    		as,
    		skeleton,
    		disabled,
    		href,
    		hasIconOnly,
    		buttonProps,
    		$$restProps,
    		kind,
    		expressive,
    		isSelected,
    		tooltipAlignment,
    		tooltipPosition,
    		tabindex,
    		type,
    		$$scope,
    		slots,
    		click_handler_1,
    		mouseover_handler_1,
    		mouseenter_handler_1,
    		mouseleave_handler_1,
    		click_handler_2,
    		mouseover_handler_2,
    		mouseenter_handler_2,
    		mouseleave_handler_2,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		a_binding,
    		button_binding
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$E,
    			create_fragment$E,
    			safe_not_equal,
    			{
    				kind: 11,
    				size: 1,
    				expressive: 12,
    				isSelected: 13,
    				icon: 2,
    				iconDescription: 3,
    				tooltipAlignment: 14,
    				tooltipPosition: 15,
    				as: 4,
    				skeleton: 5,
    				disabled: 6,
    				href: 7,
    				tabindex: 16,
    				type: 17,
    				ref: 0
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$E.name
    		});
    	}

    	get kind() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set kind(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get expressive() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set expressive(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isSelected() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isSelected(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconDescription() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconDescription(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tooltipAlignment() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tooltipAlignment(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tooltipPosition() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tooltipPosition(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get as() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set as(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get skeleton() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set skeleton(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/icons/WarningFilled.svelte generated by Svelte v3.49.0 */

    const file$B = "node_modules/carbon-components-svelte/src/icons/WarningFilled.svelte";

    // (24:2) {#if title}
    function create_if_block$r(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$B, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$r.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$D(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$r(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25\tc-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z");
    			add_location(path0, file$B, 24, 2, 579);
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "d", "M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22\tC16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z");
    			attr_dev(path1, "data-icon-path", "inner-path");
    			attr_dev(path1, "opacity", "0");
    			add_location(path1, file$B, 26, 10, 777);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$B, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$r(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WarningFilled', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class WarningFilled extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WarningFilled",
    			options,
    			id: create_fragment$D.name
    		});
    	}

    	get size() {
    		throw new Error("<WarningFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<WarningFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<WarningFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<WarningFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/icons/WarningAltFilled.svelte generated by Svelte v3.49.0 */

    const file$A = "node_modules/carbon-components-svelte/src/icons/WarningAltFilled.svelte";

    // (24:2) {#if title}
    function create_if_block$q(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$A, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$q.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$C(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let path2;
    	let if_block = /*title*/ ctx[1] && create_if_block$q(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "d", "M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z");
    			attr_dev(path0, "data-icon-path", "inner-path");
    			add_location(path0, file$A, 24, 2, 579);
    			attr_dev(path1, "d", "M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z");
    			add_location(path1, file$A, 27, 39, 722);
    			attr_dev(path2, "d", "M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z");
    			add_location(path2, file$A, 29, 10, 886);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$A, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$q(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WarningAltFilled', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class WarningAltFilled extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$C, create_fragment$C, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WarningAltFilled",
    			options,
    			id: create_fragment$C.name
    		});
    	}

    	get size() {
    		throw new Error("<WarningAltFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<WarningAltFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<WarningAltFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<WarningAltFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/icons/ChevronDown.svelte generated by Svelte v3.49.0 */

    const file$z = "node_modules/carbon-components-svelte/src/icons/ChevronDown.svelte";

    // (24:2) {#if title}
    function create_if_block$p(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$z, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$p.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$B(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$p(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z");
    			add_location(path, file$z, 24, 2, 579);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$z, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$p(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChevronDown', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class ChevronDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChevronDown",
    			options,
    			id: create_fragment$B.name
    		});
    	}

    	get size() {
    		throw new Error("<ChevronDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ChevronDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<ChevronDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ChevronDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/icons/Close.svelte generated by Svelte v3.49.0 */

    const file$y = "node_modules/carbon-components-svelte/src/icons/Close.svelte";

    // (24:2) {#if title}
    function create_if_block$o(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$y, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$o.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$A(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$o(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z");
    			add_location(path, file$y, 24, 2, 579);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$y, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$o(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Close', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Close extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Close",
    			options,
    			id: create_fragment$A.name
    		});
    	}

    	get size() {
    		throw new Error("<Close>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Close>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Close>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Close>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Grid/Grid.svelte generated by Svelte v3.49.0 */

    const file$x = "node_modules/carbon-components-svelte/src/Grid/Grid.svelte";
    const get_default_slot_changes$3 = dirty => ({ props: dirty & /*props*/ 2 });
    const get_default_slot_context$3 = ctx => ({ props: /*props*/ ctx[1] });

    // (54:0) {:else}
    function create_else_block$4(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);
    	let div_levels = [/*props*/ ctx[1]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$x, 54, 2, 1398);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*props*/ 2 && /*props*/ ctx[1]]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(54:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (52:0) {#if as}
    function create_if_block$n(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context$3);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, props*/ 514)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes$3),
    						get_default_slot_context$3
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$n.name,
    		type: "if",
    		source: "(52:0) {#if as}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$z(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$n, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*as*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let props;

    	const omit_props_names = [
    		"as","condensed","narrow","fullWidth","noGutter","noGutterLeft","noGutterRight","padding"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Grid', slots, ['default']);
    	let { as = false } = $$props;
    	let { condensed = false } = $$props;
    	let { narrow = false } = $$props;
    	let { fullWidth = false } = $$props;
    	let { noGutter = false } = $$props;
    	let { noGutterLeft = false } = $$props;
    	let { noGutterRight = false } = $$props;
    	let { padding = false } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('as' in $$new_props) $$invalidate(0, as = $$new_props.as);
    		if ('condensed' in $$new_props) $$invalidate(2, condensed = $$new_props.condensed);
    		if ('narrow' in $$new_props) $$invalidate(3, narrow = $$new_props.narrow);
    		if ('fullWidth' in $$new_props) $$invalidate(4, fullWidth = $$new_props.fullWidth);
    		if ('noGutter' in $$new_props) $$invalidate(5, noGutter = $$new_props.noGutter);
    		if ('noGutterLeft' in $$new_props) $$invalidate(6, noGutterLeft = $$new_props.noGutterLeft);
    		if ('noGutterRight' in $$new_props) $$invalidate(7, noGutterRight = $$new_props.noGutterRight);
    		if ('padding' in $$new_props) $$invalidate(8, padding = $$new_props.padding);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		as,
    		condensed,
    		narrow,
    		fullWidth,
    		noGutter,
    		noGutterLeft,
    		noGutterRight,
    		padding,
    		props
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('as' in $$props) $$invalidate(0, as = $$new_props.as);
    		if ('condensed' in $$props) $$invalidate(2, condensed = $$new_props.condensed);
    		if ('narrow' in $$props) $$invalidate(3, narrow = $$new_props.narrow);
    		if ('fullWidth' in $$props) $$invalidate(4, fullWidth = $$new_props.fullWidth);
    		if ('noGutter' in $$props) $$invalidate(5, noGutter = $$new_props.noGutter);
    		if ('noGutterLeft' in $$props) $$invalidate(6, noGutterLeft = $$new_props.noGutterLeft);
    		if ('noGutterRight' in $$props) $$invalidate(7, noGutterRight = $$new_props.noGutterRight);
    		if ('padding' in $$props) $$invalidate(8, padding = $$new_props.padding);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(1, props = {
    			...$$restProps,
    			class: [
    				$$restProps.class,
    				"bx--grid",
    				condensed && "bx--grid--condensed",
    				narrow && "bx--grid--narrow",
    				fullWidth && "bx--grid--full-width",
    				noGutter && "bx--no-gutter",
    				noGutterLeft && "bx--no-gutter--left",
    				noGutterRight && "bx--no-gutter--right",
    				padding && "bx--row-padding"
    			].filter(Boolean).join(" ")
    		});
    	};

    	return [
    		as,
    		props,
    		condensed,
    		narrow,
    		fullWidth,
    		noGutter,
    		noGutterLeft,
    		noGutterRight,
    		padding,
    		$$scope,
    		slots
    	];
    }

    class Grid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$z, create_fragment$z, safe_not_equal, {
    			as: 0,
    			condensed: 2,
    			narrow: 3,
    			fullWidth: 4,
    			noGutter: 5,
    			noGutterLeft: 6,
    			noGutterRight: 7,
    			padding: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Grid",
    			options,
    			id: create_fragment$z.name
    		});
    	}

    	get as() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set as(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get condensed() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set condensed(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get narrow() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set narrow(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullWidth() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullWidth(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutter() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutter(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutterLeft() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutterLeft(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutterRight() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutterRight(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get padding() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set padding(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Grid/Row.svelte generated by Svelte v3.49.0 */

    const file$w = "node_modules/carbon-components-svelte/src/Grid/Row.svelte";
    const get_default_slot_changes$2 = dirty => ({ props: dirty & /*props*/ 2 });
    const get_default_slot_context$2 = ctx => ({ props: /*props*/ ctx[1] });

    // (50:0) {:else}
    function create_else_block$3(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);
    	let div_levels = [/*props*/ ctx[1]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$w, 50, 2, 1267);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*props*/ 2 && /*props*/ ctx[1]]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(50:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (48:0) {#if as}
    function create_if_block$m(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context$2);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, props*/ 258)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, get_default_slot_changes$2),
    						get_default_slot_context$2
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$m.name,
    		type: "if",
    		source: "(48:0) {#if as}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$y(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$m, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*as*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let props;
    	const omit_props_names = ["as","condensed","narrow","noGutter","noGutterLeft","noGutterRight","padding"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Row', slots, ['default']);
    	let { as = false } = $$props;
    	let { condensed = false } = $$props;
    	let { narrow = false } = $$props;
    	let { noGutter = false } = $$props;
    	let { noGutterLeft = false } = $$props;
    	let { noGutterRight = false } = $$props;
    	let { padding = false } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('as' in $$new_props) $$invalidate(0, as = $$new_props.as);
    		if ('condensed' in $$new_props) $$invalidate(2, condensed = $$new_props.condensed);
    		if ('narrow' in $$new_props) $$invalidate(3, narrow = $$new_props.narrow);
    		if ('noGutter' in $$new_props) $$invalidate(4, noGutter = $$new_props.noGutter);
    		if ('noGutterLeft' in $$new_props) $$invalidate(5, noGutterLeft = $$new_props.noGutterLeft);
    		if ('noGutterRight' in $$new_props) $$invalidate(6, noGutterRight = $$new_props.noGutterRight);
    		if ('padding' in $$new_props) $$invalidate(7, padding = $$new_props.padding);
    		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		as,
    		condensed,
    		narrow,
    		noGutter,
    		noGutterLeft,
    		noGutterRight,
    		padding,
    		props
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('as' in $$props) $$invalidate(0, as = $$new_props.as);
    		if ('condensed' in $$props) $$invalidate(2, condensed = $$new_props.condensed);
    		if ('narrow' in $$props) $$invalidate(3, narrow = $$new_props.narrow);
    		if ('noGutter' in $$props) $$invalidate(4, noGutter = $$new_props.noGutter);
    		if ('noGutterLeft' in $$props) $$invalidate(5, noGutterLeft = $$new_props.noGutterLeft);
    		if ('noGutterRight' in $$props) $$invalidate(6, noGutterRight = $$new_props.noGutterRight);
    		if ('padding' in $$props) $$invalidate(7, padding = $$new_props.padding);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(1, props = {
    			...$$restProps,
    			class: [
    				$$restProps.class,
    				"bx--row",
    				condensed && "bx--row--condensed",
    				narrow && "bx--row--narrow",
    				noGutter && "bx--no-gutter",
    				noGutterLeft && "bx--no-gutter--left",
    				noGutterRight && "bx--no-gutter--right",
    				padding && "bx--row-padding"
    			].filter(Boolean).join(" ")
    		});
    	};

    	return [
    		as,
    		props,
    		condensed,
    		narrow,
    		noGutter,
    		noGutterLeft,
    		noGutterRight,
    		padding,
    		$$scope,
    		slots
    	];
    }

    class Row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$y, create_fragment$y, safe_not_equal, {
    			as: 0,
    			condensed: 2,
    			narrow: 3,
    			noGutter: 4,
    			noGutterLeft: 5,
    			noGutterRight: 6,
    			padding: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$y.name
    		});
    	}

    	get as() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set as(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get condensed() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set condensed(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get narrow() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set narrow(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutter() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutter(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutterLeft() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutterLeft(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutterRight() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutterRight(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get padding() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set padding(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Grid/Column.svelte generated by Svelte v3.49.0 */

    const file$v = "node_modules/carbon-components-svelte/src/Grid/Column.svelte";
    const get_default_slot_changes$1 = dirty => ({ props: dirty & /*props*/ 2 });
    const get_default_slot_context$1 = ctx => ({ props: /*props*/ ctx[1] });

    // (115:0) {:else}
    function create_else_block$2(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[14].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);
    	let div_levels = [/*props*/ ctx[1]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$v, 115, 2, 2896);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*props*/ 2 && /*props*/ ctx[1]]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(115:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (113:0) {#if as}
    function create_if_block$l(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[14].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], get_default_slot_context$1);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, props*/ 8194)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, get_default_slot_changes$1),
    						get_default_slot_context$1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$l.name,
    		type: "if",
    		source: "(113:0) {#if as}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$x(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$l, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*as*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let columnClass;
    	let props;

    	const omit_props_names = [
    		"as","noGutter","noGutterLeft","noGutterRight","padding","aspectRatio","sm","md","lg","xlg","max"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Column', slots, ['default']);
    	let { as = false } = $$props;
    	let { noGutter = false } = $$props;
    	let { noGutterLeft = false } = $$props;
    	let { noGutterRight = false } = $$props;
    	let { padding = false } = $$props;
    	let { aspectRatio = undefined } = $$props;
    	let { sm = undefined } = $$props;
    	let { md = undefined } = $$props;
    	let { lg = undefined } = $$props;
    	let { xlg = undefined } = $$props;
    	let { max = undefined } = $$props;
    	const breakpoints = ["sm", "md", "lg", "xlg", "max"];

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(16, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('as' in $$new_props) $$invalidate(0, as = $$new_props.as);
    		if ('noGutter' in $$new_props) $$invalidate(2, noGutter = $$new_props.noGutter);
    		if ('noGutterLeft' in $$new_props) $$invalidate(3, noGutterLeft = $$new_props.noGutterLeft);
    		if ('noGutterRight' in $$new_props) $$invalidate(4, noGutterRight = $$new_props.noGutterRight);
    		if ('padding' in $$new_props) $$invalidate(5, padding = $$new_props.padding);
    		if ('aspectRatio' in $$new_props) $$invalidate(6, aspectRatio = $$new_props.aspectRatio);
    		if ('sm' in $$new_props) $$invalidate(7, sm = $$new_props.sm);
    		if ('md' in $$new_props) $$invalidate(8, md = $$new_props.md);
    		if ('lg' in $$new_props) $$invalidate(9, lg = $$new_props.lg);
    		if ('xlg' in $$new_props) $$invalidate(10, xlg = $$new_props.xlg);
    		if ('max' in $$new_props) $$invalidate(11, max = $$new_props.max);
    		if ('$$scope' in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		as,
    		noGutter,
    		noGutterLeft,
    		noGutterRight,
    		padding,
    		aspectRatio,
    		sm,
    		md,
    		lg,
    		xlg,
    		max,
    		breakpoints,
    		columnClass,
    		props
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('as' in $$props) $$invalidate(0, as = $$new_props.as);
    		if ('noGutter' in $$props) $$invalidate(2, noGutter = $$new_props.noGutter);
    		if ('noGutterLeft' in $$props) $$invalidate(3, noGutterLeft = $$new_props.noGutterLeft);
    		if ('noGutterRight' in $$props) $$invalidate(4, noGutterRight = $$new_props.noGutterRight);
    		if ('padding' in $$props) $$invalidate(5, padding = $$new_props.padding);
    		if ('aspectRatio' in $$props) $$invalidate(6, aspectRatio = $$new_props.aspectRatio);
    		if ('sm' in $$props) $$invalidate(7, sm = $$new_props.sm);
    		if ('md' in $$props) $$invalidate(8, md = $$new_props.md);
    		if ('lg' in $$props) $$invalidate(9, lg = $$new_props.lg);
    		if ('xlg' in $$props) $$invalidate(10, xlg = $$new_props.xlg);
    		if ('max' in $$props) $$invalidate(11, max = $$new_props.max);
    		if ('columnClass' in $$props) $$invalidate(12, columnClass = $$new_props.columnClass);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*sm, md, lg, xlg, max*/ 3968) {
    			$$invalidate(12, columnClass = [sm, md, lg, xlg, max].map((breakpoint, i) => {
    				const name = breakpoints[i];

    				if (breakpoint === true) {
    					return `bx--col-${name}`;
    				} else if (typeof breakpoint === "number") {
    					return `bx--col-${name}-${breakpoint}`;
    				} else if (typeof breakpoint === "object") {
    					let bp = [];

    					if (typeof breakpoint.span === "number") {
    						bp = [...bp, `bx--col-${name}-${breakpoint.span}`];
    					} else if (breakpoint.span === true) {
    						bp = [...bp, `bx--col-${name}`];
    					}

    					if (typeof breakpoint.offset === "number") {
    						bp = [...bp, `bx--offset-${name}-${breakpoint.offset}`];
    					}

    					return bp.join(" ");
    				}
    			}).filter(Boolean).join(" "));
    		}

    		$$invalidate(1, props = {
    			...$$restProps,
    			class: [
    				$$restProps.class,
    				columnClass,
    				!columnClass && "bx--col",
    				noGutter && "bx--no-gutter",
    				noGutterLeft && "bx--no-gutter--left",
    				noGutterRight && "bx--no-gutter--right",
    				aspectRatio && `bx--aspect-ratio bx--aspect-ratio--${aspectRatio}`,
    				padding && "bx--col-padding"
    			].filter(Boolean).join(" ")
    		});
    	};

    	return [
    		as,
    		props,
    		noGutter,
    		noGutterLeft,
    		noGutterRight,
    		padding,
    		aspectRatio,
    		sm,
    		md,
    		lg,
    		xlg,
    		max,
    		columnClass,
    		$$scope,
    		slots
    	];
    }

    class Column extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {
    			as: 0,
    			noGutter: 2,
    			noGutterLeft: 3,
    			noGutterRight: 4,
    			padding: 5,
    			aspectRatio: 6,
    			sm: 7,
    			md: 8,
    			lg: 9,
    			xlg: 10,
    			max: 11
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Column",
    			options,
    			id: create_fragment$x.name
    		});
    	}

    	get as() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set as(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutter() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutter(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutterLeft() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutterLeft(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutterRight() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutterRight(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get padding() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set padding(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get aspectRatio() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set aspectRatio(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sm() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sm(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get md() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set md(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lg() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lg(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xlg() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xlg(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/LocalStorage/LocalStorage.svelte generated by Svelte v3.49.0 */

    function create_fragment$w(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function clearAll() {
    	localStorage.clear();
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LocalStorage', slots, []);
    	let { key = "local-storage-key" } = $$props;
    	let { value = "" } = $$props;

    	function clearItem() {
    		localStorage.removeItem(key);
    	}

    	const dispatch = createEventDispatcher();
    	let prevValue = value;

    	function setItem() {
    		if (typeof value === "object") {
    			localStorage.setItem(key, JSON.stringify(value));
    		} else {
    			localStorage.setItem(key, value);
    		}
    	}

    	onMount(() => {
    		const item = localStorage.getItem(key);

    		if (item != null) {
    			try {
    				$$invalidate(0, value = JSON.parse(item));
    			} catch(e) {
    				$$invalidate(0, value = item);
    			}
    		} else {
    			setItem();
    			dispatch("save");
    		}
    	});

    	afterUpdate(() => {
    		if (prevValue !== value) {
    			setItem();
    			dispatch("update", { prevValue, value });
    		}

    		prevValue = value;
    	});

    	const writable_props = ['key', 'value'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LocalStorage> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(1, key = $$props.key);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    	};

    	$$self.$capture_state = () => ({
    		key,
    		value,
    		clearItem,
    		clearAll,
    		onMount,
    		afterUpdate,
    		createEventDispatcher,
    		dispatch,
    		prevValue,
    		setItem
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(1, key = $$props.key);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('prevValue' in $$props) prevValue = $$props.prevValue;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, key, clearItem, clearAll];
    }

    class LocalStorage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {
    			key: 1,
    			value: 0,
    			clearItem: 2,
    			clearAll: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LocalStorage",
    			options,
    			id: create_fragment$w.name
    		});
    	}

    	get key() {
    		throw new Error("<LocalStorage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<LocalStorage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<LocalStorage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<LocalStorage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get clearItem() {
    		return this.$$.ctx[2];
    	}

    	set clearItem(value) {
    		throw new Error("<LocalStorage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get clearAll() {
    		return clearAll;
    	}

    	set clearAll(value) {
    		throw new Error("<LocalStorage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/icons/EditOff.svelte generated by Svelte v3.49.0 */

    const file$u = "node_modules/carbon-components-svelte/src/icons/EditOff.svelte";

    // (24:2) {#if title}
    function create_if_block$k(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$u, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$k.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$v(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$k(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M30 28.6L3.4 2 2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30 30 28.6zM9.6 26H6v-3.6l7.5-7.5 3.6 3.6L9.6 26zM29.4 6.2L29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l0 0 0 0-8 8 1.4 1.4L20 8.4l3.6 3.6L20 15.6l1.4 1.4 8-8C30.2 8.2 30.2 7 29.4 6.2L29.4 6.2zM25 10.6L21.4 7l3-3L28 7.6 25 10.6z");
    			add_location(path, file$u, 24, 2, 579);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$u, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$k(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EditOff', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class EditOff extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EditOff",
    			options,
    			id: create_fragment$v.name
    		});
    	}

    	get size() {
    		throw new Error("<EditOff>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<EditOff>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<EditOff>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<EditOff>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Select/Select.svelte generated by Svelte v3.49.0 */
    const file$t = "node_modules/carbon-components-svelte/src/Select/Select.svelte";
    const get_labelText_slot_changes$3 = dirty => ({});
    const get_labelText_slot_context$3 = ctx => ({});

    // (136:4) {#if !noLabel}
    function create_if_block_10$1(ctx) {
    	let label;
    	let current;
    	const labelText_slot_template = /*#slots*/ ctx[26].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[25], get_labelText_slot_context$3);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block$6(ctx);

    	const block = {
    		c: function create() {
    			label = element("label");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			attr_dev(label, "for", /*id*/ ctx[5]);
    			toggle_class(label, "bx--label", true);
    			toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[14]);
    			toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[4]);
    			add_location(label, file$t, 136, 6, 3392);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(label, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty[0] & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[25], dirty, get_labelText_slot_changes$3),
    						get_labelText_slot_context$3
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty[0] & /*labelText*/ 8192)) {
    					labelText_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*id*/ 32) {
    				attr_dev(label, "for", /*id*/ ctx[5]);
    			}

    			if (dirty[0] & /*hideLabel*/ 16384) {
    				toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[14]);
    			}

    			if (dirty[0] & /*disabled*/ 16) {
    				toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[4]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelText_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelText_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10$1.name,
    		type: "if",
    		source: "(136:4) {#if !noLabel}",
    		ctx
    	});

    	return block;
    }

    // (143:31)            
    function fallback_block$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[13]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*labelText*/ 8192) set_data_dev(t, /*labelText*/ ctx[13]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$6.name,
    		type: "fallback",
    		source: "(143:31)            ",
    		ctx
    	});

    	return block;
    }

    // (148:4) {#if inline}
    function create_if_block_6$3(ctx) {
    	let div1;
    	let div0;
    	let select;
    	let select_aria_describedby_value;
    	let select_aria_invalid_value;
    	let select_disabled_value;
    	let select_required_value;
    	let t0;
    	let chevrondown;
    	let t1;
    	let div0_data_invalid_value;
    	let t2;
    	let t3;
    	let if_block2_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[26].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], null);

    	chevrondown = new ChevronDown({
    			props: { class: "bx--select__arrow" },
    			$$inline: true
    		});

    	let if_block0 = /*invalid*/ ctx[7] && create_if_block_9$2(ctx);
    	let if_block1 = /*invalid*/ ctx[7] && create_if_block_8$2(ctx);
    	let if_block2 = /*helperText*/ ctx[11] && create_if_block_7$3(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			select = element("select");
    			if (default_slot) default_slot.c();
    			t0 = space();
    			create_component(chevrondown.$$.fragment);
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			if (if_block2) if_block2.c();
    			if_block2_anchor = empty();
    			attr_dev(select, "aria-describedby", select_aria_describedby_value = /*invalid*/ ctx[7] ? /*errorId*/ ctx[16] : undefined);
    			attr_dev(select, "aria-invalid", select_aria_invalid_value = /*invalid*/ ctx[7] || undefined);
    			select.disabled = select_disabled_value = /*disabled*/ ctx[4] || undefined;
    			select.required = select_required_value = /*required*/ ctx[15] || undefined;
    			attr_dev(select, "id", /*id*/ ctx[5]);
    			attr_dev(select, "name", /*name*/ ctx[6]);
    			toggle_class(select, "bx--select-input", true);
    			toggle_class(select, "bx--select-input--sm", /*size*/ ctx[1] === 'sm');
    			toggle_class(select, "bx--select-input--xl", /*size*/ ctx[1] === 'xl');
    			add_location(select, file$t, 153, 10, 3859);
    			attr_dev(div0, "data-invalid", div0_data_invalid_value = /*invalid*/ ctx[7] || undefined);
    			toggle_class(div0, "bx--select-input__wrapper", true);
    			add_location(div0, file$t, 149, 8, 3735);
    			toggle_class(div1, "bx--select-input--inline__wrapper", true);
    			add_location(div1, file$t, 148, 6, 3672);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, select);

    			if (default_slot) {
    				default_slot.m(select, null);
    			}

    			/*select_binding*/ ctx[33](select);
    			append_dev(div0, t0);
    			mount_component(chevrondown, div0, null);
    			append_dev(div0, t1);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div1, t2);
    			if (if_block1) if_block1.m(div1, null);
    			insert_dev(target, t3, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, if_block2_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*handleChange*/ ctx[21], false, false, false),
    					listen_dev(select, "input", /*input_handler*/ ctx[30], false, false, false),
    					listen_dev(select, "focus", /*focus_handler*/ ctx[31], false, false, false),
    					listen_dev(select, "blur", /*blur_handler*/ ctx[32], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty[0] & /*invalid, errorId*/ 65664 && select_aria_describedby_value !== (select_aria_describedby_value = /*invalid*/ ctx[7] ? /*errorId*/ ctx[16] : undefined)) {
    				attr_dev(select, "aria-describedby", select_aria_describedby_value);
    			}

    			if (!current || dirty[0] & /*invalid*/ 128 && select_aria_invalid_value !== (select_aria_invalid_value = /*invalid*/ ctx[7] || undefined)) {
    				attr_dev(select, "aria-invalid", select_aria_invalid_value);
    			}

    			if (!current || dirty[0] & /*disabled*/ 16 && select_disabled_value !== (select_disabled_value = /*disabled*/ ctx[4] || undefined)) {
    				prop_dev(select, "disabled", select_disabled_value);
    			}

    			if (!current || dirty[0] & /*required*/ 32768 && select_required_value !== (select_required_value = /*required*/ ctx[15] || undefined)) {
    				prop_dev(select, "required", select_required_value);
    			}

    			if (!current || dirty[0] & /*id*/ 32) {
    				attr_dev(select, "id", /*id*/ ctx[5]);
    			}

    			if (!current || dirty[0] & /*name*/ 64) {
    				attr_dev(select, "name", /*name*/ ctx[6]);
    			}

    			if (dirty[0] & /*size*/ 2) {
    				toggle_class(select, "bx--select-input--sm", /*size*/ ctx[1] === 'sm');
    			}

    			if (dirty[0] & /*size*/ 2) {
    				toggle_class(select, "bx--select-input--xl", /*size*/ ctx[1] === 'xl');
    			}

    			if (/*invalid*/ ctx[7]) {
    				if (if_block0) {
    					if (dirty[0] & /*invalid*/ 128) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_9$2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div0, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*invalid*/ 128 && div0_data_invalid_value !== (div0_data_invalid_value = /*invalid*/ ctx[7] || undefined)) {
    				attr_dev(div0, "data-invalid", div0_data_invalid_value);
    			}

    			if (/*invalid*/ ctx[7]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_8$2(ctx);
    					if_block1.c();
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*helperText*/ ctx[11]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_7$3(ctx);
    					if_block2.c();
    					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(chevrondown.$$.fragment, local);
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(chevrondown.$$.fragment, local);
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			/*select_binding*/ ctx[33](null);
    			destroy_component(chevrondown);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (detaching) detach_dev(t3);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(if_block2_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6$3.name,
    		type: "if",
    		source: "(148:4) {#if inline}",
    		ctx
    	});

    	return block;
    }

    // (173:10) {#if invalid}
    function create_if_block_9$2(ctx) {
    	let warningfilled;
    	let current;

    	warningfilled = new WarningFilled({
    			props: { class: "bx--select__invalid-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9$2.name,
    		type: "if",
    		source: "(173:10) {#if invalid}",
    		ctx
    	});

    	return block;
    }

    // (177:8) {#if invalid}
    function create_if_block_8$2(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*invalidText*/ ctx[8]);
    			attr_dev(div, "id", /*errorId*/ ctx[16]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$t, 177, 10, 4666);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*invalidText*/ 256) set_data_dev(t, /*invalidText*/ ctx[8]);

    			if (dirty[0] & /*errorId*/ 65536) {
    				attr_dev(div, "id", /*errorId*/ ctx[16]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8$2.name,
    		type: "if",
    		source: "(177:8) {#if invalid}",
    		ctx
    	});

    	return block;
    }

    // (183:6) {#if helperText}
    function create_if_block_7$3(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helperText*/ ctx[11]);
    			toggle_class(div, "bx--form__helper-text", true);
    			toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[4]);
    			add_location(div, file$t, 183, 8, 4824);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*helperText*/ 2048) set_data_dev(t, /*helperText*/ ctx[11]);

    			if (dirty[0] & /*disabled*/ 16) {
    				toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[4]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7$3.name,
    		type: "if",
    		source: "(183:6) {#if helperText}",
    		ctx
    	});

    	return block;
    }

    // (192:4) {#if !inline}
    function create_if_block$j(ctx) {
    	let div;
    	let select;
    	let select_aria_describedby_value;
    	let select_disabled_value;
    	let select_required_value;
    	let select_aria_invalid_value;
    	let t0;
    	let chevrondown;
    	let t1;
    	let t2;
    	let div_data_invalid_value;
    	let t3;
    	let t4;
    	let t5;
    	let if_block4_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[26].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], null);

    	chevrondown = new ChevronDown({
    			props: { class: "bx--select__arrow" },
    			$$inline: true
    		});

    	let if_block0 = /*invalid*/ ctx[7] && create_if_block_5$3(ctx);
    	let if_block1 = !/*invalid*/ ctx[7] && /*warn*/ ctx[9] && create_if_block_4$3(ctx);
    	let if_block2 = !/*invalid*/ ctx[7] && /*helperText*/ ctx[11] && create_if_block_3$3(ctx);
    	let if_block3 = /*invalid*/ ctx[7] && create_if_block_2$5(ctx);
    	let if_block4 = !/*invalid*/ ctx[7] && /*warn*/ ctx[9] && create_if_block_1$6(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			select = element("select");
    			if (default_slot) default_slot.c();
    			t0 = space();
    			create_component(chevrondown.$$.fragment);
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			if (if_block2) if_block2.c();
    			t4 = space();
    			if (if_block3) if_block3.c();
    			t5 = space();
    			if (if_block4) if_block4.c();
    			if_block4_anchor = empty();
    			attr_dev(select, "id", /*id*/ ctx[5]);
    			attr_dev(select, "name", /*name*/ ctx[6]);
    			attr_dev(select, "aria-describedby", select_aria_describedby_value = /*invalid*/ ctx[7] ? /*errorId*/ ctx[16] : undefined);
    			select.disabled = select_disabled_value = /*disabled*/ ctx[4] || undefined;
    			select.required = select_required_value = /*required*/ ctx[15] || undefined;
    			attr_dev(select, "aria-invalid", select_aria_invalid_value = /*invalid*/ ctx[7] || undefined);
    			toggle_class(select, "bx--select-input", true);
    			toggle_class(select, "bx--select-input--sm", /*size*/ ctx[1] === 'sm');
    			toggle_class(select, "bx--select-input--xl", /*size*/ ctx[1] === 'xl');
    			add_location(select, file$t, 196, 8, 5147);
    			attr_dev(div, "data-invalid", div_data_invalid_value = /*invalid*/ ctx[7] || undefined);
    			toggle_class(div, "bx--select-input__wrapper", true);
    			add_location(div, file$t, 192, 6, 5031);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, select);

    			if (default_slot) {
    				default_slot.m(select, null);
    			}

    			/*select_binding_1*/ ctx[34](select);
    			append_dev(div, t0);
    			mount_component(chevrondown, div, null);
    			append_dev(div, t1);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t2);
    			if (if_block1) if_block1.m(div, null);
    			insert_dev(target, t3, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t4, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, t5, anchor);
    			if (if_block4) if_block4.m(target, anchor);
    			insert_dev(target, if_block4_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*handleChange*/ ctx[21], false, false, false),
    					listen_dev(select, "input", /*input_handler_1*/ ctx[27], false, false, false),
    					listen_dev(select, "focus", /*focus_handler_1*/ ctx[28], false, false, false),
    					listen_dev(select, "blur", /*blur_handler_1*/ ctx[29], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty[0] & /*id*/ 32) {
    				attr_dev(select, "id", /*id*/ ctx[5]);
    			}

    			if (!current || dirty[0] & /*name*/ 64) {
    				attr_dev(select, "name", /*name*/ ctx[6]);
    			}

    			if (!current || dirty[0] & /*invalid, errorId*/ 65664 && select_aria_describedby_value !== (select_aria_describedby_value = /*invalid*/ ctx[7] ? /*errorId*/ ctx[16] : undefined)) {
    				attr_dev(select, "aria-describedby", select_aria_describedby_value);
    			}

    			if (!current || dirty[0] & /*disabled*/ 16 && select_disabled_value !== (select_disabled_value = /*disabled*/ ctx[4] || undefined)) {
    				prop_dev(select, "disabled", select_disabled_value);
    			}

    			if (!current || dirty[0] & /*required*/ 32768 && select_required_value !== (select_required_value = /*required*/ ctx[15] || undefined)) {
    				prop_dev(select, "required", select_required_value);
    			}

    			if (!current || dirty[0] & /*invalid*/ 128 && select_aria_invalid_value !== (select_aria_invalid_value = /*invalid*/ ctx[7] || undefined)) {
    				attr_dev(select, "aria-invalid", select_aria_invalid_value);
    			}

    			if (dirty[0] & /*size*/ 2) {
    				toggle_class(select, "bx--select-input--sm", /*size*/ ctx[1] === 'sm');
    			}

    			if (dirty[0] & /*size*/ 2) {
    				toggle_class(select, "bx--select-input--xl", /*size*/ ctx[1] === 'xl');
    			}

    			if (/*invalid*/ ctx[7]) {
    				if (if_block0) {
    					if (dirty[0] & /*invalid*/ 128) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_5$3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t2);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!/*invalid*/ ctx[7] && /*warn*/ ctx[9]) {
    				if (if_block1) {
    					if (dirty[0] & /*invalid, warn*/ 640) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_4$3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*invalid*/ 128 && div_data_invalid_value !== (div_data_invalid_value = /*invalid*/ ctx[7] || undefined)) {
    				attr_dev(div, "data-invalid", div_data_invalid_value);
    			}

    			if (!/*invalid*/ ctx[7] && /*helperText*/ ctx[11]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_3$3(ctx);
    					if_block2.c();
    					if_block2.m(t4.parentNode, t4);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (/*invalid*/ ctx[7]) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);
    				} else {
    					if_block3 = create_if_block_2$5(ctx);
    					if_block3.c();
    					if_block3.m(t5.parentNode, t5);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (!/*invalid*/ ctx[7] && /*warn*/ ctx[9]) {
    				if (if_block4) {
    					if_block4.p(ctx, dirty);
    				} else {
    					if_block4 = create_if_block_1$6(ctx);
    					if_block4.c();
    					if_block4.m(if_block4_anchor.parentNode, if_block4_anchor);
    				}
    			} else if (if_block4) {
    				if_block4.d(1);
    				if_block4 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(chevrondown.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(chevrondown.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*select_binding_1*/ ctx[34](null);
    			destroy_component(chevrondown);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (detaching) detach_dev(t3);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t4);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(t5);
    			if (if_block4) if_block4.d(detaching);
    			if (detaching) detach_dev(if_block4_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$j.name,
    		type: "if",
    		source: "(192:4) {#if !inline}",
    		ctx
    	});

    	return block;
    }

    // (216:8) {#if invalid}
    function create_if_block_5$3(ctx) {
    	let warningfilled;
    	let current;

    	warningfilled = new WarningFilled({
    			props: { class: "bx--select__invalid-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$3.name,
    		type: "if",
    		source: "(216:8) {#if invalid}",
    		ctx
    	});

    	return block;
    }

    // (219:8) {#if !invalid && warn}
    function create_if_block_4$3(ctx) {
    	let warningaltfilled;
    	let current;

    	warningaltfilled = new WarningAltFilled({
    			props: {
    				class: "bx--select__invalid-icon bx--select__invalid-icon--warning"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningaltfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningaltfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningaltfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningaltfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningaltfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$3.name,
    		type: "if",
    		source: "(219:8) {#if !invalid && warn}",
    		ctx
    	});

    	return block;
    }

    // (225:6) {#if !invalid && helperText}
    function create_if_block_3$3(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helperText*/ ctx[11]);
    			toggle_class(div, "bx--form__helper-text", true);
    			toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[4]);
    			add_location(div, file$t, 225, 8, 6086);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*helperText*/ 2048) set_data_dev(t, /*helperText*/ ctx[11]);

    			if (dirty[0] & /*disabled*/ 16) {
    				toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[4]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$3.name,
    		type: "if",
    		source: "(225:6) {#if !invalid && helperText}",
    		ctx
    	});

    	return block;
    }

    // (233:6) {#if invalid}
    function create_if_block_2$5(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*invalidText*/ ctx[8]);
    			attr_dev(div, "id", /*errorId*/ ctx[16]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$t, 233, 8, 6287);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*invalidText*/ 256) set_data_dev(t, /*invalidText*/ ctx[8]);

    			if (dirty[0] & /*errorId*/ 65536) {
    				attr_dev(div, "id", /*errorId*/ ctx[16]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$5.name,
    		type: "if",
    		source: "(233:6) {#if invalid}",
    		ctx
    	});

    	return block;
    }

    // (238:6) {#if !invalid && warn}
    function create_if_block_1$6(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*warnText*/ ctx[10]);
    			attr_dev(div, "id", /*errorId*/ ctx[16]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$t, 238, 8, 6432);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*warnText*/ 1024) set_data_dev(t, /*warnText*/ ctx[10]);

    			if (dirty[0] & /*errorId*/ 65536) {
    				attr_dev(div, "id", /*errorId*/ ctx[16]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(238:6) {#if !invalid && warn}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let t1;
    	let current;
    	let if_block0 = !/*noLabel*/ ctx[12] && create_if_block_10$1(ctx);
    	let if_block1 = /*inline*/ ctx[2] && create_if_block_6$3(ctx);
    	let if_block2 = !/*inline*/ ctx[2] && create_if_block$j(ctx);
    	let div1_levels = [/*$$restProps*/ ctx[22]];
    	let div1_data = {};

    	for (let i = 0; i < div1_levels.length; i += 1) {
    		div1_data = assign(div1_data, div1_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			toggle_class(div0, "bx--select", true);
    			toggle_class(div0, "bx--select--inline", /*inline*/ ctx[2]);
    			toggle_class(div0, "bx--select--light", /*light*/ ctx[3]);
    			toggle_class(div0, "bx--select--invalid", /*invalid*/ ctx[7]);
    			toggle_class(div0, "bx--select--disabled", /*disabled*/ ctx[4]);
    			toggle_class(div0, "bx--select--warning", /*warn*/ ctx[9]);
    			add_location(div0, file$t, 127, 2, 3125);
    			set_attributes(div1, div1_data);
    			toggle_class(div1, "bx--form-item", true);
    			add_location(div1, file$t, 126, 0, 3071);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div0, t0);
    			if (if_block1) if_block1.m(div0, null);
    			append_dev(div0, t1);
    			if (if_block2) if_block2.m(div0, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!/*noLabel*/ ctx[12]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*noLabel*/ 4096) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_10$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div0, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*inline*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*inline*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_6$3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div0, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!/*inline*/ ctx[2]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*inline*/ 4) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block$j(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div0, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (dirty[0] & /*inline*/ 4) {
    				toggle_class(div0, "bx--select--inline", /*inline*/ ctx[2]);
    			}

    			if (dirty[0] & /*light*/ 8) {
    				toggle_class(div0, "bx--select--light", /*light*/ ctx[3]);
    			}

    			if (dirty[0] & /*invalid*/ 128) {
    				toggle_class(div0, "bx--select--invalid", /*invalid*/ ctx[7]);
    			}

    			if (dirty[0] & /*disabled*/ 16) {
    				toggle_class(div0, "bx--select--disabled", /*disabled*/ ctx[4]);
    			}

    			if (dirty[0] & /*warn*/ 512) {
    				toggle_class(div0, "bx--select--warning", /*warn*/ ctx[9]);
    			}

    			set_attributes(div1, div1_data = get_spread_update(div1_levels, [dirty[0] & /*$$restProps*/ 4194304 && /*$$restProps*/ ctx[22]]));
    			toggle_class(div1, "bx--form-item", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let errorId;

    	const omit_props_names = [
    		"selected","size","inline","light","disabled","id","name","invalid","invalidText","warn","warnText","helperText","noLabel","labelText","hideLabel","ref","required"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $defaultValue;
    	let $selectedValue;
    	let $itemTypesByValue;
    	let $defaultSelectId;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Select', slots, ['labelText','default']);
    	let { selected = undefined } = $$props;
    	let { size = undefined } = $$props;
    	let { inline = false } = $$props;
    	let { light = false } = $$props;
    	let { disabled = false } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { name = undefined } = $$props;
    	let { invalid = false } = $$props;
    	let { invalidText = "" } = $$props;
    	let { warn = false } = $$props;
    	let { warnText = "" } = $$props;
    	let { helperText = "" } = $$props;
    	let { noLabel = false } = $$props;
    	let { labelText = "" } = $$props;
    	let { hideLabel = false } = $$props;
    	let { ref = null } = $$props;
    	let { required = false } = $$props;
    	const dispatch = createEventDispatcher();
    	const selectedValue = writable(selected);
    	validate_store(selectedValue, 'selectedValue');
    	component_subscribe($$self, selectedValue, value => $$invalidate(36, $selectedValue = value));
    	const defaultSelectId = writable(null);
    	validate_store(defaultSelectId, 'defaultSelectId');
    	component_subscribe($$self, defaultSelectId, value => $$invalidate(38, $defaultSelectId = value));
    	const defaultValue = writable(null);
    	validate_store(defaultValue, 'defaultValue');
    	component_subscribe($$self, defaultValue, value => $$invalidate(24, $defaultValue = value));
    	const itemTypesByValue = writable({});
    	validate_store(itemTypesByValue, 'itemTypesByValue');
    	component_subscribe($$self, itemTypesByValue, value => $$invalidate(37, $itemTypesByValue = value));

    	setContext("Select", {
    		selectedValue,
    		setDefaultValue: (id, value) => {
    			/**
     * Use the first `SelectItem` value as the
     * default value if `selected` is `undefined`.
     */
    			if ($defaultValue === null) {
    				defaultSelectId.set(id);
    				defaultValue.set(value);
    			} else {
    				if ($defaultSelectId === id) {
    					selectedValue.set(value);
    				}
    			}

    			itemTypesByValue.update(types => ({ ...types, [value]: typeof value }));
    		}
    	});

    	const handleChange = ({ target }) => {
    		let value = target.value;

    		if ($itemTypesByValue[value] === "number") {
    			value = Number(value);
    		}

    		selectedValue.set(value);
    	};

    	let prevSelected = undefined;

    	afterUpdate(() => {
    		$$invalidate(23, selected = $selectedValue);

    		if (prevSelected !== undefined && selected !== prevSelected) {
    			dispatch("change", $selectedValue);
    		}

    		prevSelected = selected;
    	});

    	function input_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function select_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	function select_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(22, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('selected' in $$new_props) $$invalidate(23, selected = $$new_props.selected);
    		if ('size' in $$new_props) $$invalidate(1, size = $$new_props.size);
    		if ('inline' in $$new_props) $$invalidate(2, inline = $$new_props.inline);
    		if ('light' in $$new_props) $$invalidate(3, light = $$new_props.light);
    		if ('disabled' in $$new_props) $$invalidate(4, disabled = $$new_props.disabled);
    		if ('id' in $$new_props) $$invalidate(5, id = $$new_props.id);
    		if ('name' in $$new_props) $$invalidate(6, name = $$new_props.name);
    		if ('invalid' in $$new_props) $$invalidate(7, invalid = $$new_props.invalid);
    		if ('invalidText' in $$new_props) $$invalidate(8, invalidText = $$new_props.invalidText);
    		if ('warn' in $$new_props) $$invalidate(9, warn = $$new_props.warn);
    		if ('warnText' in $$new_props) $$invalidate(10, warnText = $$new_props.warnText);
    		if ('helperText' in $$new_props) $$invalidate(11, helperText = $$new_props.helperText);
    		if ('noLabel' in $$new_props) $$invalidate(12, noLabel = $$new_props.noLabel);
    		if ('labelText' in $$new_props) $$invalidate(13, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$new_props) $$invalidate(14, hideLabel = $$new_props.hideLabel);
    		if ('ref' in $$new_props) $$invalidate(0, ref = $$new_props.ref);
    		if ('required' in $$new_props) $$invalidate(15, required = $$new_props.required);
    		if ('$$scope' in $$new_props) $$invalidate(25, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		selected,
    		size,
    		inline,
    		light,
    		disabled,
    		id,
    		name,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		helperText,
    		noLabel,
    		labelText,
    		hideLabel,
    		ref,
    		required,
    		createEventDispatcher,
    		setContext,
    		afterUpdate,
    		writable,
    		ChevronDown,
    		WarningFilled,
    		WarningAltFilled,
    		dispatch,
    		selectedValue,
    		defaultSelectId,
    		defaultValue,
    		itemTypesByValue,
    		handleChange,
    		prevSelected,
    		errorId,
    		$defaultValue,
    		$selectedValue,
    		$itemTypesByValue,
    		$defaultSelectId
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('selected' in $$props) $$invalidate(23, selected = $$new_props.selected);
    		if ('size' in $$props) $$invalidate(1, size = $$new_props.size);
    		if ('inline' in $$props) $$invalidate(2, inline = $$new_props.inline);
    		if ('light' in $$props) $$invalidate(3, light = $$new_props.light);
    		if ('disabled' in $$props) $$invalidate(4, disabled = $$new_props.disabled);
    		if ('id' in $$props) $$invalidate(5, id = $$new_props.id);
    		if ('name' in $$props) $$invalidate(6, name = $$new_props.name);
    		if ('invalid' in $$props) $$invalidate(7, invalid = $$new_props.invalid);
    		if ('invalidText' in $$props) $$invalidate(8, invalidText = $$new_props.invalidText);
    		if ('warn' in $$props) $$invalidate(9, warn = $$new_props.warn);
    		if ('warnText' in $$props) $$invalidate(10, warnText = $$new_props.warnText);
    		if ('helperText' in $$props) $$invalidate(11, helperText = $$new_props.helperText);
    		if ('noLabel' in $$props) $$invalidate(12, noLabel = $$new_props.noLabel);
    		if ('labelText' in $$props) $$invalidate(13, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$props) $$invalidate(14, hideLabel = $$new_props.hideLabel);
    		if ('ref' in $$props) $$invalidate(0, ref = $$new_props.ref);
    		if ('required' in $$props) $$invalidate(15, required = $$new_props.required);
    		if ('prevSelected' in $$props) prevSelected = $$new_props.prevSelected;
    		if ('errorId' in $$props) $$invalidate(16, errorId = $$new_props.errorId);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*id*/ 32) {
    			$$invalidate(16, errorId = `error-${id}`);
    		}

    		if ($$self.$$.dirty[0] & /*selected, $defaultValue*/ 25165824) {
    			selectedValue.set(selected ?? $defaultValue);
    		}
    	};

    	return [
    		ref,
    		size,
    		inline,
    		light,
    		disabled,
    		id,
    		name,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		helperText,
    		noLabel,
    		labelText,
    		hideLabel,
    		required,
    		errorId,
    		selectedValue,
    		defaultSelectId,
    		defaultValue,
    		itemTypesByValue,
    		handleChange,
    		$$restProps,
    		selected,
    		$defaultValue,
    		$$scope,
    		slots,
    		input_handler_1,
    		focus_handler_1,
    		blur_handler_1,
    		input_handler,
    		focus_handler,
    		blur_handler,
    		select_binding,
    		select_binding_1
    	];
    }

    class Select extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$u,
    			create_fragment$u,
    			safe_not_equal,
    			{
    				selected: 23,
    				size: 1,
    				inline: 2,
    				light: 3,
    				disabled: 4,
    				id: 5,
    				name: 6,
    				invalid: 7,
    				invalidText: 8,
    				warn: 9,
    				warnText: 10,
    				helperText: 11,
    				noLabel: 12,
    				labelText: 13,
    				hideLabel: 14,
    				ref: 0,
    				required: 15
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Select",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get selected() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalidText() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalidText(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warn() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warn(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warnText() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warnText(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get helperText() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set helperText(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noLabel() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noLabel(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelText() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelText(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideLabel() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideLabel(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Select/SelectItem.svelte generated by Svelte v3.49.0 */
    const file$s = "node_modules/carbon-components-svelte/src/Select/SelectItem.svelte";

    function create_fragment$t(ctx) {
    	let option;
    	let t_value = (/*text*/ ctx[1] || /*value*/ ctx[0]) + "";
    	let t;
    	let option_class_value;
    	let option_style_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*value*/ ctx[0];
    			option.value = option.__value;
    			option.disabled = /*disabled*/ ctx[3];
    			option.hidden = /*hidden*/ ctx[2];
    			option.selected = /*selected*/ ctx[4];
    			attr_dev(option, "class", option_class_value = /*$$restProps*/ ctx[5].class);
    			attr_dev(option, "style", option_style_value = /*$$restProps*/ ctx[5].style);
    			toggle_class(option, "bx--select-option", true);
    			add_location(option, file$s, 34, 0, 732);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*text, value*/ 3 && t_value !== (t_value = (/*text*/ ctx[1] || /*value*/ ctx[0]) + "")) set_data_dev(t, t_value);

    			if (dirty & /*value*/ 1) {
    				prop_dev(option, "__value", /*value*/ ctx[0]);
    				option.value = option.__value;
    			}

    			if (dirty & /*disabled*/ 8) {
    				prop_dev(option, "disabled", /*disabled*/ ctx[3]);
    			}

    			if (dirty & /*hidden*/ 4) {
    				prop_dev(option, "hidden", /*hidden*/ ctx[2]);
    			}

    			if (dirty & /*selected*/ 16) {
    				prop_dev(option, "selected", /*selected*/ ctx[4]);
    			}

    			if (dirty & /*$$restProps*/ 32 && option_class_value !== (option_class_value = /*$$restProps*/ ctx[5].class)) {
    				attr_dev(option, "class", option_class_value);
    			}

    			if (dirty & /*$$restProps*/ 32 && option_style_value !== (option_style_value = /*$$restProps*/ ctx[5].style)) {
    				attr_dev(option, "style", option_style_value);
    			}

    			if (dirty & /*$$restProps*/ 32) {
    				toggle_class(option, "bx--select-option", true);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	const omit_props_names = ["value","text","hidden","disabled"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelectItem', slots, []);
    	let { value = "" } = $$props;
    	let { text = "" } = $$props;
    	let { hidden = false } = $$props;
    	let { disabled = false } = $$props;
    	const id = "ccs-" + Math.random().toString(36);
    	const ctx = getContext("Select") || getContext("TimePickerSelect");
    	let selected = false;

    	const unsubscribe = ctx.selectedValue.subscribe(currentValue => {
    		$$invalidate(4, selected = currentValue === value);
    	});

    	onMount(() => {
    		return () => unsubscribe();
    	});

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('text' in $$new_props) $$invalidate(1, text = $$new_props.text);
    		if ('hidden' in $$new_props) $$invalidate(2, hidden = $$new_props.hidden);
    		if ('disabled' in $$new_props) $$invalidate(3, disabled = $$new_props.disabled);
    	};

    	$$self.$capture_state = () => ({
    		value,
    		text,
    		hidden,
    		disabled,
    		getContext,
    		onMount,
    		id,
    		ctx,
    		selected,
    		unsubscribe
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('text' in $$props) $$invalidate(1, text = $$new_props.text);
    		if ('hidden' in $$props) $$invalidate(2, hidden = $$new_props.hidden);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('selected' in $$props) $$invalidate(4, selected = $$new_props.selected);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value*/ 1) {
    			ctx?.setDefaultValue?.(id, value);
    		}
    	};

    	return [value, text, hidden, disabled, selected, $$restProps];
    }

    class SelectItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {
    			value: 0,
    			text: 1,
    			hidden: 2,
    			disabled: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelectItem",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get value() {
    		throw new Error("<SelectItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<SelectItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<SelectItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<SelectItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hidden() {
    		throw new Error("<SelectItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hidden(value) {
    		throw new Error("<SelectItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<SelectItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<SelectItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Slider/Slider.svelte generated by Svelte v3.49.0 */
    const file$r = "node_modules/carbon-components-svelte/src/Slider/Slider.svelte";
    const get_labelText_slot_changes$2 = dirty => ({});
    const get_labelText_slot_context$2 = ctx => ({});

    // (148:27)        
    function fallback_block$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[16]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*labelText*/ 65536) set_data_dev(t, /*labelText*/ ctx[16]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$5.name,
    		type: "fallback",
    		source: "(148:27)        ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let div5;
    	let label;
    	let t0;
    	let div4;
    	let span0;
    	let t1_value = (/*minLabel*/ ctx[5] || /*min*/ ctx[4]) + "";
    	let t1;
    	let t2;
    	let div3;
    	let div0;
    	let t3;
    	let div1;
    	let t4;
    	let div2;
    	let t5;
    	let input0;
    	let div3_style_value;
    	let t6;
    	let span1;
    	let t7_value = (/*maxLabel*/ ctx[3] || /*max*/ ctx[2]) + "";
    	let t7;
    	let t8;
    	let input1;
    	let input1_type_value;
    	let input1_style_value;
    	let input1_id_value;
    	let input1_aria_labelledby_value;
    	let input1_aria_label_value;
    	let input1_data_invalid_value;
    	let input1_aria_invalid_value;
    	let div4_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const labelText_slot_template = /*#slots*/ ctx[31].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[30], get_labelText_slot_context$2);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block$5(ctx);
    	let div5_levels = [/*$$restProps*/ ctx[26]];
    	let div5_data = {};

    	for (let i = 0; i < div5_levels.length; i += 1) {
    		div5_data = assign(div5_data, div5_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			label = element("label");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			t0 = space();
    			div4 = element("div");
    			span0 = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			div3 = element("div");
    			div0 = element("div");
    			t3 = space();
    			div1 = element("div");
    			t4 = space();
    			div2 = element("div");
    			t5 = space();
    			input0 = element("input");
    			t6 = space();
    			span1 = element("span");
    			t7 = text(t7_value);
    			t8 = space();
    			input1 = element("input");
    			attr_dev(label, "for", /*id*/ ctx[14]);
    			attr_dev(label, "id", /*labelId*/ ctx[21]);
    			toggle_class(label, "bx--label", true);
    			toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[10]);
    			add_location(label, file$r, 141, 2, 2933);
    			toggle_class(span0, "bx--slider__range-label", true);
    			add_location(span0, file$r, 155, 4, 3226);
    			attr_dev(div0, "role", "slider");
    			attr_dev(div0, "tabindex", "0");
    			set_style(div0, "left", /*left*/ ctx[20] + "%");
    			attr_dev(div0, "aria-valuemax", /*max*/ ctx[2]);
    			attr_dev(div0, "aria-valuemin", /*min*/ ctx[4]);
    			attr_dev(div0, "aria-valuenow", /*value*/ ctx[0]);
    			attr_dev(div0, "aria-labelledby", /*labelId*/ ctx[21]);
    			attr_dev(div0, "id", /*id*/ ctx[14]);
    			toggle_class(div0, "bx--slider__thumb", true);
    			add_location(div0, file$r, 179, 6, 3951);
    			toggle_class(div1, "bx--slider__track", true);
    			add_location(div1, file$r, 190, 6, 4236);
    			set_style(div2, "transform", "translate(0, -50%) scaleX(" + /*left*/ ctx[20] / 100 + ")");
    			toggle_class(div2, "bx--slider__filled-track", true);
    			add_location(div2, file$r, 191, 6, 4310);
    			attr_dev(input0, "type", "hidden");
    			attr_dev(input0, "name", /*name*/ ctx[17]);
    			input0.value = /*value*/ ctx[0];
    			input0.required = /*required*/ ctx[8];
    			attr_dev(input0, "min", /*min*/ ctx[4]);
    			attr_dev(input0, "max", /*max*/ ctx[2]);
    			attr_dev(input0, "step", /*step*/ ctx[6]);
    			toggle_class(input0, "bx--slider__input", true);
    			add_location(input0, file$r, 195, 6, 4450);
    			attr_dev(div3, "role", "presentation");
    			attr_dev(div3, "tabindex", "-1");
    			attr_dev(div3, "style", div3_style_value = /*fullWidth*/ ctx[13] ? 'max-width: none' : undefined);
    			toggle_class(div3, "bx--slider", true);
    			toggle_class(div3, "bx--slider--disabled", /*disabled*/ ctx[10]);
    			add_location(div3, file$r, 156, 4, 3300);
    			toggle_class(span1, "bx--slider__range-label", true);
    			add_location(span1, file$r, 206, 4, 4682);

    			attr_dev(input1, "type", input1_type_value = /*hideTextInput*/ ctx[12]
    			? 'hidden'
    			: /*inputType*/ ctx[9]);

    			attr_dev(input1, "style", input1_style_value = /*hideTextInput*/ ctx[12] ? 'display: none' : undefined);
    			attr_dev(input1, "id", input1_id_value = "input-" + /*id*/ ctx[14]);
    			attr_dev(input1, "name", /*name*/ ctx[17]);
    			input1.value = /*value*/ ctx[0];

    			attr_dev(input1, "aria-labelledby", input1_aria_labelledby_value = /*$$props*/ ctx[27]['aria-label']
    			? undefined
    			: /*labelId*/ ctx[21]);

    			attr_dev(input1, "aria-label", input1_aria_label_value = /*$$props*/ ctx[27]['aria-label'] || 'Slider number input');
    			input1.disabled = /*disabled*/ ctx[10];
    			input1.required = /*required*/ ctx[8];
    			attr_dev(input1, "min", /*min*/ ctx[4]);
    			attr_dev(input1, "max", /*max*/ ctx[2]);
    			attr_dev(input1, "step", /*step*/ ctx[6]);
    			attr_dev(input1, "data-invalid", input1_data_invalid_value = /*invalid*/ ctx[15] || null);
    			attr_dev(input1, "aria-invalid", input1_aria_invalid_value = /*invalid*/ ctx[15] || null);
    			toggle_class(input1, "bx--text-input", true);
    			toggle_class(input1, "bx--slider-text-input", true);
    			toggle_class(input1, "bx--text-input--light", /*light*/ ctx[11]);
    			toggle_class(input1, "bx--text-input--invalid", /*invalid*/ ctx[15]);
    			add_location(input1, file$r, 207, 4, 4756);
    			attr_dev(div4, "style", div4_style_value = /*fullWidth*/ ctx[13] ? 'width: 100%' : undefined);
    			toggle_class(div4, "bx--slider-container", true);
    			add_location(div4, file$r, 151, 2, 3121);
    			set_attributes(div5, div5_data);
    			toggle_class(div5, "bx--form-item", true);
    			add_location(div5, file$r, 133, 0, 2816);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, label);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(label, null);
    			}

    			append_dev(div5, t0);
    			append_dev(div5, div4);
    			append_dev(div4, span0);
    			append_dev(span0, t1);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div3, t3);
    			append_dev(div3, div1);
    			/*div1_binding*/ ctx[36](div1);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div3, t5);
    			append_dev(div3, input0);
    			/*div3_binding*/ ctx[37](div3);
    			append_dev(div4, t6);
    			append_dev(div4, span1);
    			append_dev(span1, t7);
    			append_dev(div4, t8);
    			append_dev(div4, input1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousemove", /*move*/ ctx[25], false, false, false),
    					listen_dev(window, "touchmove", /*move*/ ctx[25], false, false, false),
    					listen_dev(window, "mouseup", /*stopHolding*/ ctx[24], false, false, false),
    					listen_dev(window, "touchend", /*stopHolding*/ ctx[24], false, false, false),
    					listen_dev(window, "touchcancel", /*stopHolding*/ ctx[24], false, false, false),
    					listen_dev(div3, "mousedown", /*startDragging*/ ctx[22], false, false, false),
    					listen_dev(div3, "mousedown", /*startHolding*/ ctx[23], false, false, false),
    					listen_dev(div3, "touchstart", /*startHolding*/ ctx[23], { passive: true }, false, false),
    					listen_dev(div3, "keydown", /*keydown_handler*/ ctx[38], false, false, false),
    					listen_dev(input1, "change", /*change_handler*/ ctx[39], false, false, false),
    					listen_dev(div5, "click", /*click_handler*/ ctx[32], false, false, false),
    					listen_dev(div5, "mouseover", /*mouseover_handler*/ ctx[33], false, false, false),
    					listen_dev(div5, "mouseenter", /*mouseenter_handler*/ ctx[34], false, false, false),
    					listen_dev(div5, "mouseleave", /*mouseleave_handler*/ ctx[35], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty[0] & /*$$scope*/ 1073741824)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[30],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[30])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[30], dirty, get_labelText_slot_changes$2),
    						get_labelText_slot_context$2
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty[0] & /*labelText*/ 65536)) {
    					labelText_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*id*/ 16384) {
    				attr_dev(label, "for", /*id*/ ctx[14]);
    			}

    			if (!current || dirty[0] & /*labelId*/ 2097152) {
    				attr_dev(label, "id", /*labelId*/ ctx[21]);
    			}

    			if (dirty[0] & /*disabled*/ 1024) {
    				toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[10]);
    			}

    			if ((!current || dirty[0] & /*minLabel, min*/ 48) && t1_value !== (t1_value = (/*minLabel*/ ctx[5] || /*min*/ ctx[4]) + "")) set_data_dev(t1, t1_value);

    			if (!current || dirty[0] & /*left*/ 1048576) {
    				set_style(div0, "left", /*left*/ ctx[20] + "%");
    			}

    			if (!current || dirty[0] & /*max*/ 4) {
    				attr_dev(div0, "aria-valuemax", /*max*/ ctx[2]);
    			}

    			if (!current || dirty[0] & /*min*/ 16) {
    				attr_dev(div0, "aria-valuemin", /*min*/ ctx[4]);
    			}

    			if (!current || dirty[0] & /*value*/ 1) {
    				attr_dev(div0, "aria-valuenow", /*value*/ ctx[0]);
    			}

    			if (!current || dirty[0] & /*labelId*/ 2097152) {
    				attr_dev(div0, "aria-labelledby", /*labelId*/ ctx[21]);
    			}

    			if (!current || dirty[0] & /*id*/ 16384) {
    				attr_dev(div0, "id", /*id*/ ctx[14]);
    			}

    			if (!current || dirty[0] & /*left*/ 1048576) {
    				set_style(div2, "transform", "translate(0, -50%) scaleX(" + /*left*/ ctx[20] / 100 + ")");
    			}

    			if (!current || dirty[0] & /*name*/ 131072) {
    				attr_dev(input0, "name", /*name*/ ctx[17]);
    			}

    			if (!current || dirty[0] & /*value*/ 1) {
    				prop_dev(input0, "value", /*value*/ ctx[0]);
    			}

    			if (!current || dirty[0] & /*required*/ 256) {
    				prop_dev(input0, "required", /*required*/ ctx[8]);
    			}

    			if (!current || dirty[0] & /*min*/ 16) {
    				attr_dev(input0, "min", /*min*/ ctx[4]);
    			}

    			if (!current || dirty[0] & /*max*/ 4) {
    				attr_dev(input0, "max", /*max*/ ctx[2]);
    			}

    			if (!current || dirty[0] & /*step*/ 64) {
    				attr_dev(input0, "step", /*step*/ ctx[6]);
    			}

    			if (!current || dirty[0] & /*fullWidth*/ 8192 && div3_style_value !== (div3_style_value = /*fullWidth*/ ctx[13] ? 'max-width: none' : undefined)) {
    				attr_dev(div3, "style", div3_style_value);
    			}

    			if (dirty[0] & /*disabled*/ 1024) {
    				toggle_class(div3, "bx--slider--disabled", /*disabled*/ ctx[10]);
    			}

    			if ((!current || dirty[0] & /*maxLabel, max*/ 12) && t7_value !== (t7_value = (/*maxLabel*/ ctx[3] || /*max*/ ctx[2]) + "")) set_data_dev(t7, t7_value);

    			if (!current || dirty[0] & /*hideTextInput, inputType*/ 4608 && input1_type_value !== (input1_type_value = /*hideTextInput*/ ctx[12]
    			? 'hidden'
    			: /*inputType*/ ctx[9])) {
    				attr_dev(input1, "type", input1_type_value);
    			}

    			if (!current || dirty[0] & /*hideTextInput*/ 4096 && input1_style_value !== (input1_style_value = /*hideTextInput*/ ctx[12] ? 'display: none' : undefined)) {
    				attr_dev(input1, "style", input1_style_value);
    			}

    			if (!current || dirty[0] & /*id*/ 16384 && input1_id_value !== (input1_id_value = "input-" + /*id*/ ctx[14])) {
    				attr_dev(input1, "id", input1_id_value);
    			}

    			if (!current || dirty[0] & /*name*/ 131072) {
    				attr_dev(input1, "name", /*name*/ ctx[17]);
    			}

    			if (!current || dirty[0] & /*value*/ 1 && input1.value !== /*value*/ ctx[0]) {
    				prop_dev(input1, "value", /*value*/ ctx[0]);
    			}

    			if (!current || dirty[0] & /*$$props, labelId*/ 136314880 && input1_aria_labelledby_value !== (input1_aria_labelledby_value = /*$$props*/ ctx[27]['aria-label']
    			? undefined
    			: /*labelId*/ ctx[21])) {
    				attr_dev(input1, "aria-labelledby", input1_aria_labelledby_value);
    			}

    			if (!current || dirty[0] & /*$$props*/ 134217728 && input1_aria_label_value !== (input1_aria_label_value = /*$$props*/ ctx[27]['aria-label'] || 'Slider number input')) {
    				attr_dev(input1, "aria-label", input1_aria_label_value);
    			}

    			if (!current || dirty[0] & /*disabled*/ 1024) {
    				prop_dev(input1, "disabled", /*disabled*/ ctx[10]);
    			}

    			if (!current || dirty[0] & /*required*/ 256) {
    				prop_dev(input1, "required", /*required*/ ctx[8]);
    			}

    			if (!current || dirty[0] & /*min*/ 16) {
    				attr_dev(input1, "min", /*min*/ ctx[4]);
    			}

    			if (!current || dirty[0] & /*max*/ 4) {
    				attr_dev(input1, "max", /*max*/ ctx[2]);
    			}

    			if (!current || dirty[0] & /*step*/ 64) {
    				attr_dev(input1, "step", /*step*/ ctx[6]);
    			}

    			if (!current || dirty[0] & /*invalid*/ 32768 && input1_data_invalid_value !== (input1_data_invalid_value = /*invalid*/ ctx[15] || null)) {
    				attr_dev(input1, "data-invalid", input1_data_invalid_value);
    			}

    			if (!current || dirty[0] & /*invalid*/ 32768 && input1_aria_invalid_value !== (input1_aria_invalid_value = /*invalid*/ ctx[15] || null)) {
    				attr_dev(input1, "aria-invalid", input1_aria_invalid_value);
    			}

    			if (dirty[0] & /*light*/ 2048) {
    				toggle_class(input1, "bx--text-input--light", /*light*/ ctx[11]);
    			}

    			if (dirty[0] & /*invalid*/ 32768) {
    				toggle_class(input1, "bx--text-input--invalid", /*invalid*/ ctx[15]);
    			}

    			if (!current || dirty[0] & /*fullWidth*/ 8192 && div4_style_value !== (div4_style_value = /*fullWidth*/ ctx[13] ? 'width: 100%' : undefined)) {
    				attr_dev(div4, "style", div4_style_value);
    			}

    			set_attributes(div5, div5_data = get_spread_update(div5_levels, [dirty[0] & /*$$restProps*/ 67108864 && /*$$restProps*/ ctx[26]]));
    			toggle_class(div5, "bx--form-item", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelText_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelText_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    			/*div1_binding*/ ctx[36](null);
    			/*div3_binding*/ ctx[37](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let labelId;
    	let range;
    	let left;

    	const omit_props_names = [
    		"value","max","maxLabel","min","minLabel","step","stepMultiplier","required","inputType","disabled","light","hideTextInput","fullWidth","id","invalid","labelText","name","ref"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slider', slots, ['labelText']);
    	let { value = 0 } = $$props;
    	let { max = 100 } = $$props;
    	let { maxLabel = "" } = $$props;
    	let { min = 0 } = $$props;
    	let { minLabel = "" } = $$props;
    	let { step = 1 } = $$props;
    	let { stepMultiplier = 4 } = $$props;
    	let { required = false } = $$props;
    	let { inputType = "number" } = $$props;
    	let { disabled = false } = $$props;
    	let { light = false } = $$props;
    	let { hideTextInput = false } = $$props;
    	let { fullWidth = false } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { invalid = false } = $$props;
    	let { labelText = "" } = $$props;
    	let { name = "" } = $$props;
    	let { ref = null } = $$props;
    	const dispatch = createEventDispatcher();
    	let trackRef = null;
    	let dragging = false;
    	let holding = false;

    	function startDragging() {
    		$$invalidate(28, dragging = true);
    	}

    	function startHolding() {
    		$$invalidate(29, holding = true);
    	}

    	function stopHolding() {
    		$$invalidate(29, holding = false);
    		$$invalidate(28, dragging = false);
    	}

    	function move() {
    		if (holding) {
    			startDragging();
    		}
    	}

    	function calcValue(e) {
    		if (disabled) return;
    		const offsetX = e.touches ? e.touches[0].clientX : e.clientX;
    		const { left, width } = trackRef.getBoundingClientRect();
    		let nextValue = min + Math.round((max - min) * ((offsetX - left) / width) / step) * step;

    		if (nextValue <= min) {
    			nextValue = min;
    		} else if (nextValue >= max) {
    			nextValue = max;
    		}

    		$$invalidate(0, value = nextValue);
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			trackRef = $$value;
    			$$invalidate(19, trackRef);
    		});
    	}

    	function div3_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(1, ref);
    		});
    	}

    	const keydown_handler = ({ shiftKey, key }) => {
    		const keys = {
    			ArrowDown: -1,
    			ArrowLeft: -1,
    			ArrowRight: 1,
    			ArrowUp: 1
    		};

    		if (keys[key]) {
    			$$invalidate(0, value += step * (shiftKey ? range / step / stepMultiplier : 1) * keys[key]);
    		}
    	};

    	const change_handler = ({ target }) => {
    		$$invalidate(0, value = Number(target.value));
    	};

    	$$self.$$set = $$new_props => {
    		$$invalidate(27, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(26, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('max' in $$new_props) $$invalidate(2, max = $$new_props.max);
    		if ('maxLabel' in $$new_props) $$invalidate(3, maxLabel = $$new_props.maxLabel);
    		if ('min' in $$new_props) $$invalidate(4, min = $$new_props.min);
    		if ('minLabel' in $$new_props) $$invalidate(5, minLabel = $$new_props.minLabel);
    		if ('step' in $$new_props) $$invalidate(6, step = $$new_props.step);
    		if ('stepMultiplier' in $$new_props) $$invalidate(7, stepMultiplier = $$new_props.stepMultiplier);
    		if ('required' in $$new_props) $$invalidate(8, required = $$new_props.required);
    		if ('inputType' in $$new_props) $$invalidate(9, inputType = $$new_props.inputType);
    		if ('disabled' in $$new_props) $$invalidate(10, disabled = $$new_props.disabled);
    		if ('light' in $$new_props) $$invalidate(11, light = $$new_props.light);
    		if ('hideTextInput' in $$new_props) $$invalidate(12, hideTextInput = $$new_props.hideTextInput);
    		if ('fullWidth' in $$new_props) $$invalidate(13, fullWidth = $$new_props.fullWidth);
    		if ('id' in $$new_props) $$invalidate(14, id = $$new_props.id);
    		if ('invalid' in $$new_props) $$invalidate(15, invalid = $$new_props.invalid);
    		if ('labelText' in $$new_props) $$invalidate(16, labelText = $$new_props.labelText);
    		if ('name' in $$new_props) $$invalidate(17, name = $$new_props.name);
    		if ('ref' in $$new_props) $$invalidate(1, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(30, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		value,
    		max,
    		maxLabel,
    		min,
    		minLabel,
    		step,
    		stepMultiplier,
    		required,
    		inputType,
    		disabled,
    		light,
    		hideTextInput,
    		fullWidth,
    		id,
    		invalid,
    		labelText,
    		name,
    		ref,
    		createEventDispatcher,
    		dispatch,
    		trackRef,
    		dragging,
    		holding,
    		startDragging,
    		startHolding,
    		stopHolding,
    		move,
    		calcValue,
    		range,
    		left,
    		labelId
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(27, $$props = assign(assign({}, $$props), $$new_props));
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('max' in $$props) $$invalidate(2, max = $$new_props.max);
    		if ('maxLabel' in $$props) $$invalidate(3, maxLabel = $$new_props.maxLabel);
    		if ('min' in $$props) $$invalidate(4, min = $$new_props.min);
    		if ('minLabel' in $$props) $$invalidate(5, minLabel = $$new_props.minLabel);
    		if ('step' in $$props) $$invalidate(6, step = $$new_props.step);
    		if ('stepMultiplier' in $$props) $$invalidate(7, stepMultiplier = $$new_props.stepMultiplier);
    		if ('required' in $$props) $$invalidate(8, required = $$new_props.required);
    		if ('inputType' in $$props) $$invalidate(9, inputType = $$new_props.inputType);
    		if ('disabled' in $$props) $$invalidate(10, disabled = $$new_props.disabled);
    		if ('light' in $$props) $$invalidate(11, light = $$new_props.light);
    		if ('hideTextInput' in $$props) $$invalidate(12, hideTextInput = $$new_props.hideTextInput);
    		if ('fullWidth' in $$props) $$invalidate(13, fullWidth = $$new_props.fullWidth);
    		if ('id' in $$props) $$invalidate(14, id = $$new_props.id);
    		if ('invalid' in $$props) $$invalidate(15, invalid = $$new_props.invalid);
    		if ('labelText' in $$props) $$invalidate(16, labelText = $$new_props.labelText);
    		if ('name' in $$props) $$invalidate(17, name = $$new_props.name);
    		if ('ref' in $$props) $$invalidate(1, ref = $$new_props.ref);
    		if ('trackRef' in $$props) $$invalidate(19, trackRef = $$new_props.trackRef);
    		if ('dragging' in $$props) $$invalidate(28, dragging = $$new_props.dragging);
    		if ('holding' in $$props) $$invalidate(29, holding = $$new_props.holding);
    		if ('range' in $$props) $$invalidate(18, range = $$new_props.range);
    		if ('left' in $$props) $$invalidate(20, left = $$new_props.left);
    		if ('labelId' in $$props) $$invalidate(21, labelId = $$new_props.labelId);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*id*/ 16384) {
    			$$invalidate(21, labelId = `label-${id}`);
    		}

    		if ($$self.$$.dirty[0] & /*max, min*/ 20) {
    			$$invalidate(18, range = max - min);
    		}

    		if ($$self.$$.dirty[0] & /*value, min, max, dragging, holding, disabled*/ 805307413) {
    			{
    				if (value <= min) {
    					$$invalidate(0, value = min);
    				} else if (value >= max) {
    					$$invalidate(0, value = max);
    				}

    				if (dragging) {
    					calcValue(event);
    					$$invalidate(28, dragging = false);
    				}

    				if (!holding && !disabled) {
    					dispatch("change", value);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*value, min, range*/ 262161) {
    			$$invalidate(20, left = (value - min) / range * 100);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		value,
    		ref,
    		max,
    		maxLabel,
    		min,
    		minLabel,
    		step,
    		stepMultiplier,
    		required,
    		inputType,
    		disabled,
    		light,
    		hideTextInput,
    		fullWidth,
    		id,
    		invalid,
    		labelText,
    		name,
    		range,
    		trackRef,
    		left,
    		labelId,
    		startDragging,
    		startHolding,
    		stopHolding,
    		move,
    		$$restProps,
    		$$props,
    		dragging,
    		holding,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		div1_binding,
    		div3_binding,
    		keydown_handler,
    		change_handler
    	];
    }

    class Slider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$s,
    			create_fragment$s,
    			safe_not_equal,
    			{
    				value: 0,
    				max: 2,
    				maxLabel: 3,
    				min: 4,
    				minLabel: 5,
    				step: 6,
    				stepMultiplier: 7,
    				required: 8,
    				inputType: 9,
    				disabled: 10,
    				light: 11,
    				hideTextInput: 12,
    				fullWidth: 13,
    				id: 14,
    				invalid: 15,
    				labelText: 16,
    				name: 17,
    				ref: 1
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slider",
    			options,
    			id: create_fragment$s.name
    		});
    	}

    	get value() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maxLabel() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxLabel(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get min() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get minLabel() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set minLabel(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get step() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get stepMultiplier() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stepMultiplier(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputType() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputType(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideTextInput() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideTextInput(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullWidth() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullWidth(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelText() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelText(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Slider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Slider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/TextInput/TextInput.svelte generated by Svelte v3.49.0 */
    const file$q = "node_modules/carbon-components-svelte/src/TextInput/TextInput.svelte";
    const get_labelText_slot_changes_1 = dirty => ({});
    const get_labelText_slot_context_1 = ctx => ({});
    const get_labelText_slot_changes$1 = dirty => ({});
    const get_labelText_slot_context$1 = ctx => ({});

    // (114:2) {#if inline}
    function create_if_block_10(ctx) {
    	let div;
    	let t;
    	let current;
    	let if_block0 = /*labelText*/ ctx[9] && create_if_block_12(ctx);
    	let if_block1 = !/*isFluid*/ ctx[20] && /*helperText*/ ctx[6] && create_if_block_11(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			toggle_class(div, "bx--text-input__label-helper-wrapper", true);
    			add_location(div, file$q, 114, 4, 2839);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t);
    			if (if_block1) if_block1.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*labelText*/ ctx[9]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*labelText*/ 512) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_12(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!/*isFluid*/ ctx[20] && /*helperText*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_11(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(114:2) {#if inline}",
    		ctx
    	});

    	return block;
    }

    // (116:6) {#if labelText}
    function create_if_block_12(ctx) {
    	let label;
    	let current;
    	const labelText_slot_template = /*#slots*/ ctx[26].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[25], get_labelText_slot_context$1);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			label = element("label");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			attr_dev(label, "for", /*id*/ ctx[7]);
    			toggle_class(label, "bx--label", true);
    			toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[10]);
    			toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[5]);
    			toggle_class(label, "bx--label--inline", /*inline*/ ctx[16]);
    			toggle_class(label, "bx--label--inline--sm", /*size*/ ctx[2] === 'sm');
    			toggle_class(label, "bx--label--inline--xl", /*size*/ ctx[2] === 'xl');
    			add_location(label, file$q, 116, 8, 2927);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(label, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty[0] & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[25], dirty, get_labelText_slot_changes$1),
    						get_labelText_slot_context$1
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty[0] & /*labelText*/ 512)) {
    					labelText_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*id*/ 128) {
    				attr_dev(label, "for", /*id*/ ctx[7]);
    			}

    			if (dirty[0] & /*hideLabel*/ 1024) {
    				toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[10]);
    			}

    			if (dirty[0] & /*disabled*/ 32) {
    				toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[5]);
    			}

    			if (dirty[0] & /*inline*/ 65536) {
    				toggle_class(label, "bx--label--inline", /*inline*/ ctx[16]);
    			}

    			if (dirty[0] & /*size*/ 4) {
    				toggle_class(label, "bx--label--inline--sm", /*size*/ ctx[2] === 'sm');
    			}

    			if (dirty[0] & /*size*/ 4) {
    				toggle_class(label, "bx--label--inline--xl", /*size*/ ctx[2] === 'xl');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelText_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelText_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_12.name,
    		type: "if",
    		source: "(116:6) {#if labelText}",
    		ctx
    	});

    	return block;
    }

    // (126:33)              
    function fallback_block_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[9]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*labelText*/ 512) set_data_dev(t, /*labelText*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_1$1.name,
    		type: "fallback",
    		source: "(126:33)              ",
    		ctx
    	});

    	return block;
    }

    // (131:6) {#if !isFluid && helperText}
    function create_if_block_11(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helperText*/ ctx[6]);
    			toggle_class(div, "bx--form__helper-text", true);
    			toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[5]);
    			toggle_class(div, "bx--form__helper-text--inline", /*inline*/ ctx[16]);
    			add_location(div, file$q, 131, 8, 3404);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*helperText*/ 64) set_data_dev(t, /*helperText*/ ctx[6]);

    			if (dirty[0] & /*disabled*/ 32) {
    				toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[5]);
    			}

    			if (dirty[0] & /*inline*/ 65536) {
    				toggle_class(div, "bx--form__helper-text--inline", /*inline*/ ctx[16]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(131:6) {#if !isFluid && helperText}",
    		ctx
    	});

    	return block;
    }

    // (142:2) {#if !inline && (labelText || $$slots.labelText)}
    function create_if_block_9$1(ctx) {
    	let label;
    	let current;
    	const labelText_slot_template = /*#slots*/ ctx[26].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[25], get_labelText_slot_context_1);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block$4(ctx);

    	const block = {
    		c: function create() {
    			label = element("label");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			attr_dev(label, "for", /*id*/ ctx[7]);
    			toggle_class(label, "bx--label", true);
    			toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[10]);
    			toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[5]);
    			toggle_class(label, "bx--label--inline", /*inline*/ ctx[16]);
    			toggle_class(label, "bx--label--inline-sm", /*inline*/ ctx[16] && /*size*/ ctx[2] === 'sm');
    			toggle_class(label, "bx--label--inline-xl", /*inline*/ ctx[16] && /*size*/ ctx[2] === 'xl');
    			add_location(label, file$q, 142, 4, 3709);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(label, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty[0] & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[25], dirty, get_labelText_slot_changes_1),
    						get_labelText_slot_context_1
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty[0] & /*labelText*/ 512)) {
    					labelText_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*id*/ 128) {
    				attr_dev(label, "for", /*id*/ ctx[7]);
    			}

    			if (dirty[0] & /*hideLabel*/ 1024) {
    				toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[10]);
    			}

    			if (dirty[0] & /*disabled*/ 32) {
    				toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[5]);
    			}

    			if (dirty[0] & /*inline*/ 65536) {
    				toggle_class(label, "bx--label--inline", /*inline*/ ctx[16]);
    			}

    			if (dirty[0] & /*inline, size*/ 65540) {
    				toggle_class(label, "bx--label--inline-sm", /*inline*/ ctx[16] && /*size*/ ctx[2] === 'sm');
    			}

    			if (dirty[0] & /*inline, size*/ 65540) {
    				toggle_class(label, "bx--label--inline-xl", /*inline*/ ctx[16] && /*size*/ ctx[2] === 'xl');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelText_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelText_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9$1.name,
    		type: "if",
    		source: "(142:2) {#if !inline && (labelText || $$slots.labelText)}",
    		ctx
    	});

    	return block;
    }

    // (152:29)          
    function fallback_block$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[9]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*labelText*/ 512) set_data_dev(t, /*labelText*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$4.name,
    		type: "fallback",
    		source: "(152:29)          ",
    		ctx
    	});

    	return block;
    }

    // (167:6) {#if invalid}
    function create_if_block_8$1(ctx) {
    	let warningfilled;
    	let current;

    	warningfilled = new WarningFilled({
    			props: { class: "bx--text-input__invalid-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8$1.name,
    		type: "if",
    		source: "(167:6) {#if invalid}",
    		ctx
    	});

    	return block;
    }

    // (170:6) {#if !invalid && warn}
    function create_if_block_7$2(ctx) {
    	let warningaltfilled;
    	let current;

    	warningaltfilled = new WarningAltFilled({
    			props: {
    				class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningaltfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningaltfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningaltfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningaltfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningaltfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7$2.name,
    		type: "if",
    		source: "(170:6) {#if !invalid && warn}",
    		ctx
    	});

    	return block;
    }

    // (176:6) {#if readonly}
    function create_if_block_6$2(ctx) {
    	let editoff;
    	let current;

    	editoff = new EditOff({
    			props: { class: "bx--text-input__readonly-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(editoff.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(editoff, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(editoff.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(editoff.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(editoff, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6$2.name,
    		type: "if",
    		source: "(176:6) {#if readonly}",
    		ctx
    	});

    	return block;
    }

    // (207:6) {#if isFluid}
    function create_if_block_5$2(ctx) {
    	let hr;

    	const block = {
    		c: function create() {
    			hr = element("hr");
    			toggle_class(hr, "bx--text-input__divider", true);
    			add_location(hr, file$q, 207, 8, 5740);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, hr, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$2.name,
    		type: "if",
    		source: "(207:6) {#if isFluid}",
    		ctx
    	});

    	return block;
    }

    // (210:6) {#if isFluid && !inline && invalid}
    function create_if_block_4$2(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*invalidText*/ ctx[12]);
    			attr_dev(div, "id", /*errorId*/ ctx[19]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$q, 210, 8, 5848);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*invalidText*/ 4096) set_data_dev(t, /*invalidText*/ ctx[12]);

    			if (dirty[0] & /*errorId*/ 524288) {
    				attr_dev(div, "id", /*errorId*/ ctx[19]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$2.name,
    		type: "if",
    		source: "(210:6) {#if isFluid && !inline && invalid}",
    		ctx
    	});

    	return block;
    }

    // (215:6) {#if isFluid && !inline && warn}
    function create_if_block_3$2(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*warnText*/ ctx[14]);
    			attr_dev(div, "id", /*warnId*/ ctx[18]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$q, 215, 8, 6003);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*warnText*/ 16384) set_data_dev(t, /*warnText*/ ctx[14]);

    			if (dirty[0] & /*warnId*/ 262144) {
    				attr_dev(div, "id", /*warnId*/ ctx[18]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$2.name,
    		type: "if",
    		source: "(215:6) {#if isFluid && !inline && warn}",
    		ctx
    	});

    	return block;
    }

    // (219:4) {#if !invalid && !warn && !isFluid && !inline && helperText}
    function create_if_block_2$4(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helperText*/ ctx[6]);
    			toggle_class(div, "bx--form__helper-text", true);
    			toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[5]);
    			toggle_class(div, "bx--form__helper-text--inline", /*inline*/ ctx[16]);
    			add_location(div, file$q, 219, 6, 6169);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*helperText*/ 64) set_data_dev(t, /*helperText*/ ctx[6]);

    			if (dirty[0] & /*disabled*/ 32) {
    				toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[5]);
    			}

    			if (dirty[0] & /*inline*/ 65536) {
    				toggle_class(div, "bx--form__helper-text--inline", /*inline*/ ctx[16]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$4.name,
    		type: "if",
    		source: "(219:4) {#if !invalid && !warn && !isFluid && !inline && helperText}",
    		ctx
    	});

    	return block;
    }

    // (228:4) {#if !isFluid && invalid}
    function create_if_block_1$5(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*invalidText*/ ctx[12]);
    			attr_dev(div, "id", /*errorId*/ ctx[19]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$q, 228, 6, 6421);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*invalidText*/ 4096) set_data_dev(t, /*invalidText*/ ctx[12]);

    			if (dirty[0] & /*errorId*/ 524288) {
    				attr_dev(div, "id", /*errorId*/ ctx[19]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(228:4) {#if !isFluid && invalid}",
    		ctx
    	});

    	return block;
    }

    // (233:4) {#if !isFluid && !invalid && warn}
    function create_if_block$i(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*warnText*/ ctx[14]);
    			attr_dev(div, "id", /*warnId*/ ctx[18]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$q, 233, 6, 6568);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*warnText*/ 16384) set_data_dev(t, /*warnText*/ ctx[14]);

    			if (dirty[0] & /*warnId*/ 262144) {
    				attr_dev(div, "id", /*warnId*/ ctx[18]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$i.name,
    		type: "if",
    		source: "(233:4) {#if !isFluid && !invalid && warn}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let div2;
    	let t0;
    	let t1;
    	let div1;
    	let div0;
    	let t2;
    	let t3;
    	let t4;
    	let input;
    	let input_data_invalid_value;
    	let input_aria_invalid_value;
    	let input_data_warn_value;
    	let input_aria_describedby_value;
    	let t5;
    	let t6;
    	let t7;
    	let div0_data_invalid_value;
    	let div0_data_warn_value;
    	let t8;
    	let t9;
    	let t10;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*inline*/ ctx[16] && create_if_block_10(ctx);
    	let if_block1 = !/*inline*/ ctx[16] && (/*labelText*/ ctx[9] || /*$$slots*/ ctx[24].labelText) && create_if_block_9$1(ctx);
    	let if_block2 = /*invalid*/ ctx[11] && create_if_block_8$1(ctx);
    	let if_block3 = !/*invalid*/ ctx[11] && /*warn*/ ctx[13] && create_if_block_7$2(ctx);
    	let if_block4 = /*readonly*/ ctx[17] && create_if_block_6$2(ctx);

    	let input_levels = [
    		{
    			"data-invalid": input_data_invalid_value = /*invalid*/ ctx[11] || undefined
    		},
    		{
    			"aria-invalid": input_aria_invalid_value = /*invalid*/ ctx[11] || undefined
    		},
    		{
    			"data-warn": input_data_warn_value = /*warn*/ ctx[13] || undefined
    		},
    		{
    			"aria-describedby": input_aria_describedby_value = /*invalid*/ ctx[11]
    			? /*errorId*/ ctx[19]
    			: /*warn*/ ctx[13] ? /*warnId*/ ctx[18] : undefined
    		},
    		{ disabled: /*disabled*/ ctx[5] },
    		{ id: /*id*/ ctx[7] },
    		{ name: /*name*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[3] },
    		{ required: /*required*/ ctx[15] },
    		{ readOnly: /*readonly*/ ctx[17] },
    		/*$$restProps*/ ctx[23]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	let if_block5 = /*isFluid*/ ctx[20] && create_if_block_5$2(ctx);
    	let if_block6 = /*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*invalid*/ ctx[11] && create_if_block_4$2(ctx);
    	let if_block7 = /*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*warn*/ ctx[13] && create_if_block_3$2(ctx);
    	let if_block8 = !/*invalid*/ ctx[11] && !/*warn*/ ctx[13] && !/*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*helperText*/ ctx[6] && create_if_block_2$4(ctx);
    	let if_block9 = !/*isFluid*/ ctx[20] && /*invalid*/ ctx[11] && create_if_block_1$5(ctx);
    	let if_block10 = !/*isFluid*/ ctx[20] && !/*invalid*/ ctx[11] && /*warn*/ ctx[13] && create_if_block$i(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			t3 = space();
    			if (if_block4) if_block4.c();
    			t4 = space();
    			input = element("input");
    			t5 = space();
    			if (if_block5) if_block5.c();
    			t6 = space();
    			if (if_block6) if_block6.c();
    			t7 = space();
    			if (if_block7) if_block7.c();
    			t8 = space();
    			if (if_block8) if_block8.c();
    			t9 = space();
    			if (if_block9) if_block9.c();
    			t10 = space();
    			if (if_block10) if_block10.c();
    			set_attributes(input, input_data);
    			toggle_class(input, "bx--text-input", true);
    			toggle_class(input, "bx--text-input--light", /*light*/ ctx[4]);
    			toggle_class(input, "bx--text-input--invalid", /*invalid*/ ctx[11]);
    			toggle_class(input, "bx--text-input--warn", /*warn*/ ctx[13]);
    			toggle_class(input, "bx--text-input--sm", /*size*/ ctx[2] === 'sm');
    			toggle_class(input, "bx--text-input--xl", /*size*/ ctx[2] === 'xl');
    			add_location(input, file$q, 178, 6, 4827);
    			attr_dev(div0, "data-invalid", div0_data_invalid_value = /*invalid*/ ctx[11] || undefined);
    			attr_dev(div0, "data-warn", div0_data_warn_value = /*warn*/ ctx[13] || undefined);
    			toggle_class(div0, "bx--text-input__field-wrapper", true);
    			toggle_class(div0, "bx--text-input__field-wrapper--warning", !/*invalid*/ ctx[11] && /*warn*/ ctx[13]);
    			add_location(div0, file$q, 160, 4, 4244);
    			toggle_class(div1, "bx--text-input__field-outer-wrapper", true);
    			toggle_class(div1, "bx--text-input__field-outer-wrapper--inline", /*inline*/ ctx[16]);
    			add_location(div1, file$q, 156, 2, 4111);
    			toggle_class(div2, "bx--form-item", true);
    			toggle_class(div2, "bx--text-input-wrapper", true);
    			toggle_class(div2, "bx--text-input-wrapper--inline", /*inline*/ ctx[16]);
    			toggle_class(div2, "bx--text-input-wrapper--light", /*light*/ ctx[4]);
    			toggle_class(div2, "bx--text-input-wrapper--readonly", /*readonly*/ ctx[17]);
    			add_location(div2, file$q, 102, 0, 2532);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			if (if_block0) if_block0.m(div2, null);
    			append_dev(div2, t0);
    			if (if_block1) if_block1.m(div2, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			if (if_block2) if_block2.m(div0, null);
    			append_dev(div0, t2);
    			if (if_block3) if_block3.m(div0, null);
    			append_dev(div0, t3);
    			if (if_block4) if_block4.m(div0, null);
    			append_dev(div0, t4);
    			append_dev(div0, input);
    			if (input.autofocus) input.focus();
    			/*input_binding*/ ctx[36](input);
    			set_input_value(input, /*value*/ ctx[0]);
    			append_dev(div0, t5);
    			if (if_block5) if_block5.m(div0, null);
    			append_dev(div0, t6);
    			if (if_block6) if_block6.m(div0, null);
    			append_dev(div0, t7);
    			if (if_block7) if_block7.m(div0, null);
    			append_dev(div1, t8);
    			if (if_block8) if_block8.m(div1, null);
    			append_dev(div1, t9);
    			if (if_block9) if_block9.m(div1, null);
    			append_dev(div1, t10);
    			if (if_block10) if_block10.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[37]),
    					listen_dev(input, "change", /*onChange*/ ctx[22], false, false, false),
    					listen_dev(input, "input", /*onInput*/ ctx[21], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler*/ ctx[31], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler*/ ctx[32], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[33], false, false, false),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[34], false, false, false),
    					listen_dev(input, "paste", /*paste_handler*/ ctx[35], false, false, false),
    					listen_dev(div2, "click", /*click_handler*/ ctx[27], false, false, false),
    					listen_dev(div2, "mouseover", /*mouseover_handler*/ ctx[28], false, false, false),
    					listen_dev(div2, "mouseenter", /*mouseenter_handler*/ ctx[29], false, false, false),
    					listen_dev(div2, "mouseleave", /*mouseleave_handler*/ ctx[30], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*inline*/ ctx[16]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*inline*/ 65536) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_10(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div2, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!/*inline*/ ctx[16] && (/*labelText*/ ctx[9] || /*$$slots*/ ctx[24].labelText)) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*inline, labelText, $$slots*/ 16843264) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_9$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div2, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*invalid*/ ctx[11]) {
    				if (if_block2) {
    					if (dirty[0] & /*invalid*/ 2048) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_8$1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div0, t2);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (!/*invalid*/ ctx[11] && /*warn*/ ctx[13]) {
    				if (if_block3) {
    					if (dirty[0] & /*invalid, warn*/ 10240) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_7$2(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div0, t3);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			if (/*readonly*/ ctx[17]) {
    				if (if_block4) {
    					if (dirty[0] & /*readonly*/ 131072) {
    						transition_in(if_block4, 1);
    					}
    				} else {
    					if_block4 = create_if_block_6$2(ctx);
    					if_block4.c();
    					transition_in(if_block4, 1);
    					if_block4.m(div0, t4);
    				}
    			} else if (if_block4) {
    				group_outros();

    				transition_out(if_block4, 1, 1, () => {
    					if_block4 = null;
    				});

    				check_outros();
    			}

    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				(!current || dirty[0] & /*invalid*/ 2048 && input_data_invalid_value !== (input_data_invalid_value = /*invalid*/ ctx[11] || undefined)) && { "data-invalid": input_data_invalid_value },
    				(!current || dirty[0] & /*invalid*/ 2048 && input_aria_invalid_value !== (input_aria_invalid_value = /*invalid*/ ctx[11] || undefined)) && { "aria-invalid": input_aria_invalid_value },
    				(!current || dirty[0] & /*warn*/ 8192 && input_data_warn_value !== (input_data_warn_value = /*warn*/ ctx[13] || undefined)) && { "data-warn": input_data_warn_value },
    				(!current || dirty[0] & /*invalid, errorId, warn, warnId*/ 796672 && input_aria_describedby_value !== (input_aria_describedby_value = /*invalid*/ ctx[11]
    				? /*errorId*/ ctx[19]
    				: /*warn*/ ctx[13] ? /*warnId*/ ctx[18] : undefined)) && {
    					"aria-describedby": input_aria_describedby_value
    				},
    				(!current || dirty[0] & /*disabled*/ 32) && { disabled: /*disabled*/ ctx[5] },
    				(!current || dirty[0] & /*id*/ 128) && { id: /*id*/ ctx[7] },
    				(!current || dirty[0] & /*name*/ 256) && { name: /*name*/ ctx[8] },
    				(!current || dirty[0] & /*placeholder*/ 8) && { placeholder: /*placeholder*/ ctx[3] },
    				(!current || dirty[0] & /*required*/ 32768) && { required: /*required*/ ctx[15] },
    				(!current || dirty[0] & /*readonly*/ 131072) && { readOnly: /*readonly*/ ctx[17] },
    				dirty[0] & /*$$restProps*/ 8388608 && /*$$restProps*/ ctx[23]
    			]));

    			if (dirty[0] & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}

    			toggle_class(input, "bx--text-input", true);
    			toggle_class(input, "bx--text-input--light", /*light*/ ctx[4]);
    			toggle_class(input, "bx--text-input--invalid", /*invalid*/ ctx[11]);
    			toggle_class(input, "bx--text-input--warn", /*warn*/ ctx[13]);
    			toggle_class(input, "bx--text-input--sm", /*size*/ ctx[2] === 'sm');
    			toggle_class(input, "bx--text-input--xl", /*size*/ ctx[2] === 'xl');

    			if (/*isFluid*/ ctx[20]) {
    				if (if_block5) ; else {
    					if_block5 = create_if_block_5$2(ctx);
    					if_block5.c();
    					if_block5.m(div0, t6);
    				}
    			} else if (if_block5) {
    				if_block5.d(1);
    				if_block5 = null;
    			}

    			if (/*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*invalid*/ ctx[11]) {
    				if (if_block6) {
    					if_block6.p(ctx, dirty);
    				} else {
    					if_block6 = create_if_block_4$2(ctx);
    					if_block6.c();
    					if_block6.m(div0, t7);
    				}
    			} else if (if_block6) {
    				if_block6.d(1);
    				if_block6 = null;
    			}

    			if (/*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*warn*/ ctx[13]) {
    				if (if_block7) {
    					if_block7.p(ctx, dirty);
    				} else {
    					if_block7 = create_if_block_3$2(ctx);
    					if_block7.c();
    					if_block7.m(div0, null);
    				}
    			} else if (if_block7) {
    				if_block7.d(1);
    				if_block7 = null;
    			}

    			if (!current || dirty[0] & /*invalid*/ 2048 && div0_data_invalid_value !== (div0_data_invalid_value = /*invalid*/ ctx[11] || undefined)) {
    				attr_dev(div0, "data-invalid", div0_data_invalid_value);
    			}

    			if (!current || dirty[0] & /*warn*/ 8192 && div0_data_warn_value !== (div0_data_warn_value = /*warn*/ ctx[13] || undefined)) {
    				attr_dev(div0, "data-warn", div0_data_warn_value);
    			}

    			if (dirty[0] & /*invalid, warn*/ 10240) {
    				toggle_class(div0, "bx--text-input__field-wrapper--warning", !/*invalid*/ ctx[11] && /*warn*/ ctx[13]);
    			}

    			if (!/*invalid*/ ctx[11] && !/*warn*/ ctx[13] && !/*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*helperText*/ ctx[6]) {
    				if (if_block8) {
    					if_block8.p(ctx, dirty);
    				} else {
    					if_block8 = create_if_block_2$4(ctx);
    					if_block8.c();
    					if_block8.m(div1, t9);
    				}
    			} else if (if_block8) {
    				if_block8.d(1);
    				if_block8 = null;
    			}

    			if (!/*isFluid*/ ctx[20] && /*invalid*/ ctx[11]) {
    				if (if_block9) {
    					if_block9.p(ctx, dirty);
    				} else {
    					if_block9 = create_if_block_1$5(ctx);
    					if_block9.c();
    					if_block9.m(div1, t10);
    				}
    			} else if (if_block9) {
    				if_block9.d(1);
    				if_block9 = null;
    			}

    			if (!/*isFluid*/ ctx[20] && !/*invalid*/ ctx[11] && /*warn*/ ctx[13]) {
    				if (if_block10) {
    					if_block10.p(ctx, dirty);
    				} else {
    					if_block10 = create_if_block$i(ctx);
    					if_block10.c();
    					if_block10.m(div1, null);
    				}
    			} else if (if_block10) {
    				if_block10.d(1);
    				if_block10 = null;
    			}

    			if (dirty[0] & /*inline*/ 65536) {
    				toggle_class(div1, "bx--text-input__field-outer-wrapper--inline", /*inline*/ ctx[16]);
    			}

    			if (dirty[0] & /*inline*/ 65536) {
    				toggle_class(div2, "bx--text-input-wrapper--inline", /*inline*/ ctx[16]);
    			}

    			if (dirty[0] & /*light*/ 16) {
    				toggle_class(div2, "bx--text-input-wrapper--light", /*light*/ ctx[4]);
    			}

    			if (dirty[0] & /*readonly*/ 131072) {
    				toggle_class(div2, "bx--text-input-wrapper--readonly", /*readonly*/ ctx[17]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			transition_in(if_block4);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			transition_out(if_block4);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (if_block4) if_block4.d();
    			/*input_binding*/ ctx[36](null);
    			if (if_block5) if_block5.d();
    			if (if_block6) if_block6.d();
    			if (if_block7) if_block7.d();
    			if (if_block8) if_block8.d();
    			if (if_block9) if_block9.d();
    			if (if_block10) if_block10.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let isFluid;
    	let errorId;
    	let warnId;

    	const omit_props_names = [
    		"size","value","placeholder","light","disabled","helperText","id","name","labelText","hideLabel","invalid","invalidText","warn","warnText","ref","required","inline","readonly"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextInput', slots, ['labelText']);
    	const $$slots = compute_slots(slots);
    	let { size = undefined } = $$props;
    	let { value = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { light = false } = $$props;
    	let { disabled = false } = $$props;
    	let { helperText = "" } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { name = undefined } = $$props;
    	let { labelText = "" } = $$props;
    	let { hideLabel = false } = $$props;
    	let { invalid = false } = $$props;
    	let { invalidText = "" } = $$props;
    	let { warn = false } = $$props;
    	let { warnText = "" } = $$props;
    	let { ref = null } = $$props;
    	let { required = false } = $$props;
    	let { inline = false } = $$props;
    	let { readonly = false } = $$props;
    	const ctx = getContext("Form");
    	const dispatch = createEventDispatcher();

    	function parse(raw) {
    		if ($$restProps.type !== "number") return raw;
    		return raw != "" ? Number(raw) : null;
    	}

    	/** @type {(e: Event) => void} */
    	const onInput = e => {
    		$$invalidate(0, value = parse(e.target.value));
    		dispatch("input", value);
    	};

    	/** @type {(e: Event) => void} */
    	const onChange = e => {
    		dispatch("change", parse(e.target.value));
    	};

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function paste_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(1, ref);
    		});
    	}

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(23, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(2, size = $$new_props.size);
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('placeholder' in $$new_props) $$invalidate(3, placeholder = $$new_props.placeholder);
    		if ('light' in $$new_props) $$invalidate(4, light = $$new_props.light);
    		if ('disabled' in $$new_props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('helperText' in $$new_props) $$invalidate(6, helperText = $$new_props.helperText);
    		if ('id' in $$new_props) $$invalidate(7, id = $$new_props.id);
    		if ('name' in $$new_props) $$invalidate(8, name = $$new_props.name);
    		if ('labelText' in $$new_props) $$invalidate(9, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$new_props) $$invalidate(10, hideLabel = $$new_props.hideLabel);
    		if ('invalid' in $$new_props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('invalidText' in $$new_props) $$invalidate(12, invalidText = $$new_props.invalidText);
    		if ('warn' in $$new_props) $$invalidate(13, warn = $$new_props.warn);
    		if ('warnText' in $$new_props) $$invalidate(14, warnText = $$new_props.warnText);
    		if ('ref' in $$new_props) $$invalidate(1, ref = $$new_props.ref);
    		if ('required' in $$new_props) $$invalidate(15, required = $$new_props.required);
    		if ('inline' in $$new_props) $$invalidate(16, inline = $$new_props.inline);
    		if ('readonly' in $$new_props) $$invalidate(17, readonly = $$new_props.readonly);
    		if ('$$scope' in $$new_props) $$invalidate(25, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		value,
    		placeholder,
    		light,
    		disabled,
    		helperText,
    		id,
    		name,
    		labelText,
    		hideLabel,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		ref,
    		required,
    		inline,
    		readonly,
    		createEventDispatcher,
    		getContext,
    		WarningFilled,
    		WarningAltFilled,
    		EditOff,
    		ctx,
    		dispatch,
    		parse,
    		onInput,
    		onChange,
    		warnId,
    		errorId,
    		isFluid
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('size' in $$props) $$invalidate(2, size = $$new_props.size);
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('placeholder' in $$props) $$invalidate(3, placeholder = $$new_props.placeholder);
    		if ('light' in $$props) $$invalidate(4, light = $$new_props.light);
    		if ('disabled' in $$props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('helperText' in $$props) $$invalidate(6, helperText = $$new_props.helperText);
    		if ('id' in $$props) $$invalidate(7, id = $$new_props.id);
    		if ('name' in $$props) $$invalidate(8, name = $$new_props.name);
    		if ('labelText' in $$props) $$invalidate(9, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$props) $$invalidate(10, hideLabel = $$new_props.hideLabel);
    		if ('invalid' in $$props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('invalidText' in $$props) $$invalidate(12, invalidText = $$new_props.invalidText);
    		if ('warn' in $$props) $$invalidate(13, warn = $$new_props.warn);
    		if ('warnText' in $$props) $$invalidate(14, warnText = $$new_props.warnText);
    		if ('ref' in $$props) $$invalidate(1, ref = $$new_props.ref);
    		if ('required' in $$props) $$invalidate(15, required = $$new_props.required);
    		if ('inline' in $$props) $$invalidate(16, inline = $$new_props.inline);
    		if ('readonly' in $$props) $$invalidate(17, readonly = $$new_props.readonly);
    		if ('warnId' in $$props) $$invalidate(18, warnId = $$new_props.warnId);
    		if ('errorId' in $$props) $$invalidate(19, errorId = $$new_props.errorId);
    		if ('isFluid' in $$props) $$invalidate(20, isFluid = $$new_props.isFluid);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*id*/ 128) {
    			$$invalidate(19, errorId = `error-${id}`);
    		}

    		if ($$self.$$.dirty[0] & /*id*/ 128) {
    			$$invalidate(18, warnId = `warn-${id}`);
    		}
    	};

    	$$invalidate(20, isFluid = !!ctx && ctx.isFluid);

    	return [
    		value,
    		ref,
    		size,
    		placeholder,
    		light,
    		disabled,
    		helperText,
    		id,
    		name,
    		labelText,
    		hideLabel,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		required,
    		inline,
    		readonly,
    		warnId,
    		errorId,
    		isFluid,
    		onInput,
    		onChange,
    		$$restProps,
    		$$slots,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler,
    		keyup_handler,
    		focus_handler,
    		blur_handler,
    		paste_handler,
    		input_binding,
    		input_input_handler
    	];
    }

    class TextInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$r,
    			create_fragment$r,
    			safe_not_equal,
    			{
    				size: 2,
    				value: 0,
    				placeholder: 3,
    				light: 4,
    				disabled: 5,
    				helperText: 6,
    				id: 7,
    				name: 8,
    				labelText: 9,
    				hideLabel: 10,
    				invalid: 11,
    				invalidText: 12,
    				warn: 13,
    				warnText: 14,
    				ref: 1,
    				required: 15,
    				inline: 16,
    				readonly: 17
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextInput",
    			options,
    			id: create_fragment$r.name
    		});
    	}

    	get size() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get helperText() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set helperText(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelText() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelText(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideLabel() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideLabel(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalidText() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalidText(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warn() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warn(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warnText() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warnText(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Toggle/Toggle.svelte generated by Svelte v3.49.0 */
    const file$p = "node_modules/carbon-components-svelte/src/Toggle/Toggle.svelte";
    const get_labelB_slot_changes = dirty => ({});
    const get_labelB_slot_context = ctx => ({});
    const get_labelA_slot_changes = dirty => ({});
    const get_labelA_slot_context = ctx => ({});
    const get_labelText_slot_changes = dirty => ({});
    const get_labelText_slot_context = ctx => ({});

    // (85:29)          
    function fallback_block_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[5]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*labelText*/ 32) set_data_dev(t, /*labelText*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_2.name,
    		type: "fallback",
    		source: "(85:29)          ",
    		ctx
    	});

    	return block;
    }

    // (94:28)            
    function fallback_block_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelA*/ ctx[3]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*labelA*/ 8) set_data_dev(t, /*labelA*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_1.name,
    		type: "fallback",
    		source: "(94:28)            ",
    		ctx
    	});

    	return block;
    }

    // (99:28)            
    function fallback_block$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelB*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*labelB*/ 16) set_data_dev(t, /*labelB*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$3.name,
    		type: "fallback",
    		source: "(99:28)            ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let div;
    	let input;
    	let t0;
    	let label;
    	let span0;
    	let t1;
    	let span3;
    	let span1;
    	let t2;
    	let span2;
    	let span3_style_value;
    	let label_aria_label_value;
    	let div_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const labelText_slot_template = /*#slots*/ ctx[12].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[11], get_labelText_slot_context);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block_2(ctx);
    	const labelA_slot_template = /*#slots*/ ctx[12].labelA;
    	const labelA_slot = create_slot(labelA_slot_template, ctx, /*$$scope*/ ctx[11], get_labelA_slot_context);
    	const labelA_slot_or_fallback = labelA_slot || fallback_block_1(ctx);
    	const labelB_slot_template = /*#slots*/ ctx[12].labelB;
    	const labelB_slot = create_slot(labelB_slot_template, ctx, /*$$scope*/ ctx[11], get_labelB_slot_context);
    	const labelB_slot_or_fallback = labelB_slot || fallback_block$3(ctx);

    	let div_levels = [
    		/*$$restProps*/ ctx[9],
    		{
    			style: div_style_value = "" + (/*$$restProps*/ ctx[9]['style'] + "; user-select: none")
    		}
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t0 = space();
    			label = element("label");
    			span0 = element("span");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			t1 = space();
    			span3 = element("span");
    			span1 = element("span");
    			if (labelA_slot_or_fallback) labelA_slot_or_fallback.c();
    			t2 = space();
    			span2 = element("span");
    			if (labelB_slot_or_fallback) labelB_slot_or_fallback.c();
    			attr_dev(input, "role", "switch");
    			attr_dev(input, "type", "checkbox");
    			input.checked = /*toggled*/ ctx[0];
    			input.disabled = /*disabled*/ ctx[2];
    			attr_dev(input, "id", /*id*/ ctx[7]);
    			attr_dev(input, "name", /*name*/ ctx[8]);
    			toggle_class(input, "bx--toggle-input", true);
    			toggle_class(input, "bx--toggle-input--small", /*size*/ ctx[1] === 'sm');
    			add_location(input, file$p, 55, 2, 1226);
    			toggle_class(span0, "bx--visually-hidden", /*hideLabel*/ ctx[6]);
    			add_location(span0, file$p, 83, 4, 1852);
    			attr_dev(span1, "aria-hidden", "true");
    			toggle_class(span1, "bx--toggle__text--off", true);
    			add_location(span1, file$p, 92, 6, 2082);
    			attr_dev(span2, "aria-hidden", "true");
    			toggle_class(span2, "bx--toggle__text--on", true);
    			add_location(span2, file$p, 97, 6, 2229);
    			attr_dev(span3, "style", span3_style_value = /*hideLabel*/ ctx[6] && 'margin-top: 0');
    			toggle_class(span3, "bx--toggle__switch", true);
    			add_location(span3, file$p, 88, 4, 1979);

    			attr_dev(label, "aria-label", label_aria_label_value = /*labelText*/ ctx[5]
    			? undefined
    			: /*$$props*/ ctx[10]['aria-label'] || 'Toggle');

    			attr_dev(label, "for", /*id*/ ctx[7]);
    			toggle_class(label, "bx--toggle-input__label", true);
    			add_location(label, file$p, 78, 2, 1702);
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--form-item", true);
    			add_location(div, file$p, 46, 0, 1057);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			append_dev(div, t0);
    			append_dev(div, label);
    			append_dev(label, span0);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(span0, null);
    			}

    			append_dev(label, t1);
    			append_dev(label, span3);
    			append_dev(span3, span1);

    			if (labelA_slot_or_fallback) {
    				labelA_slot_or_fallback.m(span1, null);
    			}

    			append_dev(span3, t2);
    			append_dev(span3, span2);

    			if (labelB_slot_or_fallback) {
    				labelB_slot_or_fallback.m(span2, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*change_handler*/ ctx[17], false, false, false),
    					listen_dev(input, "change", /*change_handler_1*/ ctx[21], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler*/ ctx[18], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_1*/ ctx[22], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[19], false, false, false),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[20], false, false, false),
    					listen_dev(div, "click", /*click_handler*/ ctx[13], false, false, false),
    					listen_dev(div, "mouseover", /*mouseover_handler*/ ctx[14], false, false, false),
    					listen_dev(div, "mouseenter", /*mouseenter_handler*/ ctx[15], false, false, false),
    					listen_dev(div, "mouseleave", /*mouseleave_handler*/ ctx[16], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*toggled*/ 1) {
    				prop_dev(input, "checked", /*toggled*/ ctx[0]);
    			}

    			if (!current || dirty & /*disabled*/ 4) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[2]);
    			}

    			if (!current || dirty & /*id*/ 128) {
    				attr_dev(input, "id", /*id*/ ctx[7]);
    			}

    			if (!current || dirty & /*name*/ 256) {
    				attr_dev(input, "name", /*name*/ ctx[8]);
    			}

    			if (dirty & /*size*/ 2) {
    				toggle_class(input, "bx--toggle-input--small", /*size*/ ctx[1] === 'sm');
    			}

    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[11], dirty, get_labelText_slot_changes),
    						get_labelText_slot_context
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty & /*labelText*/ 32)) {
    					labelText_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (dirty & /*hideLabel*/ 64) {
    				toggle_class(span0, "bx--visually-hidden", /*hideLabel*/ ctx[6]);
    			}

    			if (labelA_slot) {
    				if (labelA_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						labelA_slot,
    						labelA_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(labelA_slot_template, /*$$scope*/ ctx[11], dirty, get_labelA_slot_changes),
    						get_labelA_slot_context
    					);
    				}
    			} else {
    				if (labelA_slot_or_fallback && labelA_slot_or_fallback.p && (!current || dirty & /*labelA*/ 8)) {
    					labelA_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (labelB_slot) {
    				if (labelB_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						labelB_slot,
    						labelB_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(labelB_slot_template, /*$$scope*/ ctx[11], dirty, get_labelB_slot_changes),
    						get_labelB_slot_context
    					);
    				}
    			} else {
    				if (labelB_slot_or_fallback && labelB_slot_or_fallback.p && (!current || dirty & /*labelB*/ 16)) {
    					labelB_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (!current || dirty & /*hideLabel*/ 64 && span3_style_value !== (span3_style_value = /*hideLabel*/ ctx[6] && 'margin-top: 0')) {
    				attr_dev(span3, "style", span3_style_value);
    			}

    			if (!current || dirty & /*labelText, $$props*/ 1056 && label_aria_label_value !== (label_aria_label_value = /*labelText*/ ctx[5]
    			? undefined
    			: /*$$props*/ ctx[10]['aria-label'] || 'Toggle')) {
    				attr_dev(label, "aria-label", label_aria_label_value);
    			}

    			if (!current || dirty & /*id*/ 128) {
    				attr_dev(label, "for", /*id*/ ctx[7]);
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*$$restProps*/ 512 && div_style_value !== (div_style_value = "" + (/*$$restProps*/ ctx[9]['style'] + "; user-select: none"))) && { style: div_style_value }
    			]));

    			toggle_class(div, "bx--form-item", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelText_slot_or_fallback, local);
    			transition_in(labelA_slot_or_fallback, local);
    			transition_in(labelB_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelText_slot_or_fallback, local);
    			transition_out(labelA_slot_or_fallback, local);
    			transition_out(labelB_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    			if (labelA_slot_or_fallback) labelA_slot_or_fallback.d(detaching);
    			if (labelB_slot_or_fallback) labelB_slot_or_fallback.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"size","toggled","disabled","labelA","labelB","labelText","hideLabel","id","name"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Toggle', slots, ['labelText','labelA','labelB']);
    	let { size = "default" } = $$props;
    	let { toggled = false } = $$props;
    	let { disabled = false } = $$props;
    	let { labelA = "Off" } = $$props;
    	let { labelB = "On" } = $$props;
    	let { labelText = "" } = $$props;
    	let { hideLabel = false } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { name = undefined } = $$props;
    	const dispatch = createEventDispatcher();

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	const change_handler_1 = () => {
    		$$invalidate(0, toggled = !toggled);
    	};

    	const keyup_handler_1 = e => {
    		if (e.key === ' ' || e.key === 'Enter') {
    			e.preventDefault();
    			$$invalidate(0, toggled = !toggled);
    		}
    	};

    	$$self.$$set = $$new_props => {
    		$$invalidate(10, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(1, size = $$new_props.size);
    		if ('toggled' in $$new_props) $$invalidate(0, toggled = $$new_props.toggled);
    		if ('disabled' in $$new_props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('labelA' in $$new_props) $$invalidate(3, labelA = $$new_props.labelA);
    		if ('labelB' in $$new_props) $$invalidate(4, labelB = $$new_props.labelB);
    		if ('labelText' in $$new_props) $$invalidate(5, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$new_props) $$invalidate(6, hideLabel = $$new_props.hideLabel);
    		if ('id' in $$new_props) $$invalidate(7, id = $$new_props.id);
    		if ('name' in $$new_props) $$invalidate(8, name = $$new_props.name);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		toggled,
    		disabled,
    		labelA,
    		labelB,
    		labelText,
    		hideLabel,
    		id,
    		name,
    		createEventDispatcher,
    		dispatch
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(10, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(1, size = $$new_props.size);
    		if ('toggled' in $$props) $$invalidate(0, toggled = $$new_props.toggled);
    		if ('disabled' in $$props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('labelA' in $$props) $$invalidate(3, labelA = $$new_props.labelA);
    		if ('labelB' in $$props) $$invalidate(4, labelB = $$new_props.labelB);
    		if ('labelText' in $$props) $$invalidate(5, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$props) $$invalidate(6, hideLabel = $$new_props.hideLabel);
    		if ('id' in $$props) $$invalidate(7, id = $$new_props.id);
    		if ('name' in $$props) $$invalidate(8, name = $$new_props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*toggled*/ 1) {
    			dispatch("toggle", { toggled });
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		toggled,
    		size,
    		disabled,
    		labelA,
    		labelB,
    		labelText,
    		hideLabel,
    		id,
    		name,
    		$$restProps,
    		$$props,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		change_handler,
    		keyup_handler,
    		focus_handler,
    		blur_handler,
    		change_handler_1,
    		keyup_handler_1
    	];
    }

    class Toggle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {
    			size: 1,
    			toggled: 0,
    			disabled: 2,
    			labelA: 3,
    			labelB: 4,
    			labelText: 5,
    			hideLabel: 6,
    			id: 7,
    			name: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Toggle",
    			options,
    			id: create_fragment$q.name
    		});
    	}

    	get size() {
    		throw new Error("<Toggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Toggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get toggled() {
    		throw new Error("<Toggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toggled(value) {
    		throw new Error("<Toggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Toggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Toggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelA() {
    		throw new Error("<Toggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelA(value) {
    		throw new Error("<Toggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelB() {
    		throw new Error("<Toggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelB(value) {
    		throw new Error("<Toggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelText() {
    		throw new Error("<Toggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelText(value) {
    		throw new Error("<Toggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideLabel() {
    		throw new Error("<Toggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideLabel(value) {
    		throw new Error("<Toggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Toggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Toggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Toggle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Toggle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Theme/Theme.svelte generated by Svelte v3.49.0 */

    const { Object: Object_1, console: console_1 } = globals;
    const get_default_slot_changes = dirty => ({ theme: dirty & /*theme*/ 1 });
    const get_default_slot_context = ctx => ({ theme: /*theme*/ ctx[0] });

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (98:0) {#if persist}
    function create_if_block_2$3(ctx) {
    	let localstorage;
    	let updating_value;
    	let current;

    	function localstorage_value_binding(value) {
    		/*localstorage_value_binding*/ ctx[9](value);
    	}

    	let localstorage_props = { key: /*persistKey*/ ctx[2] };

    	if (/*theme*/ ctx[0] !== void 0) {
    		localstorage_props.value = /*theme*/ ctx[0];
    	}

    	localstorage = new LocalStorage({
    			props: localstorage_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(localstorage, 'value', localstorage_value_binding));

    	const block = {
    		c: function create() {
    			create_component(localstorage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(localstorage, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const localstorage_changes = {};
    			if (dirty & /*persistKey*/ 4) localstorage_changes.key = /*persistKey*/ ctx[2];

    			if (!updating_value && dirty & /*theme*/ 1) {
    				updating_value = true;
    				localstorage_changes.value = /*theme*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			localstorage.$set(localstorage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(localstorage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(localstorage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(localstorage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(98:0) {#if persist}",
    		ctx
    	});

    	return block;
    }

    // (110:30) 
    function create_if_block_1$4(ctx) {
    	let select_1;
    	let updating_selected;
    	let current;
    	const select_1_spread_levels = [/*select*/ ctx[5]];

    	function select_1_selected_binding(value) {
    		/*select_1_selected_binding*/ ctx[11](value);
    	}

    	let select_1_props = {
    		$$slots: { default: [create_default_slot$5] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < select_1_spread_levels.length; i += 1) {
    		select_1_props = assign(select_1_props, select_1_spread_levels[i]);
    	}

    	if (/*theme*/ ctx[0] !== void 0) {
    		select_1_props.selected = /*theme*/ ctx[0];
    	}

    	select_1 = new Select({ props: select_1_props, $$inline: true });
    	binding_callbacks.push(() => bind(select_1, 'selected', select_1_selected_binding));

    	const block = {
    		c: function create() {
    			create_component(select_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(select_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const select_1_changes = (dirty & /*select*/ 32)
    			? get_spread_update(select_1_spread_levels, [get_spread_object(/*select*/ ctx[5])])
    			: {};

    			if (dirty & /*$$scope, select*/ 4128) {
    				select_1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_selected && dirty & /*theme*/ 1) {
    				updating_selected = true;
    				select_1_changes.selected = /*theme*/ ctx[0];
    				add_flush_callback(() => updating_selected = false);
    			}

    			select_1.$set(select_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(select_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(select_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(select_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(110:30) ",
    		ctx
    	});

    	return block;
    }

    // (102:0) {#if render === "toggle"}
    function create_if_block$h(ctx) {
    	let toggle_1;
    	let current;

    	const toggle_1_spread_levels = [
    		/*toggle*/ ctx[4],
    		{
    			toggled: /*theme*/ ctx[0] === /*toggle*/ ctx[4].themes[1]
    		}
    	];

    	let toggle_1_props = {};

    	for (let i = 0; i < toggle_1_spread_levels.length; i += 1) {
    		toggle_1_props = assign(toggle_1_props, toggle_1_spread_levels[i]);
    	}

    	toggle_1 = new Toggle({ props: toggle_1_props, $$inline: true });
    	toggle_1.$on("toggle", /*toggle_handler*/ ctx[10]);

    	const block = {
    		c: function create() {
    			create_component(toggle_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(toggle_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const toggle_1_changes = (dirty & /*toggle, theme*/ 17)
    			? get_spread_update(toggle_1_spread_levels, [
    					dirty & /*toggle*/ 16 && get_spread_object(/*toggle*/ ctx[4]),
    					{
    						toggled: /*theme*/ ctx[0] === /*toggle*/ ctx[4].themes[1]
    					}
    				])
    			: {};

    			toggle_1.$set(toggle_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(toggle_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(toggle_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(toggle_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$h.name,
    		type: "if",
    		source: "(102:0) {#if render === \\\"toggle\\\"}",
    		ctx
    	});

    	return block;
    }

    // (112:4) {#each select.themes as theme (theme)}
    function create_each_block$2(key_1, ctx) {
    	let first;
    	let selectitem;
    	let current;

    	selectitem = new SelectItem({
    			props: {
    				value: /*theme*/ ctx[0],
    				text: /*themes*/ ctx[6][/*theme*/ ctx[0]]
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(selectitem.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(selectitem, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const selectitem_changes = {};
    			if (dirty & /*select*/ 32) selectitem_changes.value = /*theme*/ ctx[0];
    			if (dirty & /*select*/ 32) selectitem_changes.text = /*themes*/ ctx[6][/*theme*/ ctx[0]];
    			selectitem.$set(selectitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(selectitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(112:4) {#each select.themes as theme (theme)}",
    		ctx
    	});

    	return block;
    }

    // (111:2) <Select {...select} bind:selected="{theme}">
    function create_default_slot$5(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = /*select*/ ctx[5].themes;
    	validate_each_argument(each_value);
    	const get_key = ctx => /*theme*/ ctx[0];
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*select, themes*/ 96) {
    				each_value = /*select*/ ctx[5].themes;
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$2, each_1_anchor, get_each_context$2);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(111:2) <Select {...select} bind:selected=\\\"{theme}\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let t0;
    	let current_block_type_index;
    	let if_block1;
    	let t1;
    	let current;
    	let if_block0 = /*persist*/ ctx[1] && create_if_block_2$3(ctx);
    	const if_block_creators = [create_if_block$h, create_if_block_1$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*render*/ ctx[3] === "toggle") return 0;
    		if (/*render*/ ctx[3] === "select") return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, t1, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*persist*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*persist*/ 2) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2$3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block1) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block1 = if_blocks[current_block_type_index];

    					if (!if_block1) {
    						if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block1.c();
    					} else {
    						if_block1.p(ctx, dirty);
    					}

    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				} else {
    					if_block1 = null;
    				}
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, theme*/ 4097)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[12],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(t1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Theme', slots, ['default']);
    	let { theme = "white" } = $$props;
    	let { tokens = {} } = $$props;
    	let { persist = false } = $$props;
    	let { persistKey = "theme" } = $$props;
    	let { render = undefined } = $$props;

    	let { toggle = {
    		themes: ["white", "g100"],
    		labelA: "",
    		labelB: "",
    		labelText: "Dark mode",
    		hideLabel: false
    	} } = $$props;

    	/** @type {Record<CarbonTheme, string>} */
    	const themes = {
    		white: "White",
    		g10: "Gray 10",
    		g80: "Gray 80",
    		g90: "Gray 90",
    		g100: "Gray 100"
    	};

    	/** @type {CarbonTheme} */
    	const themeKeys = Object.keys(themes);

    	let { select = {
    		themes: themeKeys,
    		labelText: "Themes",
    		hideLabel: false
    	} } = $$props;

    	const dispatch = createEventDispatcher();
    	const writable_props = ['theme', 'tokens', 'persist', 'persistKey', 'render', 'toggle', 'select'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Theme> was created with unknown prop '${key}'`);
    	});

    	function localstorage_value_binding(value) {
    		theme = value;
    		$$invalidate(0, theme);
    	}

    	const toggle_handler = ({ detail }) => {
    		$$invalidate(0, theme = detail.toggled ? toggle.themes[1] : toggle.themes[0]);
    	};

    	function select_1_selected_binding(value) {
    		theme = value;
    		$$invalidate(0, theme);
    	}

    	$$self.$$set = $$props => {
    		if ('theme' in $$props) $$invalidate(0, theme = $$props.theme);
    		if ('tokens' in $$props) $$invalidate(7, tokens = $$props.tokens);
    		if ('persist' in $$props) $$invalidate(1, persist = $$props.persist);
    		if ('persistKey' in $$props) $$invalidate(2, persistKey = $$props.persistKey);
    		if ('render' in $$props) $$invalidate(3, render = $$props.render);
    		if ('toggle' in $$props) $$invalidate(4, toggle = $$props.toggle);
    		if ('select' in $$props) $$invalidate(5, select = $$props.select);
    		if ('$$scope' in $$props) $$invalidate(12, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		theme,
    		tokens,
    		persist,
    		persistKey,
    		render,
    		toggle,
    		themes,
    		themeKeys,
    		select,
    		createEventDispatcher,
    		Toggle,
    		Select,
    		SelectItem,
    		LocalStorage,
    		dispatch
    	});

    	$$self.$inject_state = $$props => {
    		if ('theme' in $$props) $$invalidate(0, theme = $$props.theme);
    		if ('tokens' in $$props) $$invalidate(7, tokens = $$props.tokens);
    		if ('persist' in $$props) $$invalidate(1, persist = $$props.persist);
    		if ('persistKey' in $$props) $$invalidate(2, persistKey = $$props.persistKey);
    		if ('render' in $$props) $$invalidate(3, render = $$props.render);
    		if ('toggle' in $$props) $$invalidate(4, toggle = $$props.toggle);
    		if ('select' in $$props) $$invalidate(5, select = $$props.select);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*tokens, theme*/ 129) {
    			if (typeof window !== "undefined") {
    				Object.entries(tokens).forEach(([token, value]) => {
    					document.documentElement.style.setProperty(`--cds-${token}`, value);
    				});

    				if (theme in themes) {
    					document.documentElement.setAttribute("theme", theme);
    					dispatch("update", { theme });
    				} else {
    					console.warn(`[Theme.svelte] invalid theme "${theme}". Value must be one of: ${JSON.stringify(Object.keys(themes))}`);
    				}
    			}
    		}
    	};

    	return [
    		theme,
    		persist,
    		persistKey,
    		render,
    		toggle,
    		select,
    		themes,
    		tokens,
    		slots,
    		localstorage_value_binding,
    		toggle_handler,
    		select_1_selected_binding,
    		$$scope
    	];
    }

    class Theme extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$p, create_fragment$p, safe_not_equal, {
    			theme: 0,
    			tokens: 7,
    			persist: 1,
    			persistKey: 2,
    			render: 3,
    			toggle: 4,
    			select: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Theme",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get theme() {
    		throw new Error("<Theme>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set theme(value) {
    		throw new Error("<Theme>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tokens() {
    		throw new Error("<Theme>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tokens(value) {
    		throw new Error("<Theme>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get persist() {
    		throw new Error("<Theme>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set persist(value) {
    		throw new Error("<Theme>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get persistKey() {
    		throw new Error("<Theme>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set persistKey(value) {
    		throw new Error("<Theme>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get render() {
    		throw new Error("<Theme>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set render(value) {
    		throw new Error("<Theme>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get toggle() {
    		throw new Error("<Theme>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toggle(value) {
    		throw new Error("<Theme>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get select() {
    		throw new Error("<Theme>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set select(value) {
    		throw new Error("<Theme>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/Tile/Tile.svelte generated by Svelte v3.49.0 */

    const file$o = "node_modules/carbon-components-svelte/src/Tile/Tile.svelte";

    function create_fragment$o(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
    	let div_levels = [/*$$restProps*/ ctx[1]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--tile", true);
    			toggle_class(div, "bx--tile--light", /*light*/ ctx[0]);
    			add_location(div, file$o, 6, 0, 156);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", /*click_handler*/ ctx[4], false, false, false),
    					listen_dev(div, "mouseover", /*mouseover_handler*/ ctx[5], false, false, false),
    					listen_dev(div, "mouseenter", /*mouseenter_handler*/ ctx[6], false, false, false),
    					listen_dev(div, "mouseleave", /*mouseleave_handler*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]]));
    			toggle_class(div, "bx--tile", true);
    			toggle_class(div, "bx--tile--light", /*light*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	const omit_props_names = ["light"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tile', slots, ['default']);
    	let { light = false } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('light' in $$new_props) $$invalidate(0, light = $$new_props.light);
    		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ light });

    	$$self.$inject_state = $$new_props => {
    		if ('light' in $$props) $$invalidate(0, light = $$new_props.light);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		light,
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler
    	];
    }

    class Tile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, { light: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tile",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get light() {
    		throw new Error("<Tile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<Tile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/icons/Menu.svelte generated by Svelte v3.49.0 */

    const file$n = "node_modules/carbon-components-svelte/src/icons/Menu.svelte";

    // (24:2) {#if title}
    function create_if_block$g(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$n, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$g.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$n(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$g(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M4 6H28V8H4zM4 24H28V26H4zM4 12H28V14H4zM4 18H28V20H4z");
    			add_location(path, file$n, 24, 2, 579);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$n, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$g(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Menu', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Menu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get size() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const shouldRenderHamburgerMenu = writable(false);

    const isSideNavCollapsed = writable(false);

    /* node_modules/carbon-components-svelte/src/UIShell/HamburgerMenu.svelte generated by Svelte v3.49.0 */
    const file$m = "node_modules/carbon-components-svelte/src/UIShell/HamburgerMenu.svelte";

    function create_fragment$m(ctx) {
    	let button;
    	let switch_instance;
    	let current;
    	let mounted;
    	let dispose;

    	var switch_value = /*isOpen*/ ctx[0]
    	? /*iconClose*/ ctx[4]
    	: /*iconMenu*/ ctx[3];

    	function switch_props(ctx) {
    		return { props: { size: 20 }, $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	let button_levels = [
    		{ type: "button" },
    		{ title: /*ariaLabel*/ ctx[2] },
    		{ "aria-label": /*ariaLabel*/ ctx[2] },
    		/*$$restProps*/ ctx[5]
    	];

    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			set_attributes(button, button_data);
    			toggle_class(button, "bx--header__action", true);
    			toggle_class(button, "bx--header__menu-trigger", true);
    			toggle_class(button, "bx--header__menu-toggle", true);
    			add_location(button, file$m, 31, 0, 758);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, button, null);
    			}

    			if (button.autofocus) button.focus();
    			/*button_binding*/ ctx[7](button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*click_handler*/ ctx[6], false, false, false),
    					listen_dev(button, "click", /*click_handler_1*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = /*isOpen*/ ctx[0]
    			? /*iconClose*/ ctx[4]
    			: /*iconMenu*/ ctx[3])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, button, null);
    				} else {
    					switch_instance = null;
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				{ type: "button" },
    				(!current || dirty & /*ariaLabel*/ 4) && { title: /*ariaLabel*/ ctx[2] },
    				(!current || dirty & /*ariaLabel*/ 4) && { "aria-label": /*ariaLabel*/ ctx[2] },
    				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
    			]));

    			toggle_class(button, "bx--header__action", true);
    			toggle_class(button, "bx--header__menu-trigger", true);
    			toggle_class(button, "bx--header__menu-toggle", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (switch_instance) destroy_component(switch_instance);
    			/*button_binding*/ ctx[7](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	const omit_props_names = ["ariaLabel","isOpen","iconMenu","iconClose","ref"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HamburgerMenu', slots, []);
    	let { ariaLabel = undefined } = $$props;
    	let { isOpen = false } = $$props;
    	let { iconMenu = Menu } = $$props;
    	let { iconClose = Close } = $$props;
    	let { ref = null } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(1, ref);
    		});
    	}

    	const click_handler_1 = () => $$invalidate(0, isOpen = !isOpen);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('ariaLabel' in $$new_props) $$invalidate(2, ariaLabel = $$new_props.ariaLabel);
    		if ('isOpen' in $$new_props) $$invalidate(0, isOpen = $$new_props.isOpen);
    		if ('iconMenu' in $$new_props) $$invalidate(3, iconMenu = $$new_props.iconMenu);
    		if ('iconClose' in $$new_props) $$invalidate(4, iconClose = $$new_props.iconClose);
    		if ('ref' in $$new_props) $$invalidate(1, ref = $$new_props.ref);
    	};

    	$$self.$capture_state = () => ({
    		ariaLabel,
    		isOpen,
    		iconMenu,
    		iconClose,
    		ref,
    		Close,
    		Menu
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('ariaLabel' in $$props) $$invalidate(2, ariaLabel = $$new_props.ariaLabel);
    		if ('isOpen' in $$props) $$invalidate(0, isOpen = $$new_props.isOpen);
    		if ('iconMenu' in $$props) $$invalidate(3, iconMenu = $$new_props.iconMenu);
    		if ('iconClose' in $$props) $$invalidate(4, iconClose = $$new_props.iconClose);
    		if ('ref' in $$props) $$invalidate(1, ref = $$new_props.ref);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isOpen,
    		ref,
    		ariaLabel,
    		iconMenu,
    		iconClose,
    		$$restProps,
    		click_handler,
    		button_binding,
    		click_handler_1
    	];
    }

    class HamburgerMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$m, create_fragment$m, safe_not_equal, {
    			ariaLabel: 2,
    			isOpen: 0,
    			iconMenu: 3,
    			iconClose: 4,
    			ref: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HamburgerMenu",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get ariaLabel() {
    		throw new Error("<HamburgerMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<HamburgerMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		throw new Error("<HamburgerMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isOpen(value) {
    		throw new Error("<HamburgerMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconMenu() {
    		throw new Error("<HamburgerMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconMenu(value) {
    		throw new Error("<HamburgerMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconClose() {
    		throw new Error("<HamburgerMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconClose(value) {
    		throw new Error("<HamburgerMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<HamburgerMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<HamburgerMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/UIShell/Header.svelte generated by Svelte v3.49.0 */
    const file$l = "node_modules/carbon-components-svelte/src/UIShell/Header.svelte";
    const get_platform_slot_changes = dirty => ({});
    const get_platform_slot_context = ctx => ({});
    const get_skip_to_content_slot_changes = dirty => ({});
    const get_skip_to_content_slot_context = ctx => ({});

    // (83:2) {#if ($shouldRenderHamburgerMenu && winWidth < expansionBreakpoint) || persistentHamburgerMenu}
    function create_if_block_1$3(ctx) {
    	let hamburgermenu;
    	let updating_isOpen;
    	let current;

    	function hamburgermenu_isOpen_binding(value) {
    		/*hamburgermenu_isOpen_binding*/ ctx[19](value);
    	}

    	let hamburgermenu_props = {
    		iconClose: /*iconClose*/ ctx[8],
    		iconMenu: /*iconMenu*/ ctx[7]
    	};

    	if (/*isSideNavOpen*/ ctx[0] !== void 0) {
    		hamburgermenu_props.isOpen = /*isSideNavOpen*/ ctx[0];
    	}

    	hamburgermenu = new HamburgerMenu({
    			props: hamburgermenu_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(hamburgermenu, 'isOpen', hamburgermenu_isOpen_binding));

    	const block = {
    		c: function create() {
    			create_component(hamburgermenu.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(hamburgermenu, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const hamburgermenu_changes = {};
    			if (dirty & /*iconClose*/ 256) hamburgermenu_changes.iconClose = /*iconClose*/ ctx[8];
    			if (dirty & /*iconMenu*/ 128) hamburgermenu_changes.iconMenu = /*iconMenu*/ ctx[7];

    			if (!updating_isOpen && dirty & /*isSideNavOpen*/ 1) {
    				updating_isOpen = true;
    				hamburgermenu_changes.isOpen = /*isSideNavOpen*/ ctx[0];
    				add_flush_callback(() => updating_isOpen = false);
    			}

    			hamburgermenu.$set(hamburgermenu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(hamburgermenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(hamburgermenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(hamburgermenu, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(83:2) {#if ($shouldRenderHamburgerMenu && winWidth < expansionBreakpoint) || persistentHamburgerMenu}",
    		ctx
    	});

    	return block;
    }

    // (97:4) {#if company}
    function create_if_block$f(ctx) {
    	let span;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(/*company*/ ctx[3]);
    			t1 = text(" ");
    			toggle_class(span, "bx--header__name--prefix", true);
    			add_location(span, file$l, 97, 6, 2527);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*company*/ 8) set_data_dev(t0, /*company*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$f.name,
    		type: "if",
    		source: "(97:4) {#if company}",
    		ctx
    	});

    	return block;
    }

    // (100:26) {platformName}
    function fallback_block$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*platformName*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*platformName*/ 16) set_data_dev(t, /*platformName*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$2.name,
    		type: "fallback",
    		source: "(100:26) {platformName}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let header;
    	let t0;
    	let t1;
    	let a;
    	let t2;
    	let t3;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[18]);
    	const skip_to_content_slot_template = /*#slots*/ ctx[16]["skip-to-content"];
    	const skip_to_content_slot = create_slot(skip_to_content_slot_template, ctx, /*$$scope*/ ctx[15], get_skip_to_content_slot_context);
    	let if_block0 = (/*$shouldRenderHamburgerMenu*/ ctx[11] && /*winWidth*/ ctx[9] < /*expansionBreakpoint*/ ctx[6] || /*persistentHamburgerMenu*/ ctx[5]) && create_if_block_1$3(ctx);
    	let if_block1 = /*company*/ ctx[3] && create_if_block$f(ctx);
    	const platform_slot_template = /*#slots*/ ctx[16].platform;
    	const platform_slot = create_slot(platform_slot_template, ctx, /*$$scope*/ ctx[15], get_platform_slot_context);
    	const platform_slot_or_fallback = platform_slot || fallback_block$2(ctx);
    	let a_levels = [{ href: /*href*/ ctx[2] }, /*$$restProps*/ ctx[12]];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	const block = {
    		c: function create() {
    			header = element("header");
    			if (skip_to_content_slot) skip_to_content_slot.c();
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			a = element("a");
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (platform_slot_or_fallback) platform_slot_or_fallback.c();
    			t3 = space();
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			toggle_class(a, "bx--header__name", true);
    			add_location(a, file$l, 89, 2, 2386);
    			attr_dev(header, "aria-label", /*ariaLabel*/ ctx[10]);
    			toggle_class(header, "bx--header", true);
    			add_location(header, file$l, 80, 0, 2064);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);

    			if (skip_to_content_slot) {
    				skip_to_content_slot.m(header, null);
    			}

    			append_dev(header, t0);
    			if (if_block0) if_block0.m(header, null);
    			append_dev(header, t1);
    			append_dev(header, a);
    			if (if_block1) if_block1.m(a, null);
    			append_dev(a, t2);

    			if (platform_slot_or_fallback) {
    				platform_slot_or_fallback.m(a, null);
    			}

    			/*a_binding*/ ctx[20](a);
    			append_dev(header, t3);

    			if (default_slot) {
    				default_slot.m(header, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "resize", /*onwindowresize*/ ctx[18]),
    					listen_dev(a, "click", /*click_handler*/ ctx[17], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (skip_to_content_slot) {
    				if (skip_to_content_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						skip_to_content_slot,
    						skip_to_content_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(skip_to_content_slot_template, /*$$scope*/ ctx[15], dirty, get_skip_to_content_slot_changes),
    						get_skip_to_content_slot_context
    					);
    				}
    			}

    			if (/*$shouldRenderHamburgerMenu*/ ctx[11] && /*winWidth*/ ctx[9] < /*expansionBreakpoint*/ ctx[6] || /*persistentHamburgerMenu*/ ctx[5]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*$shouldRenderHamburgerMenu, winWidth, expansionBreakpoint, persistentHamburgerMenu*/ 2656) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(header, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*company*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$f(ctx);
    					if_block1.c();
    					if_block1.m(a, t2);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (platform_slot) {
    				if (platform_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						platform_slot,
    						platform_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(platform_slot_template, /*$$scope*/ ctx[15], dirty, get_platform_slot_changes),
    						get_platform_slot_context
    					);
    				}
    			} else {
    				if (platform_slot_or_fallback && platform_slot_or_fallback.p && (!current || dirty & /*platformName*/ 16)) {
    					platform_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 4) && { href: /*href*/ ctx[2] },
    				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			toggle_class(a, "bx--header__name", true);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*ariaLabel*/ 1024) {
    				attr_dev(header, "aria-label", /*ariaLabel*/ ctx[10]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skip_to_content_slot, local);
    			transition_in(if_block0);
    			transition_in(platform_slot_or_fallback, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skip_to_content_slot, local);
    			transition_out(if_block0);
    			transition_out(platform_slot_or_fallback, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (skip_to_content_slot) skip_to_content_slot.d(detaching);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (platform_slot_or_fallback) platform_slot_or_fallback.d(detaching);
    			/*a_binding*/ ctx[20](null);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let ariaLabel;

    	const omit_props_names = [
    		"expandedByDefault","isSideNavOpen","uiShellAriaLabel","href","company","platformName","persistentHamburgerMenu","expansionBreakpoint","ref","iconMenu","iconClose"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $shouldRenderHamburgerMenu;
    	validate_store(shouldRenderHamburgerMenu, 'shouldRenderHamburgerMenu');
    	component_subscribe($$self, shouldRenderHamburgerMenu, $$value => $$invalidate(11, $shouldRenderHamburgerMenu = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, ['skip-to-content','platform','default']);
    	let { expandedByDefault = true } = $$props;
    	let { isSideNavOpen = false } = $$props;
    	let { uiShellAriaLabel = undefined } = $$props;
    	let { href = undefined } = $$props;
    	let { company = undefined } = $$props;
    	let { platformName = "" } = $$props;
    	let { persistentHamburgerMenu = false } = $$props;
    	let { expansionBreakpoint = 1056 } = $$props;
    	let { ref = null } = $$props;
    	let { iconMenu = Menu } = $$props;
    	let { iconClose = Close } = $$props;
    	let winWidth = undefined;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function onwindowresize() {
    		$$invalidate(9, winWidth = window.innerWidth);
    	}

    	function hamburgermenu_isOpen_binding(value) {
    		isSideNavOpen = value;
    		(((($$invalidate(0, isSideNavOpen), $$invalidate(13, expandedByDefault)), $$invalidate(9, winWidth)), $$invalidate(6, expansionBreakpoint)), $$invalidate(5, persistentHamburgerMenu));
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(1, ref);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(21, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('expandedByDefault' in $$new_props) $$invalidate(13, expandedByDefault = $$new_props.expandedByDefault);
    		if ('isSideNavOpen' in $$new_props) $$invalidate(0, isSideNavOpen = $$new_props.isSideNavOpen);
    		if ('uiShellAriaLabel' in $$new_props) $$invalidate(14, uiShellAriaLabel = $$new_props.uiShellAriaLabel);
    		if ('href' in $$new_props) $$invalidate(2, href = $$new_props.href);
    		if ('company' in $$new_props) $$invalidate(3, company = $$new_props.company);
    		if ('platformName' in $$new_props) $$invalidate(4, platformName = $$new_props.platformName);
    		if ('persistentHamburgerMenu' in $$new_props) $$invalidate(5, persistentHamburgerMenu = $$new_props.persistentHamburgerMenu);
    		if ('expansionBreakpoint' in $$new_props) $$invalidate(6, expansionBreakpoint = $$new_props.expansionBreakpoint);
    		if ('ref' in $$new_props) $$invalidate(1, ref = $$new_props.ref);
    		if ('iconMenu' in $$new_props) $$invalidate(7, iconMenu = $$new_props.iconMenu);
    		if ('iconClose' in $$new_props) $$invalidate(8, iconClose = $$new_props.iconClose);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		expandedByDefault,
    		isSideNavOpen,
    		uiShellAriaLabel,
    		href,
    		company,
    		platformName,
    		persistentHamburgerMenu,
    		expansionBreakpoint,
    		ref,
    		iconMenu,
    		iconClose,
    		Close,
    		Menu,
    		shouldRenderHamburgerMenu,
    		HamburgerMenu,
    		winWidth,
    		ariaLabel,
    		$shouldRenderHamburgerMenu
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(21, $$props = assign(assign({}, $$props), $$new_props));
    		if ('expandedByDefault' in $$props) $$invalidate(13, expandedByDefault = $$new_props.expandedByDefault);
    		if ('isSideNavOpen' in $$props) $$invalidate(0, isSideNavOpen = $$new_props.isSideNavOpen);
    		if ('uiShellAriaLabel' in $$props) $$invalidate(14, uiShellAriaLabel = $$new_props.uiShellAriaLabel);
    		if ('href' in $$props) $$invalidate(2, href = $$new_props.href);
    		if ('company' in $$props) $$invalidate(3, company = $$new_props.company);
    		if ('platformName' in $$props) $$invalidate(4, platformName = $$new_props.platformName);
    		if ('persistentHamburgerMenu' in $$props) $$invalidate(5, persistentHamburgerMenu = $$new_props.persistentHamburgerMenu);
    		if ('expansionBreakpoint' in $$props) $$invalidate(6, expansionBreakpoint = $$new_props.expansionBreakpoint);
    		if ('ref' in $$props) $$invalidate(1, ref = $$new_props.ref);
    		if ('iconMenu' in $$props) $$invalidate(7, iconMenu = $$new_props.iconMenu);
    		if ('iconClose' in $$props) $$invalidate(8, iconClose = $$new_props.iconClose);
    		if ('winWidth' in $$props) $$invalidate(9, winWidth = $$new_props.winWidth);
    		if ('ariaLabel' in $$props) $$invalidate(10, ariaLabel = $$new_props.ariaLabel);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*expandedByDefault, winWidth, expansionBreakpoint, persistentHamburgerMenu*/ 8800) {
    			$$invalidate(0, isSideNavOpen = expandedByDefault && winWidth >= expansionBreakpoint && !persistentHamburgerMenu);
    		}

    		$$invalidate(10, ariaLabel = company
    		? `${company} `
    		: "" + (uiShellAriaLabel || $$props["aria-label"] || platformName));
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		isSideNavOpen,
    		ref,
    		href,
    		company,
    		platformName,
    		persistentHamburgerMenu,
    		expansionBreakpoint,
    		iconMenu,
    		iconClose,
    		winWidth,
    		ariaLabel,
    		$shouldRenderHamburgerMenu,
    		$$restProps,
    		expandedByDefault,
    		uiShellAriaLabel,
    		$$scope,
    		slots,
    		click_handler,
    		onwindowresize,
    		hamburgermenu_isOpen_binding,
    		a_binding
    	];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {
    			expandedByDefault: 13,
    			isSideNavOpen: 0,
    			uiShellAriaLabel: 14,
    			href: 2,
    			company: 3,
    			platformName: 4,
    			persistentHamburgerMenu: 5,
    			expansionBreakpoint: 6,
    			ref: 1,
    			iconMenu: 7,
    			iconClose: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get expandedByDefault() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set expandedByDefault(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isSideNavOpen() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isSideNavOpen(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get uiShellAriaLabel() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set uiShellAriaLabel(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get company() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set company(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get platformName() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set platformName(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get persistentHamburgerMenu() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set persistentHamburgerMenu(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get expansionBreakpoint() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set expansionBreakpoint(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconMenu() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconMenu(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconClose() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconClose(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/UIShell/HeaderUtilities.svelte generated by Svelte v3.49.0 */

    const file$k = "node_modules/carbon-components-svelte/src/UIShell/HeaderUtilities.svelte";

    function create_fragment$k(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			toggle_class(div, "bx--header__global", true);
    			add_location(div, file$k, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HeaderUtilities', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HeaderUtilities> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class HeaderUtilities extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HeaderUtilities",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* node_modules/carbon-components-svelte/src/UIShell/Content.svelte generated by Svelte v3.49.0 */
    const file$j = "node_modules/carbon-components-svelte/src/UIShell/Content.svelte";

    function create_fragment$j(ctx) {
    	let main;
    	let main_style_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	let main_levels = [
    		{ id: /*id*/ ctx[0] },
    		/*$$restProps*/ ctx[2],
    		{
    			style: main_style_value = "" + ((/*$isSideNavCollapsed*/ ctx[1] && 'margin-left: 0;') + " " + /*$$restProps*/ ctx[2].style + "}")
    		}
    	];

    	let main_data = {};

    	for (let i = 0; i < main_levels.length; i += 1) {
    		main_data = assign(main_data, main_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			if (default_slot) default_slot.c();
    			set_attributes(main, main_data);
    			toggle_class(main, "bx--content", true);
    			add_location(main, file$j, 7, 0, 151);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);

    			if (default_slot) {
    				default_slot.m(main, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(main, main_data = get_spread_update(main_levels, [
    				(!current || dirty & /*id*/ 1) && { id: /*id*/ ctx[0] },
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2],
    				(!current || dirty & /*$isSideNavCollapsed, $$restProps*/ 6 && main_style_value !== (main_style_value = "" + ((/*$isSideNavCollapsed*/ ctx[1] && 'margin-left: 0;') + " " + /*$$restProps*/ ctx[2].style + "}"))) && { style: main_style_value }
    			]));

    			toggle_class(main, "bx--content", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	const omit_props_names = ["id"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $isSideNavCollapsed;
    	validate_store(isSideNavCollapsed, 'isSideNavCollapsed');
    	component_subscribe($$self, isSideNavCollapsed, $$value => $$invalidate(1, $isSideNavCollapsed = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Content', slots, ['default']);
    	let { id = "main-content" } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('id' in $$new_props) $$invalidate(0, id = $$new_props.id);
    		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		id,
    		isSideNavCollapsed,
    		$isSideNavCollapsed
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('id' in $$props) $$invalidate(0, id = $$new_props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [id, $isSideNavCollapsed, $$restProps, $$scope, slots];
    }

    class Content extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { id: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Content",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get id() {
    		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/UIShell/SkipToContent.svelte generated by Svelte v3.49.0 */

    const file$i = "node_modules/carbon-components-svelte/src/UIShell/SkipToContent.svelte";

    // (16:8) Skip to main content
    function fallback_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Skip to main content");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(16:8) Skip to main content",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
    	const default_slot_or_fallback = default_slot || fallback_block$1(ctx);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ tabindex: /*tabindex*/ ctx[1] },
    		/*$$restProps*/ ctx[2]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			set_attributes(a, a_data);
    			toggle_class(a, "bx--skip-to-content", true);
    			add_location(a, file$i, 8, 0, 155);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*tabindex*/ 2) && { tabindex: /*tabindex*/ ctx[1] },
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]
    			]));

    			toggle_class(a, "bx--skip-to-content", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	const omit_props_names = ["href","tabindex"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SkipToContent', slots, ['default']);
    	let { href = "#main-content" } = $$props;
    	let { tabindex = "0" } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('href' in $$new_props) $$invalidate(0, href = $$new_props.href);
    		if ('tabindex' in $$new_props) $$invalidate(1, tabindex = $$new_props.tabindex);
    		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ href, tabindex });

    	$$self.$inject_state = $$new_props => {
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('tabindex' in $$props) $$invalidate(1, tabindex = $$new_props.tabindex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [href, tabindex, $$restProps, $$scope, slots, click_handler];
    }

    class SkipToContent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { href: 0, tabindex: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkipToContent",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get href() {
    		throw new Error("<SkipToContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<SkipToContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<SkipToContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<SkipToContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-components-svelte/src/UIShell/HeaderGlobalAction.svelte generated by Svelte v3.49.0 */

    const file$h = "node_modules/carbon-components-svelte/src/UIShell/HeaderGlobalAction.svelte";

    // (23:8)      
    function fallback_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*icon*/ ctx[2];

    	function switch_props(ctx) {
    		return { props: { size: 20 }, $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*icon*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(23:8)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);
    	let button_levels = [{ type: "button" }, /*$$restProps*/ ctx[3]];
    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			set_attributes(button, button_data);
    			toggle_class(button, "bx--header__action", true);
    			toggle_class(button, "bx--header__action--active", /*isActive*/ ctx[1]);
    			add_location(button, file$h, 14, 0, 310);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(button, null);
    			}

    			if (button.autofocus) button.focus();
    			/*button_binding*/ ctx[7](button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*icon*/ 4)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [{ type: "button" }, dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]]));
    			toggle_class(button, "bx--header__action", true);
    			toggle_class(button, "bx--header__action--active", /*isActive*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			/*button_binding*/ ctx[7](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	const omit_props_names = ["isActive","icon","ref"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HeaderGlobalAction', slots, ['default']);
    	let { isActive = false } = $$props;
    	let { icon = undefined } = $$props;
    	let { ref = null } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('isActive' in $$new_props) $$invalidate(1, isActive = $$new_props.isActive);
    		if ('icon' in $$new_props) $$invalidate(2, icon = $$new_props.icon);
    		if ('ref' in $$new_props) $$invalidate(0, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ isActive, icon, ref });

    	$$self.$inject_state = $$new_props => {
    		if ('isActive' in $$props) $$invalidate(1, isActive = $$new_props.isActive);
    		if ('icon' in $$props) $$invalidate(2, icon = $$new_props.icon);
    		if ('ref' in $$props) $$invalidate(0, ref = $$new_props.ref);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		ref,
    		isActive,
    		icon,
    		$$restProps,
    		$$scope,
    		slots,
    		click_handler,
    		button_binding
    	];
    }

    class HeaderGlobalAction extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { isActive: 1, icon: 2, ref: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HeaderGlobalAction",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get isActive() {
    		throw new Error("<HeaderGlobalAction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isActive(value) {
    		throw new Error("<HeaderGlobalAction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<HeaderGlobalAction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<HeaderGlobalAction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<HeaderGlobalAction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<HeaderGlobalAction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/wol.svelte generated by Svelte v3.49.0 */

    const file$g = "src/components/wol.svelte";

    // (22:6) {:else}
    function create_else_block_7(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 24, 10, 1011);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 23, 8, 969);
    			attr_dev(div, "id", "category-1");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(0deg) scale(" + /*data*/ ctx[0][0].scale + ")");
    			add_location(div, file$g, 22, 6, 864);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(0deg) scale(" + /*data*/ ctx[0][0].scale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_7.name,
    		type: "else",
    		source: "(22:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (16:6) {#if data[0].calculated}
    function create_if_block_7$1(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 18, 10, 765);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 17, 8, 723);
    			attr_dev(div, "id", "category-1");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(0deg) scale(" + /*data*/ ctx[0][0].calculatedscale + ")");
    			add_location(div, file$g, 16, 6, 608);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(0deg) scale(" + /*data*/ ctx[0][0].calculatedscale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7$1.name,
    		type: "if",
    		source: "(16:6) {#if data[0].calculated}",
    		ctx
    	});

    	return block;
    }

    // (55:6) {:else}
    function create_else_block_6(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 57, 10, 2323);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 56, 8, 2281);
    			attr_dev(div, "id", "category-2");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(45deg) scale(" + /*data*/ ctx[0][1].scale);
    			add_location(div, file$g, 55, 6, 2176);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(45deg) scale(" + /*data*/ ctx[0][1].scale);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_6.name,
    		type: "else",
    		source: "(55:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (49:6) {#if data[1].calculated}
    function create_if_block_6$1(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 51, 10, 2077);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 50, 8, 2035);
    			attr_dev(div, "id", "category-2");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(45deg) scale(" + /*data*/ ctx[0][1].calculatedscale);
    			add_location(div, file$g, 49, 6, 1920);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(45deg) scale(" + /*data*/ ctx[0][1].calculatedscale);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6$1.name,
    		type: "if",
    		source: "(49:6) {#if data[1].calculated}",
    		ctx
    	});

    	return block;
    }

    // (79:6) {:else}
    function create_else_block_5(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 81, 10, 3354);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 80, 8, 3312);
    			attr_dev(div, "id", "category-3");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(90deg) scale(" + /*data*/ ctx[0][2].scale + ")");
    			add_location(div, file$g, 79, 6, 3206);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(90deg) scale(" + /*data*/ ctx[0][2].scale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_5.name,
    		type: "else",
    		source: "(79:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (73:6) {#if data[2].calculated}
    function create_if_block_5$1(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 75, 10, 3107);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 74, 8, 3065);
    			attr_dev(div, "id", "category-3");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(90deg) scale(" + /*data*/ ctx[0][2].calculatedscale + ")");
    			add_location(div, file$g, 73, 6, 2949);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(90deg) scale(" + /*data*/ ctx[0][2].calculatedscale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$1.name,
    		type: "if",
    		source: "(73:6) {#if data[2].calculated}",
    		ctx
    	});

    	return block;
    }

    // (102:6) {:else}
    function create_else_block_4(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 104, 10, 4382);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 103, 8, 4340);
    			attr_dev(div, "id", "category-4");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(135deg) scale(" + /*data*/ ctx[0][3].scale + ")");
    			add_location(div, file$g, 102, 6, 4233);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(135deg) scale(" + /*data*/ ctx[0][3].scale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_4.name,
    		type: "else",
    		source: "(102:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (96:6) {#if data[3].calculated}
    function create_if_block_4$1(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 98, 10, 4134);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 97, 8, 4092);
    			attr_dev(div, "id", "category-4");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(135deg) scale(" + /*data*/ ctx[0][3].calculatedscale + ")");
    			add_location(div, file$g, 96, 6, 3975);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(135deg) scale(" + /*data*/ ctx[0][3].calculatedscale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(96:6) {#if data[3].calculated}",
    		ctx
    	});

    	return block;
    }

    // (125:6) {:else}
    function create_else_block_3(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 127, 10, 5411);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 126, 8, 5369);
    			attr_dev(div, "id", "category-5");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(180deg) scale(" + /*data*/ ctx[0][4].scale + ")");
    			add_location(div, file$g, 125, 6, 5262);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(180deg) scale(" + /*data*/ ctx[0][4].scale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_3.name,
    		type: "else",
    		source: "(125:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (119:6) {#if data[4].calculated}
    function create_if_block_3$1(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 121, 10, 5163);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 120, 8, 5121);
    			attr_dev(div, "id", "category-5");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(180deg) scale(" + /*data*/ ctx[0][4].calculatedscale + ")");
    			add_location(div, file$g, 119, 6, 5004);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(180deg) scale(" + /*data*/ ctx[0][4].calculatedscale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(119:6) {#if data[4].calculated}",
    		ctx
    	});

    	return block;
    }

    // (148:6) {:else}
    function create_else_block_2(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 150, 10, 6440);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 149, 8, 6398);
    			attr_dev(div, "id", "category-6");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(225deg) scale(" + /*data*/ ctx[0][5].scale + ")");
    			add_location(div, file$g, 148, 6, 6291);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(225deg) scale(" + /*data*/ ctx[0][5].scale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(148:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (142:6) {#if data[5].calculated}
    function create_if_block_2$2(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			add_location(path, file$g, 144, 10, 6192);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 143, 8, 6150);
    			attr_dev(div, "id", "category-6");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(225deg) scale(" + /*data*/ ctx[0][5].calculatedscale + ")");
    			add_location(div, file$g, 142, 6, 6033);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(225deg) scale(" + /*data*/ ctx[0][5].calculatedscale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(142:6) {#if data[5].calculated}",
    		ctx
    	});

    	return block;
    }

    // (171:6) {:else}
    function create_else_block_1$1(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			attr_dev(path, "id", "texttest1");
    			add_location(path, file$g, 173, 10, 7484);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 172, 8, 7442);
    			attr_dev(div, "id", "category-7");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(270deg) scale(" + /*data*/ ctx[0][6].scale + ")");
    			add_location(div, file$g, 171, 6, 7335);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(270deg) scale(" + /*data*/ ctx[0][6].scale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(171:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (165:6) {#if data[6].calculated}
    function create_if_block_1$2(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			attr_dev(path, "id", "texttest1");
    			add_location(path, file$g, 167, 10, 7221);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 166, 8, 7179);
    			attr_dev(div, "id", "category-7");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(270deg) scale(" + /*data*/ ctx[0][6].calculatedscale + ")");
    			add_location(div, file$g, 165, 6, 7062);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(270deg) scale(" + /*data*/ ctx[0][6].calculatedscale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(165:6) {#if data[6].calculated}",
    		ctx
    	});

    	return block;
    }

    // (194:6) {:else}
    function create_else_block$1(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			attr_dev(path, "id", "texttest");
    			add_location(path, file$g, 196, 10, 8542);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 195, 8, 8500);
    			attr_dev(div, "id", "category-8");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(315deg) scale(" + /*data*/ ctx[0][7].scale + ")");
    			add_location(div, file$g, 194, 6, 8393);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(315deg) scale(" + /*data*/ ctx[0][7].scale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(194:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (188:6) {#if data[7].calculated}
    function create_if_block$e(ctx) {
    	let div;
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z");
    			attr_dev(path, "id", "texttest");
    			add_location(path, file$g, 190, 10, 8280);
    			attr_dev(svg, "viewBox", "0 0 110.5 155.5");
    			attr_dev(svg, "class", "svelte-793pj3");
    			add_location(svg, file$g, 189, 8, 8238);
    			attr_dev(div, "id", "category-8");
    			attr_dev(div, "class", "triangle svelte-793pj3");
    			set_style(div, "transform", "rotate(315deg) scale(" + /*data*/ ctx[0][7].calculatedscale + ")");
    			add_location(div, file$g, 188, 6, 8121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1) {
    				set_style(div, "transform", "rotate(315deg) scale(" + /*data*/ ctx[0][7].calculatedscale + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$e.name,
    		type: "if",
    		source: "(188:6) {#if data[7].calculated}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div8;
    	let img;
    	let img_src_value;
    	let t0;
    	let t1;
    	let div0;
    	let svg0;
    	let path0;
    	let style;
    	let t2;
    	let text0;
    	let textPath0;
    	let t3_value = /*data*/ ctx[0][0].label + "";
    	let t3;
    	let t4;
    	let t5;
    	let div1;
    	let svg1;
    	let path1;
    	let text1;
    	let textPath1;
    	let t6_value = /*data*/ ctx[0][1].label + "";
    	let t6;
    	let t7;
    	let t8;
    	let div2;
    	let svg2;
    	let path2;
    	let text2;
    	let textPath2;
    	let t9_value = /*data*/ ctx[0][2].label + "";
    	let t9;
    	let t10;
    	let t11;
    	let div3;
    	let svg3;
    	let path3;
    	let text3;
    	let textPath3;
    	let t12_value = /*data*/ ctx[0][3].label + "";
    	let t12;
    	let t13;
    	let t14;
    	let div4;
    	let svg4;
    	let path4;
    	let text4;
    	let textPath4;
    	let t15_value = /*data*/ ctx[0][4].label + "";
    	let t15;
    	let t16;
    	let t17;
    	let div5;
    	let svg5;
    	let path5;
    	let text5;
    	let textPath5;
    	let t18_value = /*data*/ ctx[0][5].label + "";
    	let t18;
    	let t19;
    	let t20;
    	let div6;
    	let svg6;
    	let path6;
    	let text6;
    	let textPath6;
    	let t21_value = /*data*/ ctx[0][6].label + "";
    	let t21;
    	let t22;
    	let t23;
    	let div7;
    	let svg7;
    	let path7;
    	let text7;
    	let textPath7;
    	let t24_value = /*data*/ ctx[0][7].label + "";
    	let t24;

    	function select_block_type(ctx, dirty) {
    		if (/*data*/ ctx[0][0].calculated) return create_if_block_7$1;
    		return create_else_block_7;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*data*/ ctx[0][1].calculated) return create_if_block_6$1;
    		return create_else_block_6;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block1 = current_block_type_1(ctx);

    	function select_block_type_2(ctx, dirty) {
    		if (/*data*/ ctx[0][2].calculated) return create_if_block_5$1;
    		return create_else_block_5;
    	}

    	let current_block_type_2 = select_block_type_2(ctx);
    	let if_block2 = current_block_type_2(ctx);

    	function select_block_type_3(ctx, dirty) {
    		if (/*data*/ ctx[0][3].calculated) return create_if_block_4$1;
    		return create_else_block_4;
    	}

    	let current_block_type_3 = select_block_type_3(ctx);
    	let if_block3 = current_block_type_3(ctx);

    	function select_block_type_4(ctx, dirty) {
    		if (/*data*/ ctx[0][4].calculated) return create_if_block_3$1;
    		return create_else_block_3;
    	}

    	let current_block_type_4 = select_block_type_4(ctx);
    	let if_block4 = current_block_type_4(ctx);

    	function select_block_type_5(ctx, dirty) {
    		if (/*data*/ ctx[0][5].calculated) return create_if_block_2$2;
    		return create_else_block_2;
    	}

    	let current_block_type_5 = select_block_type_5(ctx);
    	let if_block5 = current_block_type_5(ctx);

    	function select_block_type_6(ctx, dirty) {
    		if (/*data*/ ctx[0][6].calculated) return create_if_block_1$2;
    		return create_else_block_1$1;
    	}

    	let current_block_type_6 = select_block_type_6(ctx);
    	let if_block6 = current_block_type_6(ctx);

    	function select_block_type_7(ctx, dirty) {
    		if (/*data*/ ctx[0][7].calculated) return create_if_block$e;
    		return create_else_block$1;
    	}

    	let current_block_type_7 = select_block_type_7(ctx);
    	let if_block7 = current_block_type_7(ctx);

    	const block = {
    		c: function create() {
    			div8 = element("div");
    			img = element("img");
    			t0 = space();
    			if_block0.c();
    			t1 = space();
    			div0 = element("div");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			style = svg_element("style");
    			t2 = text("text { \n                font-size: 10px;\n                font-family: Franklin Gothic, sans-serif;\n                font-weight: 900; \n                text-transform: uppercase;\n                letter-spacing: 10px;\n                fill: white;}\n        ");
    			text0 = svg_element("text");
    			textPath0 = svg_element("textPath");
    			t3 = text(t3_value);
    			t4 = space();
    			if_block1.c();
    			t5 = space();
    			div1 = element("div");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			text1 = svg_element("text");
    			textPath1 = svg_element("textPath");
    			t6 = text(t6_value);
    			t7 = space();
    			if_block2.c();
    			t8 = space();
    			div2 = element("div");
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			text2 = svg_element("text");
    			textPath2 = svg_element("textPath");
    			t9 = text(t9_value);
    			t10 = space();
    			if_block3.c();
    			t11 = space();
    			div3 = element("div");
    			svg3 = svg_element("svg");
    			path3 = svg_element("path");
    			text3 = svg_element("text");
    			textPath3 = svg_element("textPath");
    			t12 = text(t12_value);
    			t13 = space();
    			if_block4.c();
    			t14 = space();
    			div4 = element("div");
    			svg4 = svg_element("svg");
    			path4 = svg_element("path");
    			text4 = svg_element("text");
    			textPath4 = svg_element("textPath");
    			t15 = text(t15_value);
    			t16 = space();
    			if_block5.c();
    			t17 = space();
    			div5 = element("div");
    			svg5 = svg_element("svg");
    			path5 = svg_element("path");
    			text5 = svg_element("text");
    			textPath5 = svg_element("textPath");
    			t18 = text(t18_value);
    			t19 = space();
    			if_block6.c();
    			t20 = space();
    			div6 = element("div");
    			svg6 = svg_element("svg");
    			path6 = svg_element("path");
    			text6 = svg_element("text");
    			textPath6 = svg_element("textPath");
    			t21 = text(t21_value);
    			t22 = space();
    			if_block7.c();
    			t23 = space();
    			div7 = element("div");
    			svg7 = svg_element("svg");
    			path7 = svg_element("path");
    			text7 = svg_element("text");
    			textPath7 = svg_element("textPath");
    			t24 = text(t24_value);
    			attr_dev(img, "id", "wheelOfLife-background");
    			if (!src_url_equal(img.src, img_src_value = "./images/Wheel-Of-Life.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Wheel Of Life");
    			attr_dev(img, "class", "svelte-793pj3");
    			add_location(img, file$g, 14, 6, 484);
    			attr_dev(path0, "fill", "transparent");
    			attr_dev(path0, "d", "M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z");
    			attr_dev(path0, "id", "label1");
    			add_location(path0, file$g, 30, 10, 1251);
    			add_location(style, file$g, 31, 10, 1343);
    			xlink_attr(textPath0, "xlink:href", "#label1");
    			attr_dev(textPath0, "textLength", "106");
    			attr_dev(textPath0, "lengthAdjust", "spacing");
    			add_location(textPath0, file$g, 41, 12, 1708);
    			attr_dev(text0, "dx", "6");
    			attr_dev(text0, "dy", "-1");
    			attr_dev(text0, "textLength", "106");
    			attr_dev(text0, "lengthAdjust", "spacing");
    			add_location(text0, file$g, 40, 8, 1633);
    			attr_dev(svg0, "viewBox", "-8 -8 110.5 155.5");
    			attr_dev(svg0, "class", "svelte-793pj3");
    			add_location(svg0, file$g, 29, 8, 1207);
    			attr_dev(div0, "id", "category-label");
    			attr_dev(div0, "class", "triangle svelte-793pj3");
    			set_style(div0, "transform", "rotate(0deg) scale(1.2)");
    			add_location(div0, file$g, 28, 6, 1110);
    			attr_dev(path1, "fill", "transparent");
    			attr_dev(path1, "d", "M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z");
    			attr_dev(path1, "id", "label2");
    			add_location(path1, file$g, 63, 10, 2562);
    			xlink_attr(textPath1, "xlink:href", "#label2");
    			attr_dev(textPath1, "textLength", "106");
    			attr_dev(textPath1, "lengthAdjust", "spacing");
    			add_location(textPath1, file$g, 65, 14, 2731);
    			attr_dev(text1, "dx", "6");
    			attr_dev(text1, "dy", "-1");
    			attr_dev(text1, "textLength", "106");
    			attr_dev(text1, "lengthAdjust", "spacing");
    			add_location(text1, file$g, 64, 10, 2654);
    			attr_dev(svg1, "viewBox", "-8 -8 110.5 155.5");
    			attr_dev(svg1, "class", "svelte-793pj3");
    			add_location(svg1, file$g, 62, 8, 2518);
    			attr_dev(div1, "id", "category-label");
    			attr_dev(div1, "class", "triangle svelte-793pj3");
    			set_style(div1, "transform", "rotate(45deg) scale(1.2)");
    			add_location(div1, file$g, 61, 6, 2420);
    			attr_dev(path2, "fill", "transparent");
    			attr_dev(path2, "d", "M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z");
    			attr_dev(path2, "id", "label3");
    			add_location(path2, file$g, 87, 10, 3593);
    			xlink_attr(textPath2, "xlink:href", "#label3");
    			attr_dev(textPath2, "textLength", "106");
    			attr_dev(textPath2, "lengthAdjust", "spacing");
    			add_location(textPath2, file$g, 89, 14, 3762);
    			attr_dev(text2, "dx", "6");
    			attr_dev(text2, "dy", "-1");
    			attr_dev(text2, "textLength", "106");
    			attr_dev(text2, "lengthAdjust", "spacing");
    			add_location(text2, file$g, 88, 10, 3685);
    			attr_dev(svg2, "viewBox", "-8 -8 110.5 155.5");
    			attr_dev(svg2, "class", "svelte-793pj3");
    			add_location(svg2, file$g, 86, 8, 3549);
    			attr_dev(div2, "id", "category-label");
    			attr_dev(div2, "class", "triangle svelte-793pj3");
    			set_style(div2, "transform", "rotate(90deg) scale(1.2)");
    			add_location(div2, file$g, 85, 6, 3451);
    			attr_dev(path3, "fill", "transparent");
    			attr_dev(path3, "d", "M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z");
    			attr_dev(path3, "id", "label4");
    			add_location(path3, file$g, 110, 10, 4622);
    			xlink_attr(textPath3, "xlink:href", "#label4");
    			attr_dev(textPath3, "textLength", "106");
    			attr_dev(textPath3, "lengthAdjust", "spacing");
    			add_location(textPath3, file$g, 112, 14, 4791);
    			attr_dev(text3, "dx", "6");
    			attr_dev(text3, "dy", "-1");
    			attr_dev(text3, "textLength", "106");
    			attr_dev(text3, "lengthAdjust", "spacing");
    			add_location(text3, file$g, 111, 10, 4714);
    			attr_dev(svg3, "viewBox", "-8 -8 110.5 155.5");
    			attr_dev(svg3, "class", "svelte-793pj3");
    			add_location(svg3, file$g, 109, 8, 4578);
    			attr_dev(div3, "id", "category-label");
    			attr_dev(div3, "class", "triangle svelte-793pj3");
    			set_style(div3, "transform", "rotate(135deg) scale(1.2)");
    			add_location(div3, file$g, 108, 6, 4479);
    			attr_dev(path4, "fill", "transparent");
    			attr_dev(path4, "d", "M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z");
    			attr_dev(path4, "id", "label5");
    			add_location(path4, file$g, 133, 10, 5651);
    			xlink_attr(textPath4, "xlink:href", "#label5");
    			attr_dev(textPath4, "textLength", "106");
    			attr_dev(textPath4, "lengthAdjust", "spacing");
    			add_location(textPath4, file$g, 135, 14, 5820);
    			attr_dev(text4, "dx", "6");
    			attr_dev(text4, "dy", "-1");
    			attr_dev(text4, "textLength", "106");
    			attr_dev(text4, "lengthAdjust", "spacing");
    			add_location(text4, file$g, 134, 10, 5743);
    			attr_dev(svg4, "viewBox", "-8 -8 110.5 155.5");
    			attr_dev(svg4, "class", "svelte-793pj3");
    			add_location(svg4, file$g, 132, 8, 5607);
    			attr_dev(div4, "id", "category-label");
    			attr_dev(div4, "class", "triangle svelte-793pj3");
    			set_style(div4, "transform", "rotate(180deg) scale(1.2)");
    			add_location(div4, file$g, 131, 6, 5508);
    			attr_dev(path5, "fill", "transparent");
    			attr_dev(path5, "d", "M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z");
    			attr_dev(path5, "id", "label6");
    			add_location(path5, file$g, 156, 10, 6680);
    			xlink_attr(textPath5, "xlink:href", "#label6");
    			attr_dev(textPath5, "textLength", "106");
    			attr_dev(textPath5, "lengthAdjust", "spacing");
    			add_location(textPath5, file$g, 158, 14, 6849);
    			attr_dev(text5, "dx", "6");
    			attr_dev(text5, "dy", "-1");
    			attr_dev(text5, "textLength", "106");
    			attr_dev(text5, "lengthAdjust", "spacing");
    			add_location(text5, file$g, 157, 10, 6772);
    			attr_dev(svg5, "viewBox", "-8 -8 110.5 155.5");
    			attr_dev(svg5, "class", "svelte-793pj3");
    			add_location(svg5, file$g, 155, 8, 6636);
    			attr_dev(div5, "id", "category-label");
    			attr_dev(div5, "class", "triangle svelte-793pj3");
    			set_style(div5, "transform", "rotate(225deg) scale(1.2)");
    			add_location(div5, file$g, 154, 6, 6537);
    			attr_dev(path6, "fill", "transparent");
    			attr_dev(path6, "d", "M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z");
    			attr_dev(path6, "id", "label7");
    			add_location(path6, file$g, 179, 10, 7739);
    			xlink_attr(textPath6, "xlink:href", "#label7");
    			attr_dev(textPath6, "textLength", "106");
    			attr_dev(textPath6, "lengthAdjust", "spacing");
    			add_location(textPath6, file$g, 181, 14, 7908);
    			attr_dev(text6, "dx", "6");
    			attr_dev(text6, "dy", "-1");
    			attr_dev(text6, "textLength", "106");
    			attr_dev(text6, "lengthAdjust", "spacing");
    			add_location(text6, file$g, 180, 10, 7831);
    			attr_dev(svg6, "viewBox", "-8 -8 110.5 155.5");
    			attr_dev(svg6, "class", "svelte-793pj3");
    			add_location(svg6, file$g, 178, 8, 7695);
    			attr_dev(div6, "id", "category-label");
    			attr_dev(div6, "class", "triangle svelte-793pj3");
    			set_style(div6, "transform", "rotate(270deg) scale(1.2)");
    			add_location(div6, file$g, 177, 6, 7596);
    			attr_dev(path7, "fill", "transparent");
    			attr_dev(path7, "d", "M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z");
    			attr_dev(path7, "id", "label8");
    			add_location(path7, file$g, 202, 10, 8796);
    			xlink_attr(textPath7, "xlink:href", "#label8");
    			attr_dev(textPath7, "textLength", "106");
    			attr_dev(textPath7, "lengthAdjust", "spacing");
    			add_location(textPath7, file$g, 204, 14, 8965);
    			attr_dev(text7, "dx", "6");
    			attr_dev(text7, "dy", "-1");
    			attr_dev(text7, "textLength", "106");
    			attr_dev(text7, "lengthAdjust", "spacing");
    			add_location(text7, file$g, 203, 10, 8888);
    			attr_dev(svg7, "viewBox", "-8 -8 110.5 155.5");
    			attr_dev(svg7, "class", "svelte-793pj3");
    			add_location(svg7, file$g, 201, 8, 8752);
    			attr_dev(div7, "id", "category-label");
    			attr_dev(div7, "class", "triangle svelte-793pj3");
    			set_style(div7, "transform", "rotate(315deg) scale(1.2)");
    			add_location(div7, file$g, 200, 6, 8653);
    			attr_dev(div8, "id", "wheelOfLife");
    			attr_dev(div8, "class", "container svelte-793pj3");
    			add_location(div8, file$g, 13, 4, 437);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			append_dev(div8, img);
    			append_dev(div8, t0);
    			if_block0.m(div8, null);
    			append_dev(div8, t1);
    			append_dev(div8, div0);
    			append_dev(div0, svg0);
    			append_dev(svg0, path0);
    			append_dev(svg0, style);
    			append_dev(style, t2);
    			append_dev(svg0, text0);
    			append_dev(text0, textPath0);
    			append_dev(textPath0, t3);
    			append_dev(div8, t4);
    			if_block1.m(div8, null);
    			append_dev(div8, t5);
    			append_dev(div8, div1);
    			append_dev(div1, svg1);
    			append_dev(svg1, path1);
    			append_dev(svg1, text1);
    			append_dev(text1, textPath1);
    			append_dev(textPath1, t6);
    			append_dev(div8, t7);
    			if_block2.m(div8, null);
    			append_dev(div8, t8);
    			append_dev(div8, div2);
    			append_dev(div2, svg2);
    			append_dev(svg2, path2);
    			append_dev(svg2, text2);
    			append_dev(text2, textPath2);
    			append_dev(textPath2, t9);
    			append_dev(div8, t10);
    			if_block3.m(div8, null);
    			append_dev(div8, t11);
    			append_dev(div8, div3);
    			append_dev(div3, svg3);
    			append_dev(svg3, path3);
    			append_dev(svg3, text3);
    			append_dev(text3, textPath3);
    			append_dev(textPath3, t12);
    			append_dev(div8, t13);
    			if_block4.m(div8, null);
    			append_dev(div8, t14);
    			append_dev(div8, div4);
    			append_dev(div4, svg4);
    			append_dev(svg4, path4);
    			append_dev(svg4, text4);
    			append_dev(text4, textPath4);
    			append_dev(textPath4, t15);
    			append_dev(div8, t16);
    			if_block5.m(div8, null);
    			append_dev(div8, t17);
    			append_dev(div8, div5);
    			append_dev(div5, svg5);
    			append_dev(svg5, path5);
    			append_dev(svg5, text5);
    			append_dev(text5, textPath5);
    			append_dev(textPath5, t18);
    			append_dev(div8, t19);
    			if_block6.m(div8, null);
    			append_dev(div8, t20);
    			append_dev(div8, div6);
    			append_dev(div6, svg6);
    			append_dev(svg6, path6);
    			append_dev(svg6, text6);
    			append_dev(text6, textPath6);
    			append_dev(textPath6, t21);
    			append_dev(div8, t22);
    			if_block7.m(div8, null);
    			append_dev(div8, t23);
    			append_dev(div8, div7);
    			append_dev(div7, svg7);
    			append_dev(svg7, path7);
    			append_dev(svg7, text7);
    			append_dev(text7, textPath7);
    			append_dev(textPath7, t24);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div8, t1);
    				}
    			}

    			if (dirty & /*data*/ 1 && t3_value !== (t3_value = /*data*/ ctx[0][0].label + "")) set_data_dev(t3, t3_value);

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div8, t5);
    				}
    			}

    			if (dirty & /*data*/ 1 && t6_value !== (t6_value = /*data*/ ctx[0][1].label + "")) set_data_dev(t6, t6_value);

    			if (current_block_type_2 === (current_block_type_2 = select_block_type_2(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type_2(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div8, t8);
    				}
    			}

    			if (dirty & /*data*/ 1 && t9_value !== (t9_value = /*data*/ ctx[0][2].label + "")) set_data_dev(t9, t9_value);

    			if (current_block_type_3 === (current_block_type_3 = select_block_type_3(ctx)) && if_block3) {
    				if_block3.p(ctx, dirty);
    			} else {
    				if_block3.d(1);
    				if_block3 = current_block_type_3(ctx);

    				if (if_block3) {
    					if_block3.c();
    					if_block3.m(div8, t11);
    				}
    			}

    			if (dirty & /*data*/ 1 && t12_value !== (t12_value = /*data*/ ctx[0][3].label + "")) set_data_dev(t12, t12_value);

    			if (current_block_type_4 === (current_block_type_4 = select_block_type_4(ctx)) && if_block4) {
    				if_block4.p(ctx, dirty);
    			} else {
    				if_block4.d(1);
    				if_block4 = current_block_type_4(ctx);

    				if (if_block4) {
    					if_block4.c();
    					if_block4.m(div8, t14);
    				}
    			}

    			if (dirty & /*data*/ 1 && t15_value !== (t15_value = /*data*/ ctx[0][4].label + "")) set_data_dev(t15, t15_value);

    			if (current_block_type_5 === (current_block_type_5 = select_block_type_5(ctx)) && if_block5) {
    				if_block5.p(ctx, dirty);
    			} else {
    				if_block5.d(1);
    				if_block5 = current_block_type_5(ctx);

    				if (if_block5) {
    					if_block5.c();
    					if_block5.m(div8, t17);
    				}
    			}

    			if (dirty & /*data*/ 1 && t18_value !== (t18_value = /*data*/ ctx[0][5].label + "")) set_data_dev(t18, t18_value);

    			if (current_block_type_6 === (current_block_type_6 = select_block_type_6(ctx)) && if_block6) {
    				if_block6.p(ctx, dirty);
    			} else {
    				if_block6.d(1);
    				if_block6 = current_block_type_6(ctx);

    				if (if_block6) {
    					if_block6.c();
    					if_block6.m(div8, t20);
    				}
    			}

    			if (dirty & /*data*/ 1 && t21_value !== (t21_value = /*data*/ ctx[0][6].label + "")) set_data_dev(t21, t21_value);

    			if (current_block_type_7 === (current_block_type_7 = select_block_type_7(ctx)) && if_block7) {
    				if_block7.p(ctx, dirty);
    			} else {
    				if_block7.d(1);
    				if_block7 = current_block_type_7(ctx);

    				if (if_block7) {
    					if_block7.c();
    					if_block7.m(div8, t23);
    				}
    			}

    			if (dirty & /*data*/ 1 && t24_value !== (t24_value = /*data*/ ctx[0][7].label + "")) set_data_dev(t24, t24_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div8);
    			if_block0.d();
    			if_block1.d();
    			if_block2.d();
    			if_block3.d();
    			if_block4.d();
    			if_block5.d();
    			if_block6.d();
    			if_block7.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Wol', slots, []);

    	let { data = [
    		{
    			label: "Breathe",
    			color: "#ED2527",
    			scale: 0.1
    		},
    		{
    			label: "Hydrate",
    			color: "#3DB549",
    			scale: 0.2
    		},
    		{
    			label: "Sleep",
    			color: "#2289B4",
    			scale: 0.3
    		},
    		{
    			label: "Eat",
    			color: "#F79321",
    			scale: 0.4
    		},
    		{
    			label: "Move",
    			color: "#94AFDC",
    			scale: 0.5
    		},
    		{
    			label: "Connect",
    			color: "#FF5F75",
    			scale: 0.6
    		},
    		{
    			label: "Learn",
    			color: "#00ADEF",
    			scale: 0.7
    		},
    		{
    			label: "Reflect",
    			color: "#935FA7",
    			scale: 0.8
    		}
    	] } = $$props;

    	const writable_props = ['data'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wol> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({ data });

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data];
    }

    class Wol extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { data: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Wol",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get data() {
    		throw new Error("<Wol>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Wol>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/Edit.svelte generated by Svelte v3.49.0 */

    const file$f = "node_modules/carbon-icons-svelte/lib/Edit.svelte";

    // (23:2) {#if title}
    function create_if_block$d(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$f, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$d.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$d(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M2 26H30V28H2zM25.4 9c.8-.8.8-2 0-2.8 0 0 0 0 0 0l-3.6-3.6c-.8-.8-2-.8-2.8 0 0 0 0 0 0 0l-15 15V24h6.4L25.4 9zM20.4 4L24 7.6l-3 3L17.4 7 20.4 4zM6 22v-3.6l10-10 3.6 3.6-10 10H6z");
    			add_location(path, file$f, 23, 2, 573);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$f, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$d(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Edit', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Edit extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Edit",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get size() {
    		throw new Error("<Edit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Edit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Edit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Edit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/CalculatorCheck.svelte generated by Svelte v3.49.0 */

    const file$e = "node_modules/carbon-icons-svelte/lib/CalculatorCheck.svelte";

    // (23:2) {#if title}
    function create_if_block$c(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$e, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$c(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M24 26.59L21.41 24 20 25.41 24 29.41 31 22.41 29.59 21 24 26.59zM15 23H17V25H15zM9 23H11V25H9zM21 18H23V20H21zM15 18H17V20H15zM9 18H11V20H9zM21 13H23V15H21zM15 13H17V15H15zM9 13H11V15H9zM9 7H23V10H9z");
    			add_location(path0, file$e, 23, 2, 573);
    			attr_dev(path1, "d", "M17,30H6.0046A2.007,2.007,0,0,1,4,27.9951V3.9961A1.9984,1.9984,0,0,1,5.9961,2H26.0037A1.9985,1.9985,0,0,1,28,3.9961V18H26V4H6V28H17Z");
    			add_location(path1, file$e, 23, 219, 790);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$e, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$c(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CalculatorCheck', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class CalculatorCheck extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CalculatorCheck",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get size() {
    		throw new Error("<CalculatorCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<CalculatorCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CalculatorCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CalculatorCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/main.svelte generated by Svelte v3.49.0 */
    const file$d = "src/pages/main.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	child_ctx[19] = list;
    	child_ctx[20] = i;
    	return child_ctx;
    }

    // (61:8) <Column>
    function create_default_slot_10$2(ctx) {
    	let h1;
    	let t0;
    	let t1;
    	let h2;
    	let t2;
    	let t3;
    	let h5;
    	let t5;
    	let hr;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(/*pluginemoji*/ ctx[2]);
    			t1 = space();
    			h2 = element("h2");
    			t2 = text(/*pluginname*/ ctx[1]);
    			t3 = space();
    			h5 = element("h5");
    			h5.textContent = "Loaded Succesfully";
    			t5 = space();
    			hr = element("hr");
    			set_style(h1, "text-align", "center");
    			add_location(h1, file$d, 61, 10, 1190);
    			set_style(h2, "text-align", "center");
    			attr_dev(h2, "class", "svelte-1duo0yq");
    			add_location(h2, file$d, 62, 10, 1249);
    			set_style(h5, "text-align", "center");
    			add_location(h5, file$d, 63, 10, 1307);
    			add_location(hr, file$d, 64, 10, 1371);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, h5, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, hr, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pluginemoji*/ 4) set_data_dev(t0, /*pluginemoji*/ ctx[2]);
    			if (dirty & /*pluginname*/ 2) set_data_dev(t2, /*pluginname*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(h5);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10$2.name,
    		type: "slot",
    		source: "(61:8) <Column>",
    		ctx
    	});

    	return block;
    }

    // (60:6) <Row>
    function create_default_slot_9$2(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_10$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty & /*$$scope, pluginname, pluginemoji*/ 2097158) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9$2.name,
    		type: "slot",
    		source: "(60:6) <Row>",
    		ctx
    	});

    	return block;
    }

    // (59:4) <Grid>
    function create_default_slot_8$2(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_9$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope, pluginname, pluginemoji*/ 2097158) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8$2.name,
    		type: "slot",
    		source: "(59:4) <Grid>",
    		ctx
    	});

    	return block;
    }

    // (69:4) {#if !refresh}
    function create_if_block$b(ctx) {
    	let wheel;
    	let updating_data;
    	let t;
    	let div;
    	let current;

    	function wheel_data_binding(value) {
    		/*wheel_data_binding*/ ctx[7](value);
    	}

    	let wheel_props = {};

    	if (/*mbis*/ ctx[0] !== void 0) {
    		wheel_props.data = /*mbis*/ ctx[0];
    	}

    	wheel = new Wol({ props: wheel_props, $$inline: true });
    	binding_callbacks.push(() => bind(wheel, 'data', wheel_data_binding));
    	let each_value = /*mbis*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			create_component(wheel.$$.fragment);
    			t = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(div, file$d, 70, 4, 1479);
    		},
    		m: function mount(target, anchor) {
    			mount_component(wheel, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const wheel_changes = {};

    			if (!updating_data && dirty & /*mbis*/ 1) {
    				updating_data = true;
    				wheel_changes.data = /*mbis*/ ctx[0];
    				add_flush_callback(() => updating_data = false);
    			}

    			wheel.$set(wheel_changes);

    			if (dirty & /*mbis, saveMBIs, toggleAutoCalculation, showMBISettings*/ 113) {
    				each_value = /*mbis*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wheel.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wheel.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wheel, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(69:4) {#if !refresh}",
    		ctx
    	});

    	return block;
    }

    // (77:10) <Column>
    function create_default_slot_7$2(ctx) {
    	let h4;
    	let t_value = /*mbi*/ ctx[18].label + "";
    	let t;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			t = text(t_value);
    			add_location(h4, file$d, 77, 10, 1644);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			append_dev(h4, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*mbis*/ 1 && t_value !== (t_value = /*mbi*/ ctx[18].label + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$2.name,
    		type: "slot",
    		source: "(77:10) <Column>",
    		ctx
    	});

    	return block;
    }

    // (84:12) {:else}
    function create_else_block_1(ctx) {
    	let span;
    	let calculatorcheck;
    	let current;
    	let mounted;
    	let dispose;

    	calculatorcheck = new CalculatorCheck({
    			props: { size: 24, color: "white" },
    			$$inline: true
    		});

    	function click_handler_2() {
    		return /*click_handler_2*/ ctx[10](/*index*/ ctx[20]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(calculatorcheck.$$.fragment);
    			add_location(span, file$d, 84, 12, 2053);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(calculatorcheck, span, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span, "click", stop_propagation(prevent_default(click_handler_2)), false, true, true);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(calculatorcheck.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(calculatorcheck.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(calculatorcheck);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(84:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (82:12) {#if !mbi.calculated}
    function create_if_block_2$1(ctx) {
    	let span;
    	let calculatorcheck;
    	let current;
    	let mounted;
    	let dispose;

    	calculatorcheck = new CalculatorCheck({
    			props: { size: 24, color: "grey" },
    			$$inline: true
    		});

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[9](/*index*/ ctx[20]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(calculatorcheck.$$.fragment);
    			add_location(span, file$d, 82, 12, 1887);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(calculatorcheck, span, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span, "click", stop_propagation(prevent_default(click_handler_1)), false, true, true);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(calculatorcheck.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(calculatorcheck.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(calculatorcheck);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(82:12) {#if !mbi.calculated}",
    		ctx
    	});

    	return block;
    }

    // (80:10) <Column style="text-align:right">
    function create_default_slot_6$3(ctx) {
    	let span;
    	let edit;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	edit = new Edit({ props: { size: 24 }, $$inline: true });

    	function click_handler() {
    		return /*click_handler*/ ctx[8](/*index*/ ctx[20]);
    	}

    	const if_block_creators = [create_if_block_2$1, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*mbi*/ ctx[18].calculated) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(edit.$$.fragment);
    			t = space();
    			if_block.c();
    			if_block_anchor = empty();
    			add_location(span, file$d, 80, 12, 1739);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(edit, span, null);
    			insert_dev(target, t, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span, "click", stop_propagation(prevent_default(click_handler)), false, true, true);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(edit.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(edit.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(edit);
    			if (detaching) detach_dev(t);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$3.name,
    		type: "slot",
    		source: "(80:10) <Column style=\\\"text-align:right\\\">",
    		ctx
    	});

    	return block;
    }

    // (76:8) <Row>
    function create_default_slot_5$3(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_7$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				style: "text-align:right",
    				$$slots: { default: [create_default_slot_6$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty & /*$$scope, mbis*/ 2097153) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty & /*$$scope, mbis*/ 2097153) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$3.name,
    		type: "slot",
    		source: "(76:8) <Row>",
    		ctx
    	});

    	return block;
    }

    // (101:0) {:else}
    function create_else_block(ctx) {
    	let slider;
    	let updating_value;
    	let current;

    	function slider_value_binding_1(value) {
    		/*slider_value_binding_1*/ ctx[13](value, /*mbi*/ ctx[18]);
    	}

    	let slider_props = {
    		disabled: true,
    		fullWidth: true,
    		hideTextInput: true,
    		min: 0,
    		max: 1,
    		step: 0.1
    	};

    	if (/*mbi*/ ctx[18].scale !== void 0) {
    		slider_props.value = /*mbi*/ ctx[18].scale;
    	}

    	slider = new Slider({ props: slider_props, $$inline: true });
    	binding_callbacks.push(() => bind(slider, 'value', slider_value_binding_1));
    	slider.$on("change", /*change_handler_1*/ ctx[14]);

    	const block = {
    		c: function create() {
    			create_component(slider.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(slider, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const slider_changes = {};

    			if (!updating_value && dirty & /*mbis*/ 1) {
    				updating_value = true;
    				slider_changes.value = /*mbi*/ ctx[18].scale;
    				add_flush_callback(() => updating_value = false);
    			}

    			slider.$set(slider_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slider.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slider.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(slider, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(101:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (91:12) {#if !mbi.calculated}
    function create_if_block_1$1(ctx) {
    	let slider;
    	let updating_value;
    	let current;

    	function slider_value_binding(value) {
    		/*slider_value_binding*/ ctx[11](value, /*mbi*/ ctx[18]);
    	}

    	let slider_props = {
    		fullWidth: true,
    		hideTextInput: true,
    		min: 0,
    		max: 1,
    		step: 0.1
    	};

    	if (/*mbi*/ ctx[18].scale !== void 0) {
    		slider_props.value = /*mbi*/ ctx[18].scale;
    	}

    	slider = new Slider({ props: slider_props, $$inline: true });
    	binding_callbacks.push(() => bind(slider, 'value', slider_value_binding));
    	slider.$on("change", /*change_handler*/ ctx[12]);

    	const block = {
    		c: function create() {
    			create_component(slider.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(slider, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const slider_changes = {};

    			if (!updating_value && dirty & /*mbis*/ 1) {
    				updating_value = true;
    				slider_changes.value = /*mbi*/ ctx[18].scale;
    				add_flush_callback(() => updating_value = false);
    			}

    			slider.$set(slider_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slider.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slider.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(slider, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(91:12) {#if !mbi.calculated}",
    		ctx
    	});

    	return block;
    }

    // (90:10) <Column>
    function create_default_slot_4$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (!/*mbi*/ ctx[18].calculated) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$3.name,
    		type: "slot",
    		source: "(90:10) <Column>",
    		ctx
    	});

    	return block;
    }

    // (89:8) <Row>
    function create_default_slot_3$3(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_4$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty & /*$$scope, mbis*/ 2097153) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(89:8) <Row>",
    		ctx
    	});

    	return block;
    }

    // (75:6) <Grid>
    function create_default_slot_2$3(ctx) {
    	let row0;
    	let t;
    	let row1;
    	let current;

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_5$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row0.$$.fragment);
    			t = space();
    			create_component(row1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(row1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty & /*$$scope, mbis*/ 2097153) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty & /*$$scope, mbis*/ 2097153) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(row1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(75:6) <Grid>",
    		ctx
    	});

    	return block;
    }

    // (73:4) <Tile      style="background-color:{mbi.color}; border-radius:5px">
    function create_default_slot_1$4(ctx) {
    	let grid;
    	let current;

    	grid = new Grid({
    			props: {
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(grid.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(grid, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const grid_changes = {};

    			if (dirty & /*$$scope, mbis*/ 2097153) {
    				grid_changes.$$scope = { dirty, ctx };
    			}

    			grid.$set(grid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(grid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(73:4) <Tile      style=\\\"background-color:{mbi.color}; border-radius:5px\\\">",
    		ctx
    	});

    	return block;
    }

    // (72:4) {#each mbis as mbi, index}
    function create_each_block$1(ctx) {
    	let tile;
    	let t;
    	let br;
    	let current;

    	tile = new Tile({
    			props: {
    				style: "background-color:" + /*mbi*/ ctx[18].color + "; border-radius:5px",
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tile.$$.fragment);
    			t = space();
    			br = element("br");
    			add_location(br, file$d, 116, 4, 2674);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tile, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, br, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tile_changes = {};
    			if (dirty & /*mbis*/ 1) tile_changes.style = "background-color:" + /*mbi*/ ctx[18].color + "; border-radius:5px";

    			if (dirty & /*$$scope, mbis*/ 2097153) {
    				tile_changes.$$scope = { dirty, ctx };
    			}

    			tile.$set(tile_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tile.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tile.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tile, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(72:4) {#each mbis as mbi, index}",
    		ctx
    	});

    	return block;
    }

    // (58:0) <Content>
    function create_default_slot$4(ctx) {
    	let grid;
    	let t;
    	let if_block_anchor;
    	let current;

    	grid = new Grid({
    			props: {
    				$$slots: { default: [create_default_slot_8$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = !/*refresh*/ ctx[3] && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			create_component(grid.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(grid, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const grid_changes = {};

    			if (dirty & /*$$scope, pluginname, pluginemoji*/ 2097158) {
    				grid_changes.$$scope = { dirty, ctx };
    			}

    			grid.$set(grid_changes);
    			if (!/*refresh*/ ctx[3]) if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(grid, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(58:0) <Content>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(content.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(content, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const content_changes = {};

    			if (dirty & /*$$scope, mbis, pluginname, pluginemoji*/ 2097159) {
    				content_changes.$$scope = { dirty, ctx };
    			}

    			content.$set(content_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(content, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);
    	let { pluginname } = $$props;
    	let { pluginemoji } = $$props;
    	let { mbis } = $$props;
    	let open = true;
    	let refresh = false;
    	const dispatch = createEventDispatcher();

    	function exitMain() {
    		dispatch("exitinfo");
    		open = false;
    	}

    	function showMBISettings(index) {
    		dispatch("mbisettings", index);
    	}

    	function saveMBIs() {
    		dispatch("savembis");
    	}

    	function toggleAutoCalculation(index) {
    		if (mbis[index].calculated) {
    			$$invalidate(0, mbis[index].calculated = false, mbis);
    		} else {
    			if (mbis[index].calculations.length > 0) {
    				$$invalidate(0, mbis[index].calculated = true, mbis);
    			}
    		}

    		saveMBIs();
    	}

    	const writable_props = ['pluginname', 'pluginemoji', 'mbis'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	function wheel_data_binding(value) {
    		mbis = value;
    		$$invalidate(0, mbis);
    	}

    	const click_handler = index => {
    		showMBISettings(index);
    	};

    	const click_handler_1 = index => {
    		toggleAutoCalculation(index);
    	};

    	const click_handler_2 = index => {
    		toggleAutoCalculation(index);
    	};

    	function slider_value_binding(value, mbi) {
    		if ($$self.$$.not_equal(mbi.scale, value)) {
    			mbi.scale = value;
    			$$invalidate(0, mbis);
    		}
    	}

    	const change_handler = () => {
    		saveMBIs();
    	};

    	function slider_value_binding_1(value, mbi) {
    		if ($$self.$$.not_equal(mbi.scale, value)) {
    			mbi.scale = value;
    			$$invalidate(0, mbis);
    		}
    	}

    	const change_handler_1 = () => {
    		saveMBIs();
    	};

    	$$self.$$set = $$props => {
    		if ('pluginname' in $$props) $$invalidate(1, pluginname = $$props.pluginname);
    		if ('pluginemoji' in $$props) $$invalidate(2, pluginemoji = $$props.pluginemoji);
    		if ('mbis' in $$props) $$invalidate(0, mbis = $$props.mbis);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		createEventDispatcher,
    		Wheel: Wol,
    		Button,
    		Content,
    		Grid,
    		Row,
    		Column,
    		Tile,
    		Slider,
    		Edit,
    		CalculatorCheck,
    		pluginname,
    		pluginemoji,
    		mbis,
    		open,
    		refresh,
    		dispatch,
    		exitMain,
    		showMBISettings,
    		saveMBIs,
    		toggleAutoCalculation
    	});

    	$$self.$inject_state = $$props => {
    		if ('pluginname' in $$props) $$invalidate(1, pluginname = $$props.pluginname);
    		if ('pluginemoji' in $$props) $$invalidate(2, pluginemoji = $$props.pluginemoji);
    		if ('mbis' in $$props) $$invalidate(0, mbis = $$props.mbis);
    		if ('open' in $$props) open = $$props.open;
    		if ('refresh' in $$props) $$invalidate(3, refresh = $$props.refresh);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		mbis,
    		pluginname,
    		pluginemoji,
    		refresh,
    		showMBISettings,
    		saveMBIs,
    		toggleAutoCalculation,
    		wheel_data_binding,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		slider_value_binding,
    		change_handler,
    		slider_value_binding_1,
    		change_handler_1
    	];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { pluginname: 1, pluginemoji: 2, mbis: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pluginname*/ ctx[1] === undefined && !('pluginname' in props)) {
    			console.warn("<Main> was created without expected prop 'pluginname'");
    		}

    		if (/*pluginemoji*/ ctx[2] === undefined && !('pluginemoji' in props)) {
    			console.warn("<Main> was created without expected prop 'pluginemoji'");
    		}

    		if (/*mbis*/ ctx[0] === undefined && !('mbis' in props)) {
    			console.warn("<Main> was created without expected prop 'mbis'");
    		}
    	}

    	get pluginname() {
    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pluginname(value) {
    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pluginemoji() {
    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pluginemoji(value) {
    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mbis() {
    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mbis(value) {
    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/info.svelte generated by Svelte v3.49.0 */
    const file$c = "src/pages/info.svelte";

    // (28:8) <Column>
    function create_default_slot_6$2(ctx) {
    	let h1;
    	let t0;
    	let t1;
    	let h2;
    	let t2;
    	let t3;
    	let h5;
    	let t5;
    	let hr0;
    	let t6;
    	let h40;
    	let t8;
    	let h60;
    	let t9;
    	let t10;
    	let t11;
    	let t12;
    	let t13;
    	let t14;
    	let t15;
    	let t16;
    	let hr1;
    	let br0;
    	let t17;
    	let h41;
    	let t19;
    	let h61;
    	let t20;
    	let t21;
    	let t22;
    	let t23;
    	let h62;
    	let t25;
    	let hr2;
    	let br1;
    	let t26;
    	let h42;
    	let t28;
    	let h63;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(/*pluginemoji*/ ctx[1]);
    			t1 = space();
    			h2 = element("h2");
    			t2 = text(/*pluginname*/ ctx[0]);
    			t3 = space();
    			h5 = element("h5");
    			h5.textContent = "General Information";
    			t5 = space();
    			hr0 = element("hr");
    			t6 = space();
    			h40 = element("h4");
    			h40.textContent = "General:";
    			t8 = space();
    			h60 = element("h6");
    			t9 = text("This is a plugin for ");
    			t10 = text(/*parent*/ ctx[2]);
    			t11 = text(". This plugin supports the My Balance Indicator model. This model has been developped by Ronald de Lange. The My Balance Indicator Model provides a frame work to measure aspects of your life through 8 axes. It is highly bases on the Wheel of Life but provides a framework for dynamic categories.\n              Combining this model with ");
    			t12 = text(/*parent*/ ctx[2]);
    			t13 = text(" provides you the opportunity to auto-calculate the indicator for each of the categories.\n              For example: The Eat indicator can be calculated by the amount of meals and/or the amount of calories each with their individual weight factor.\n              The plugin also contains a widget for an easy overview if the Balance Indicators on the ");
    			t14 = text(/*parent*/ ctx[2]);
    			t15 = text(" Dashboard.");
    			t16 = space();
    			hr1 = element("hr");
    			br0 = element("br");
    			t17 = space();
    			h41 = element("h4");
    			h41.textContent = "Licence:";
    			t19 = space();
    			h61 = element("h6");
    			t20 = text("The ");
    			t21 = text(/*parent*/ ctx[2]);
    			t22 = text(" My Balance Plugin is licenced under the MIT licence");
    			t23 = space();
    			h62 = element("h6");
    			h62.textContent = "Copyright Ronald de Lange.\n                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n                The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n                THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";
    			t25 = space();
    			hr2 = element("hr");
    			br1 = element("br");
    			t26 = space();
    			h42 = element("h4");
    			h42.textContent = "Support:";
    			t28 = space();
    			h63 = element("h6");
    			h63.textContent = "Please contact me @ ronald_de_lange@hotmail.com";
    			set_style(h1, "text-align", "center");
    			add_location(h1, file$c, 28, 12, 491);
    			set_style(h2, "text-align", "center");
    			attr_dev(h2, "class", "svelte-gjbk59");
    			add_location(h2, file$c, 29, 12, 552);
    			set_style(h5, "text-align", "center");
    			add_location(h5, file$c, 30, 12, 612);
    			add_location(hr0, file$c, 31, 12, 679);
    			add_location(h40, file$c, 32, 12, 696);
    			attr_dev(h60, "class", "svelte-gjbk59");
    			add_location(h60, file$c, 33, 12, 726);
    			add_location(hr1, file$c, 37, 12, 1490);
    			add_location(br0, file$c, 37, 16, 1494);
    			add_location(h41, file$c, 38, 12, 1511);
    			attr_dev(h61, "class", "svelte-gjbk59");
    			add_location(h61, file$c, 39, 12, 1541);
    			attr_dev(h62, "class", "svelte-gjbk59");
    			add_location(h62, file$c, 40, 12, 1627);
    			add_location(hr2, file$c, 45, 12, 2757);
    			add_location(br1, file$c, 45, 16, 2761);
    			add_location(h42, file$c, 46, 12, 2778);
    			attr_dev(h63, "class", "svelte-gjbk59");
    			add_location(h63, file$c, 47, 12, 2808);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, h5, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, hr0, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, h40, anchor);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, h60, anchor);
    			append_dev(h60, t9);
    			append_dev(h60, t10);
    			append_dev(h60, t11);
    			append_dev(h60, t12);
    			append_dev(h60, t13);
    			append_dev(h60, t14);
    			append_dev(h60, t15);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, hr1, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t17, anchor);
    			insert_dev(target, h41, anchor);
    			insert_dev(target, t19, anchor);
    			insert_dev(target, h61, anchor);
    			append_dev(h61, t20);
    			append_dev(h61, t21);
    			append_dev(h61, t22);
    			insert_dev(target, t23, anchor);
    			insert_dev(target, h62, anchor);
    			insert_dev(target, t25, anchor);
    			insert_dev(target, hr2, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t26, anchor);
    			insert_dev(target, h42, anchor);
    			insert_dev(target, t28, anchor);
    			insert_dev(target, h63, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pluginemoji*/ 2) set_data_dev(t0, /*pluginemoji*/ ctx[1]);
    			if (dirty & /*pluginname*/ 1) set_data_dev(t2, /*pluginname*/ ctx[0]);
    			if (dirty & /*parent*/ 4) set_data_dev(t10, /*parent*/ ctx[2]);
    			if (dirty & /*parent*/ 4) set_data_dev(t12, /*parent*/ ctx[2]);
    			if (dirty & /*parent*/ 4) set_data_dev(t14, /*parent*/ ctx[2]);
    			if (dirty & /*parent*/ 4) set_data_dev(t21, /*parent*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(h5);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(hr0);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(h40);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(h60);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(hr1);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t17);
    			if (detaching) detach_dev(h41);
    			if (detaching) detach_dev(t19);
    			if (detaching) detach_dev(h61);
    			if (detaching) detach_dev(t23);
    			if (detaching) detach_dev(h62);
    			if (detaching) detach_dev(t25);
    			if (detaching) detach_dev(hr2);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t26);
    			if (detaching) detach_dev(h42);
    			if (detaching) detach_dev(t28);
    			if (detaching) detach_dev(h63);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$2.name,
    		type: "slot",
    		source: "(28:8) <Column>",
    		ctx
    	});

    	return block;
    }

    // (27:6) <Row>
    function create_default_slot_5$2(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_6$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty & /*$$scope, parent, pluginname, pluginemoji*/ 71) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$2.name,
    		type: "slot",
    		source: "(27:6) <Row>",
    		ctx
    	});

    	return block;
    }

    // (54:19) <Button on:click={exitInfo} style="float: right;">
    function create_default_slot_4$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Exit");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(54:19) <Button on:click={exitInfo} style=\\\"float: right;\\\">",
    		ctx
    	});

    	return block;
    }

    // (52:8) <Column>
    function create_default_slot_3$2(ctx) {
    	let br0;
    	let t0;
    	let span;
    	let button;
    	let t1;
    	let br1;
    	let current;

    	button = new Button({
    			props: {
    				style: "float: right;",
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*exitInfo*/ ctx[3]);

    	const block = {
    		c: function create() {
    			br0 = element("br");
    			t0 = space();
    			span = element("span");
    			create_component(button.$$.fragment);
    			t1 = space();
    			br1 = element("br");
    			add_location(br0, file$c, 52, 12, 2937);
    			add_location(span, file$c, 53, 13, 2955);
    			add_location(br1, file$c, 54, 13, 3045);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			mount_component(button, span, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br1, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			destroy_component(button);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(52:8) <Column>",
    		ctx
    	});

    	return block;
    }

    // (51:6) <Row>
    function create_default_slot_2$2(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(51:6) <Row>",
    		ctx
    	});

    	return block;
    }

    // (26:4) <Grid>
    function create_default_slot_1$3(ctx) {
    	let row0;
    	let t;
    	let row1;
    	let current;

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_5$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row0.$$.fragment);
    			t = space();
    			create_component(row1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(row1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty & /*$$scope, parent, pluginname, pluginemoji*/ 71) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(row1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(26:4) <Grid>",
    		ctx
    	});

    	return block;
    }

    // (25:0) <Content>
    function create_default_slot$3(ctx) {
    	let grid;
    	let current;

    	grid = new Grid({
    			props: {
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(grid.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(grid, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const grid_changes = {};

    			if (dirty & /*$$scope, parent, pluginname, pluginemoji*/ 71) {
    				grid_changes.$$scope = { dirty, ctx };
    			}

    			grid.$set(grid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(grid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(25:0) <Content>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(content.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(content, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const content_changes = {};

    			if (dirty & /*$$scope, parent, pluginname, pluginemoji*/ 71) {
    				content_changes.$$scope = { dirty, ctx };
    			}

    			content.$set(content_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(content, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Info', slots, []);
    	let { pluginname } = $$props;
    	let { pluginemoji } = $$props;
    	let { parent } = $$props;
    	let open = true;
    	const dispatch = createEventDispatcher();

    	function exitInfo() {
    		dispatch("exitinfo");
    		open = false;
    	}

    	const writable_props = ['pluginname', 'pluginemoji', 'parent'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Info> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('pluginname' in $$props) $$invalidate(0, pluginname = $$props.pluginname);
    		if ('pluginemoji' in $$props) $$invalidate(1, pluginemoji = $$props.pluginemoji);
    		if ('parent' in $$props) $$invalidate(2, parent = $$props.parent);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Button,
    		Content,
    		Grid,
    		Row,
    		Column,
    		pluginname,
    		pluginemoji,
    		parent,
    		open,
    		dispatch,
    		exitInfo
    	});

    	$$self.$inject_state = $$props => {
    		if ('pluginname' in $$props) $$invalidate(0, pluginname = $$props.pluginname);
    		if ('pluginemoji' in $$props) $$invalidate(1, pluginemoji = $$props.pluginemoji);
    		if ('parent' in $$props) $$invalidate(2, parent = $$props.parent);
    		if ('open' in $$props) open = $$props.open;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pluginname, pluginemoji, parent, exitInfo];
    }

    class Info extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { pluginname: 0, pluginemoji: 1, parent: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Info",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pluginname*/ ctx[0] === undefined && !('pluginname' in props)) {
    			console.warn("<Info> was created without expected prop 'pluginname'");
    		}

    		if (/*pluginemoji*/ ctx[1] === undefined && !('pluginemoji' in props)) {
    			console.warn("<Info> was created without expected prop 'pluginemoji'");
    		}

    		if (/*parent*/ ctx[2] === undefined && !('parent' in props)) {
    			console.warn("<Info> was created without expected prop 'parent'");
    		}
    	}

    	get pluginname() {
    		throw new Error("<Info>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pluginname(value) {
    		throw new Error("<Info>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pluginemoji() {
    		throw new Error("<Info>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pluginemoji(value) {
    		throw new Error("<Info>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get parent() {
    		throw new Error("<Info>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set parent(value) {
    		throw new Error("<Info>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/settings.svelte generated by Svelte v3.49.0 */
    const file$b = "src/pages/settings.svelte";

    // (33:8) <Column>
    function create_default_slot_10$1(ctx) {
    	let h1;
    	let t0;
    	let t1;
    	let h2;
    	let t2;
    	let t3;
    	let h5;
    	let t5;
    	let hr;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(/*pluginemoji*/ ctx[1]);
    			t1 = space();
    			h2 = element("h2");
    			t2 = text(/*pluginname*/ ctx[0]);
    			t3 = space();
    			h5 = element("h5");
    			h5.textContent = "Plugin Settings";
    			t5 = space();
    			hr = element("hr");
    			set_style(h1, "text-align", "center");
    			add_location(h1, file$b, 33, 10, 601);
    			set_style(h2, "text-align", "center");
    			attr_dev(h2, "class", "svelte-ytnyfc");
    			add_location(h2, file$b, 34, 10, 660);
    			set_style(h5, "text-align", "center");
    			add_location(h5, file$b, 35, 10, 718);
    			add_location(hr, file$b, 36, 10, 779);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, h5, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, hr, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pluginemoji*/ 2) set_data_dev(t0, /*pluginemoji*/ ctx[1]);
    			if (dirty & /*pluginname*/ 1) set_data_dev(t2, /*pluginname*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(h5);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10$1.name,
    		type: "slot",
    		source: "(33:8) <Column>",
    		ctx
    	});

    	return block;
    }

    // (32:6) <Row>
    function create_default_slot_9$1(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_10$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty & /*$$scope, pluginname, pluginemoji*/ 67) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9$1.name,
    		type: "slot",
    		source: "(32:6) <Row>",
    		ctx
    	});

    	return block;
    }

    // (31:4) <Grid>
    function create_default_slot_8$1(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_9$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope, pluginname, pluginemoji*/ 67) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8$1.name,
    		type: "slot",
    		source: "(31:4) <Grid>",
    		ctx
    	});

    	return block;
    }

    // (42:6) <Column>
    function create_default_slot_7$1(ctx) {
    	let br;
    	let t0;
    	let h2;

    	const block = {
    		c: function create() {
    			br = element("br");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "This Plugin does not have settings";
    			add_location(br, file$b, 42, 8, 860);
    			set_style(h2, "text-align", "center");
    			attr_dev(h2, "class", "svelte-ytnyfc");
    			add_location(h2, file$b, 43, 8, 873);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(42:6) <Column>",
    		ctx
    	});

    	return block;
    }

    // (41:4) <Row>
    function create_default_slot_6$1(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_7$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(41:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (50:17) <Button kind="secondary" on:click={exitSettings} style="float: left;">
    function create_default_slot_5$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Exit");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(50:17) <Button kind=\\\"secondary\\\" on:click={exitSettings} style=\\\"float: left;\\\">",
    		ctx
    	});

    	return block;
    }

    // (48:6) <Column>
    function create_default_slot_4$1(ctx) {
    	let br0;
    	let t0;
    	let span;
    	let button;
    	let t1;
    	let br1;
    	let current;

    	button = new Button({
    			props: {
    				kind: "secondary",
    				style: "float: left;",
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*exitSettings*/ ctx[2]);

    	const block = {
    		c: function create() {
    			br0 = element("br");
    			t0 = space();
    			span = element("span");
    			create_component(button.$$.fragment);
    			t1 = space();
    			br1 = element("br");
    			add_location(br0, file$b, 48, 10, 1005);
    			add_location(span, file$b, 49, 11, 1021);
    			add_location(br1, file$b, 50, 11, 1129);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			mount_component(button, span, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br1, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			destroy_component(button);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(48:6) <Column>",
    		ctx
    	});

    	return block;
    }

    // (55:15) <Button on:click={saveSettings} style="float: right;">
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Save");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(55:15) <Button on:click={saveSettings} style=\\\"float: right;\\\">",
    		ctx
    	});

    	return block;
    }

    // (53:4) <Column>
    function create_default_slot_2$1(ctx) {
    	let br0;
    	let t0;
    	let span;
    	let button;
    	let t1;
    	let br1;
    	let current;

    	button = new Button({
    			props: {
    				style: "float: right;",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*saveSettings*/ ctx[3]);

    	const block = {
    		c: function create() {
    			br0 = element("br");
    			t0 = space();
    			span = element("span");
    			create_component(button.$$.fragment);
    			t1 = space();
    			br1 = element("br");
    			add_location(br0, file$b, 53, 8, 1171);
    			add_location(span, file$b, 54, 9, 1185);
    			add_location(br1, file$b, 55, 9, 1275);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			mount_component(button, span, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br1, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			destroy_component(button);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(53:4) <Column>",
    		ctx
    	});

    	return block;
    }

    // (47:4) <Row>
    function create_default_slot_1$2(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(47:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (30:0) <Content>
    function create_default_slot$2(ctx) {
    	let grid;
    	let t0;
    	let row0;
    	let t1;
    	let row1;
    	let current;

    	grid = new Grid({
    			props: {
    				$$slots: { default: [create_default_slot_8$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(grid.$$.fragment);
    			t0 = space();
    			create_component(row0.$$.fragment);
    			t1 = space();
    			create_component(row1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(grid, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(row0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(row1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const grid_changes = {};

    			if (dirty & /*$$scope, pluginname, pluginemoji*/ 67) {
    				grid_changes.$$scope = { dirty, ctx };
    			}

    			grid.$set(grid_changes);
    			const row0_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(grid, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(row1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(30:0) <Content>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(content.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(content, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const content_changes = {};

    			if (dirty & /*$$scope, pluginname, pluginemoji*/ 67) {
    				content_changes.$$scope = { dirty, ctx };
    			}

    			content.$set(content_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(content, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Settings', slots, []);
    	let { pluginname } = $$props;
    	let { pluginemoji } = $$props;
    	let open = true;
    	const dispatch = createEventDispatcher();

    	function exitSettings() {
    		dispatch("exitsettings");
    		open = false;
    	}

    	function saveSettings() {
    		dispatch("savesettings");
    		dispatch("exitsettings");
    		open = false;
    	}

    	const writable_props = ['pluginname', 'pluginemoji'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('pluginname' in $$props) $$invalidate(0, pluginname = $$props.pluginname);
    		if ('pluginemoji' in $$props) $$invalidate(1, pluginemoji = $$props.pluginemoji);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Button,
    		Content,
    		Grid,
    		Row,
    		Column,
    		pluginname,
    		pluginemoji,
    		open,
    		dispatch,
    		exitSettings,
    		saveSettings
    	});

    	$$self.$inject_state = $$props => {
    		if ('pluginname' in $$props) $$invalidate(0, pluginname = $$props.pluginname);
    		if ('pluginemoji' in $$props) $$invalidate(1, pluginemoji = $$props.pluginemoji);
    		if ('open' in $$props) open = $$props.open;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pluginname, pluginemoji, exitSettings, saveSettings];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { pluginname: 0, pluginemoji: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pluginname*/ ctx[0] === undefined && !('pluginname' in props)) {
    			console.warn("<Settings> was created without expected prop 'pluginname'");
    		}

    		if (/*pluginemoji*/ ctx[1] === undefined && !('pluginemoji' in props)) {
    			console.warn("<Settings> was created without expected prop 'pluginemoji'");
    		}
    	}

    	get pluginname() {
    		throw new Error("<Settings>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pluginname(value) {
    		throw new Error("<Settings>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pluginemoji() {
    		throw new Error("<Settings>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pluginemoji(value) {
    		throw new Error("<Settings>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/TextAlignJustify.svelte generated by Svelte v3.49.0 */

    const file$a = "node_modules/carbon-icons-svelte/lib/TextAlignJustify.svelte";

    // (23:2) {#if title}
    function create_if_block$a(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$a, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$a(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M6 6H26V8H6zM6 12H26V14H6zM6 18H26V20H6zM6 24H26V26H6z");
    			add_location(path, file$a, 23, 2, 573);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$a, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$a(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextAlignJustify', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class TextAlignJustify extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextAlignJustify",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get size() {
    		throw new Error("<TextAlignJustify>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<TextAlignJustify>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<TextAlignJustify>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<TextAlignJustify>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/CheckboxIndeterminate.svelte generated by Svelte v3.49.0 */

    const file$9 = "node_modules/carbon-icons-svelte/lib/CheckboxIndeterminate.svelte";

    // (23:2) {#if title}
    function create_if_block$9(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$9, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$9(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M10 14H22V18H10z");
    			add_location(path0, file$9, 23, 2, 573);
    			attr_dev(path1, "d", "M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z");
    			add_location(path1, file$9, 23, 36, 607);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$9, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$9(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CheckboxIndeterminate', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class CheckboxIndeterminate extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CheckboxIndeterminate",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get size() {
    		throw new Error("<CheckboxIndeterminate>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<CheckboxIndeterminate>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CheckboxIndeterminate>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CheckboxIndeterminate>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/Person.svelte generated by Svelte v3.49.0 */

    const file$8 = "node_modules/carbon-icons-svelte/lib/Person.svelte";

    // (23:2) {#if title}
    function create_if_block$8(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$8, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$8(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M18 30H14a2 2 0 01-2-2V21a2 2 0 01-2-2V13a3 3 0 013-3h6a3 3 0 013 3v6a2 2 0 01-2 2v7A2 2 0 0118 30zM13 12a.94.94 0 00-1 1v6h2v9h4V19h2V13a.94.94 0 00-1-1zM16 9a4 4 0 114-4h0A4 4 0 0116 9zm0-6a2 2 0 102 2h0a2 2 0 00-2-2z");
    			add_location(path, file$8, 23, 2, 573);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$8, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$8(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Person', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Person extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Person",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get size() {
    		throw new Error("<Person>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Person>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Person>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Person>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/Tag.svelte generated by Svelte v3.49.0 */

    const file$7 = "node_modules/carbon-icons-svelte/lib/Tag.svelte";

    // (23:2) {#if title}
    function create_if_block$7(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$7, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$7(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M10,14a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,10,14Zm0-6a2,2,0,1,0,1.998,2.0044A2.002,2.002,0,0,0,10,8Z");
    			add_location(path0, file$7, 23, 2, 573);
    			attr_dev(path1, "d", "M16.6436,29.4145,2.5858,15.3555A2,2,0,0,1,2,13.9414V4A2,2,0,0,1,4,2h9.9413a2,2,0,0,1,1.4142.5858L29.4144,16.6436a2.0005,2.0005,0,0,1,0,2.8285l-9.9424,9.9425a2.0008,2.0008,0,0,1-2.8285,0ZM4,4v9.9417L18.0578,28,28,18.0579,13.9416,4Z");
    			add_location(path1, file$7, 23, 118, 689);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$7, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$7(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tag', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Tag extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tag",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get size() {
    		throw new Error("<Tag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Tag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Tag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Tag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/TrashCan.svelte generated by Svelte v3.49.0 */

    const file$6 = "node_modules/carbon-icons-svelte/lib/TrashCan.svelte";

    // (23:2) {#if title}
    function create_if_block$6(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$6, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$6(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M12 12H14V24H12zM18 12H20V24H18z");
    			add_location(path0, file$6, 23, 2, 573);
    			attr_dev(path1, "d", "M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z");
    			add_location(path1, file$6, 23, 52, 623);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$6, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TrashCan', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class TrashCan extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TrashCan",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get size() {
    		throw new Error("<TrashCan>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<TrashCan>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<TrashCan>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<TrashCan>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/mbisettings.svelte generated by Svelte v3.49.0 */
    const file$5 = "src/pages/mbisettings.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[34] = list[i];
    	child_ctx[35] = list;
    	child_ctx[36] = i;
    	return child_ctx;
    }

    // (111:8) <Column>
    function create_default_slot_39(ctx) {
    	let h1;
    	let t0;
    	let t1;
    	let h2;
    	let t2;
    	let t3;
    	let h5;
    	let t5;
    	let hr;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(/*pluginemoji*/ ctx[2]);
    			t1 = space();
    			h2 = element("h2");
    			t2 = text(/*pluginname*/ ctx[1]);
    			t3 = space();
    			h5 = element("h5");
    			h5.textContent = "My Balance Indicator";
    			t5 = space();
    			hr = element("hr");
    			set_style(h1, "text-align", "center");
    			add_location(h1, file$5, 111, 10, 3583);
    			set_style(h2, "text-align", "center");
    			attr_dev(h2, "class", "svelte-ytnyfc");
    			add_location(h2, file$5, 112, 10, 3642);
    			set_style(h5, "text-align", "center");
    			add_location(h5, file$5, 113, 10, 3700);
    			add_location(hr, file$5, 114, 10, 3766);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, h5, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, hr, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*pluginemoji*/ 4) set_data_dev(t0, /*pluginemoji*/ ctx[2]);
    			if (dirty[0] & /*pluginname*/ 2) set_data_dev(t2, /*pluginname*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(h5);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_39.name,
    		type: "slot",
    		source: "(111:8) <Column>",
    		ctx
    	});

    	return block;
    }

    // (110:6) <Row>
    function create_default_slot_38(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_39] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty[0] & /*pluginname, pluginemoji*/ 6 | dirty[1] & /*$$scope*/ 64) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_38.name,
    		type: "slot",
    		source: "(110:6) <Row>",
    		ctx
    	});

    	return block;
    }

    // (109:4) <Grid>
    function create_default_slot_37(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_38] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty[0] & /*pluginname, pluginemoji*/ 6 | dirty[1] & /*$$scope*/ 64) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_37.name,
    		type: "slot",
    		source: "(109:4) <Grid>",
    		ctx
    	});

    	return block;
    }

    // (121:8) <Column>
    function create_default_slot_36(ctx) {
    	let h3;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Category:";
    			add_location(h3, file$5, 121, 12, 3910);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_36.name,
    		type: "slot",
    		source: "(121:8) <Column>",
    		ctx
    	});

    	return block;
    }

    // (124:8) <Column>
    function create_default_slot_35(ctx) {
    	let textinput;
    	let updating_value;
    	let current;

    	function textinput_value_binding(value) {
    		/*textinput_value_binding*/ ctx[14](value);
    	}

    	let textinput_props = {
    		hideLabel: true,
    		placeholder: "Category Name"
    	};

    	if (/*mbi2edit*/ ctx[0].label !== void 0) {
    		textinput_props.value = /*mbi2edit*/ ctx[0].label;
    	}

    	textinput = new TextInput({ props: textinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(textinput, 'value', textinput_value_binding));

    	const block = {
    		c: function create() {
    			create_component(textinput.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textinput, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const textinput_changes = {};

    			if (!updating_value && dirty[0] & /*mbi2edit*/ 1) {
    				updating_value = true;
    				textinput_changes.value = /*mbi2edit*/ ctx[0].label;
    				add_flush_callback(() => updating_value = false);
    			}

    			textinput.$set(textinput_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinput.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinput.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textinput, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_35.name,
    		type: "slot",
    		source: "(124:8) <Column>",
    		ctx
    	});

    	return block;
    }

    // (120:8) <Row>
    function create_default_slot_34(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_36] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_35] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_34.name,
    		type: "slot",
    		source: "(120:8) <Row>",
    		ctx
    	});

    	return block;
    }

    // (130:12) <Column>
    function create_default_slot_33(ctx) {
    	let h3;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Calculations:";
    			add_location(h3, file$5, 130, 16, 4148);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_33.name,
    		type: "slot",
    		source: "(130:12) <Column>",
    		ctx
    	});

    	return block;
    }

    // (129:8) <Row>
    function create_default_slot_32(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_33] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_32.name,
    		type: "slot",
    		source: "(129:8) <Row>",
    		ctx
    	});

    	return block;
    }

    // (134:8) {#if !calculationsrefresh}
    function create_if_block$5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*mbi2edit*/ ctx[0].calculations;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*deleteCalculation, mbi2edit, addTag, themecolor, addPerson, addTracker, removeTracker*/ 1521) {
    				each_value = /*mbi2edit*/ ctx[0].calculations;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(134:8) {#if !calculationsrefresh}",
    		ctx
    	});

    	return block;
    }

    // (141:24) <Column>
    function create_default_slot_31(ctx) {
    	let td0;
    	let p0;
    	let t1;
    	let td1;
    	let span0;
    	let checkboxindeterminate;
    	let t2;
    	let td2;
    	let span1;
    	let list;
    	let t3;
    	let td3;
    	let span2;
    	let person;
    	let t4;
    	let td4;
    	let span3;
    	let tag;
    	let t5;
    	let td5;
    	let p1;
    	let t6_value = /*calculation*/ ctx[34].trackabledisplay + "";
    	let t6;
    	let current;
    	let mounted;
    	let dispose;

    	checkboxindeterminate = new CheckboxIndeterminate({
    			props: {
    				size: 20,
    				style: "color:" + /*themecolor*/ ctx[4] + ";cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px"
    			},
    			$$inline: true
    		});

    	function click_handler() {
    		return /*click_handler*/ ctx[15](/*index*/ ctx[36]);
    	}

    	list = new TextAlignJustify({
    			props: {
    				size: 20,
    				style: "color:" + /*themecolor*/ ctx[4] + ";cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px"
    			},
    			$$inline: true
    		});

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[16](/*index*/ ctx[36]);
    	}

    	person = new Person({
    			props: {
    				size: 20,
    				style: "color:" + /*themecolor*/ ctx[4] + ";cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px"
    			},
    			$$inline: true
    		});

    	function click_handler_2() {
    		return /*click_handler_2*/ ctx[17](/*index*/ ctx[36]);
    	}

    	tag = new Tag({
    			props: {
    				size: 20,
    				style: "color:" + /*themecolor*/ ctx[4] + ";cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px"
    			},
    			$$inline: true
    		});

    	function click_handler_3() {
    		return /*click_handler_3*/ ctx[18](/*index*/ ctx[36]);
    	}

    	const block = {
    		c: function create() {
    			td0 = element("td");
    			p0 = element("p");
    			p0.textContent = "Trackable:";
    			t1 = space();
    			td1 = element("td");
    			span0 = element("span");
    			create_component(checkboxindeterminate.$$.fragment);
    			t2 = space();
    			td2 = element("td");
    			span1 = element("span");
    			create_component(list.$$.fragment);
    			t3 = space();
    			td3 = element("td");
    			span2 = element("span");
    			create_component(person.$$.fragment);
    			t4 = space();
    			td4 = element("td");
    			span3 = element("span");
    			create_component(tag.$$.fragment);
    			t5 = space();
    			td5 = element("td");
    			p1 = element("p");
    			t6 = text(t6_value);
    			set_style(p0, "font-size", "82%");
    			set_style(p0, "display", "inline");
    			set_style(p0, "font-weight", "300");
    			set_style(p0, "text-align", "left");
    			set_style(p0, "vertical-align", "middle");
    			add_location(p0, file$5, 141, 91, 4525);
    			set_style(td0, "vertical-align", "middle ");
    			set_style(td0, "text-align", "left");
    			set_style(td0, "width", "100px");
    			add_location(td0, file$5, 141, 28, 4462);
    			add_location(span0, file$5, 142, 92, 4733);
    			set_style(td1, "vertical-align", "middle");
    			set_style(td1, "text-align", "center");
    			set_style(td1, "width", "20px");
    			add_location(td1, file$5, 142, 28, 4669);
    			add_location(span1, file$5, 143, 92, 5038);
    			set_style(td2, "vertical-align", "middle");
    			set_style(td2, "text-align", "center");
    			set_style(td2, "width", "20px");
    			add_location(td2, file$5, 143, 28, 4974);
    			add_location(span2, file$5, 144, 92, 5306);
    			set_style(td3, "vertical-align", "middle");
    			set_style(td3, "text-align", "center");
    			set_style(td3, "width", "20px");
    			add_location(td3, file$5, 144, 28, 5242);
    			add_location(span3, file$5, 145, 92, 5577);
    			set_style(td4, "vertical-align", "middle");
    			set_style(td4, "text-align", "center");
    			set_style(td4, "width", "20px");
    			add_location(td4, file$5, 145, 28, 5513);
    			set_style(p1, "font-size", "82%");
    			set_style(p1, "display", "inline");
    			set_style(p1, "font-weight", "300");
    			set_style(p1, "text-align", "left");
    			set_style(p1, "vertical-align", "middle");
    			add_location(p1, file$5, 146, 92, 5839);
    			set_style(td5, "vertical-align", "middle ");
    			set_style(td5, "text-align", "right");
    			set_style(td5, "width", "250px");
    			add_location(td5, file$5, 146, 28, 5775);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td0, anchor);
    			append_dev(td0, p0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, td1, anchor);
    			append_dev(td1, span0);
    			mount_component(checkboxindeterminate, span0, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, td2, anchor);
    			append_dev(td2, span1);
    			mount_component(list, span1, null);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, td3, anchor);
    			append_dev(td3, span2);
    			mount_component(person, span2, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, td4, anchor);
    			append_dev(td4, span3);
    			mount_component(tag, span3, null);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, td5, anchor);
    			append_dev(td5, p1);
    			append_dev(p1, t6);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(span0, "click", click_handler, false, false, false),
    					listen_dev(span1, "click", click_handler_1, false, false, false),
    					listen_dev(span2, "click", click_handler_2, false, false, false),
    					listen_dev(span3, "click", click_handler_3, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const checkboxindeterminate_changes = {};
    			if (dirty[0] & /*themecolor*/ 16) checkboxindeterminate_changes.style = "color:" + /*themecolor*/ ctx[4] + ";cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px";
    			checkboxindeterminate.$set(checkboxindeterminate_changes);
    			const list_changes = {};
    			if (dirty[0] & /*themecolor*/ 16) list_changes.style = "color:" + /*themecolor*/ ctx[4] + ";cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px";
    			list.$set(list_changes);
    			const person_changes = {};
    			if (dirty[0] & /*themecolor*/ 16) person_changes.style = "color:" + /*themecolor*/ ctx[4] + ";cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px";
    			person.$set(person_changes);
    			const tag_changes = {};
    			if (dirty[0] & /*themecolor*/ 16) tag_changes.style = "color:" + /*themecolor*/ ctx[4] + ";cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px";
    			tag.$set(tag_changes);
    			if ((!current || dirty[0] & /*mbi2edit*/ 1) && t6_value !== (t6_value = /*calculation*/ ctx[34].trackabledisplay + "")) set_data_dev(t6, t6_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkboxindeterminate.$$.fragment, local);
    			transition_in(list.$$.fragment, local);
    			transition_in(person.$$.fragment, local);
    			transition_in(tag.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkboxindeterminate.$$.fragment, local);
    			transition_out(list.$$.fragment, local);
    			transition_out(person.$$.fragment, local);
    			transition_out(tag.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(td1);
    			destroy_component(checkboxindeterminate);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(td2);
    			destroy_component(list);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(td3);
    			destroy_component(person);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(td4);
    			destroy_component(tag);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(td5);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_31.name,
    		type: "slot",
    		source: "(141:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (140:20) <Row>
    function create_default_slot_30(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_31] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty[0] & /*mbi2edit, themecolor*/ 17 | dirty[1] & /*$$scope*/ 64) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_30.name,
    		type: "slot",
    		source: "(140:20) <Row>",
    		ctx
    	});

    	return block;
    }

    // (153:28) <Select inline labelText="Timerange" bind:selected = {calculation.timerange}>
    function create_default_slot_29(ctx) {
    	let selectitem0;
    	let t0;
    	let selectitem1;
    	let t1;
    	let selectitem2;
    	let t2;
    	let selectitem3;
    	let current;

    	selectitem0 = new SelectItem({
    			props: { value: "7", text: "7 Days" },
    			$$inline: true
    		});

    	selectitem1 = new SelectItem({
    			props: { value: "30", text: "30 Days" },
    			$$inline: true
    		});

    	selectitem2 = new SelectItem({
    			props: { value: "60", text: "60 Days" },
    			$$inline: true
    		});

    	selectitem3 = new SelectItem({
    			props: { value: "90", text: "90 Days" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectitem0.$$.fragment);
    			t0 = space();
    			create_component(selectitem1.$$.fragment);
    			t1 = space();
    			create_component(selectitem2.$$.fragment);
    			t2 = space();
    			create_component(selectitem3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(selectitem1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(selectitem2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(selectitem3, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectitem0.$$.fragment, local);
    			transition_in(selectitem1.$$.fragment, local);
    			transition_in(selectitem2.$$.fragment, local);
    			transition_in(selectitem3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectitem0.$$.fragment, local);
    			transition_out(selectitem1.$$.fragment, local);
    			transition_out(selectitem2.$$.fragment, local);
    			transition_out(selectitem3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectitem0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(selectitem1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(selectitem2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(selectitem3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_29.name,
    		type: "slot",
    		source: "(153:28) <Select inline labelText=\\\"Timerange\\\" bind:selected = {calculation.timerange}>",
    		ctx
    	});

    	return block;
    }

    // (152:24) <Column>
    function create_default_slot_28(ctx) {
    	let select;
    	let updating_selected;
    	let current;

    	function select_selected_binding(value) {
    		/*select_selected_binding*/ ctx[19](value, /*calculation*/ ctx[34]);
    	}

    	let select_props = {
    		inline: true,
    		labelText: "Timerange",
    		$$slots: { default: [create_default_slot_29] },
    		$$scope: { ctx }
    	};

    	if (/*calculation*/ ctx[34].timerange !== void 0) {
    		select_props.selected = /*calculation*/ ctx[34].timerange;
    	}

    	select = new Select({ props: select_props, $$inline: true });
    	binding_callbacks.push(() => bind(select, 'selected', select_selected_binding));

    	const block = {
    		c: function create() {
    			create_component(select.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(select, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const select_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				select_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_selected && dirty[0] & /*mbi2edit*/ 1) {
    				updating_selected = true;
    				select_changes.selected = /*calculation*/ ctx[34].timerange;
    				add_flush_callback(() => updating_selected = false);
    			}

    			select.$set(select_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(select.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(select.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(select, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_28.name,
    		type: "slot",
    		source: "(152:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (151:20) <Row>
    function create_default_slot_27(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_28] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_27.name,
    		type: "slot",
    		source: "(151:20) <Row>",
    		ctx
    	});

    	return block;
    }

    // (163:28) <Select inline labelText="Statistics" bind:selected = {calculation.statistics}>
    function create_default_slot_26(ctx) {
    	let selectitem0;
    	let t;
    	let selectitem1;
    	let current;

    	selectitem0 = new SelectItem({
    			props: { value: "average", text: "Average" },
    			$$inline: true
    		});

    	selectitem1 = new SelectItem({
    			props: { value: "sum", text: "Sum" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectitem0.$$.fragment);
    			t = space();
    			create_component(selectitem1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectitem0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(selectitem1, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectitem0.$$.fragment, local);
    			transition_in(selectitem1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectitem0.$$.fragment, local);
    			transition_out(selectitem1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectitem0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(selectitem1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_26.name,
    		type: "slot",
    		source: "(163:28) <Select inline labelText=\\\"Statistics\\\" bind:selected = {calculation.statistics}>",
    		ctx
    	});

    	return block;
    }

    // (162:24) <Column>
    function create_default_slot_25(ctx) {
    	let select;
    	let updating_selected;
    	let current;

    	function select_selected_binding_1(value) {
    		/*select_selected_binding_1*/ ctx[20](value, /*calculation*/ ctx[34]);
    	}

    	let select_props = {
    		inline: true,
    		labelText: "Statistics",
    		$$slots: { default: [create_default_slot_26] },
    		$$scope: { ctx }
    	};

    	if (/*calculation*/ ctx[34].statistics !== void 0) {
    		select_props.selected = /*calculation*/ ctx[34].statistics;
    	}

    	select = new Select({ props: select_props, $$inline: true });
    	binding_callbacks.push(() => bind(select, 'selected', select_selected_binding_1));

    	const block = {
    		c: function create() {
    			create_component(select.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(select, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const select_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				select_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_selected && dirty[0] & /*mbi2edit*/ 1) {
    				updating_selected = true;
    				select_changes.selected = /*calculation*/ ctx[34].statistics;
    				add_flush_callback(() => updating_selected = false);
    			}

    			select.$set(select_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(select.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(select.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(select, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_25.name,
    		type: "slot",
    		source: "(162:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (161:24) <Row>
    function create_default_slot_24(ctx) {
    	let column;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_25] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_24.name,
    		type: "slot",
    		source: "(161:24) <Row>",
    		ctx
    	});

    	return block;
    }

    // (170:24) <Column>
    function create_default_slot_23(ctx) {
    	let br;
    	let t0;
    	let p;

    	const block = {
    		c: function create() {
    			br = element("br");
    			t0 = space();
    			p = element("p");
    			p.textContent = "Min. Scale:";
    			add_location(br, file$5, 170, 28, 7128);
    			set_style(p, "font-size", "82%");
    			add_location(p, file$5, 171, 28, 7161);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_23.name,
    		type: "slot",
    		source: "(170:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (174:24) <Column>
    function create_default_slot_22(ctx) {
    	let textinput;
    	let updating_value;
    	let current;

    	function textinput_value_binding_1(value) {
    		/*textinput_value_binding_1*/ ctx[21](value, /*calculation*/ ctx[34]);
    	}

    	let textinput_props = {
    		style: "font-size:82%",
    		hideLabel: true,
    		placeholder: "Minimal Scale"
    	};

    	if (/*calculation*/ ctx[34].minscale !== void 0) {
    		textinput_props.value = /*calculation*/ ctx[34].minscale;
    	}

    	textinput = new TextInput({ props: textinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(textinput, 'value', textinput_value_binding_1));

    	const block = {
    		c: function create() {
    			create_component(textinput.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textinput, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const textinput_changes = {};

    			if (!updating_value && dirty[0] & /*mbi2edit*/ 1) {
    				updating_value = true;
    				textinput_changes.value = /*calculation*/ ctx[34].minscale;
    				add_flush_callback(() => updating_value = false);
    			}

    			textinput.$set(textinput_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinput.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinput.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textinput, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_22.name,
    		type: "slot",
    		source: "(174:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (169:20) <Row>
    function create_default_slot_21(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_23] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_22] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_21.name,
    		type: "slot",
    		source: "(169:20) <Row>",
    		ctx
    	});

    	return block;
    }

    // (179:24) <Column>
    function create_default_slot_20(ctx) {
    	let br;
    	let t0;
    	let p;

    	const block = {
    		c: function create() {
    			br = element("br");
    			t0 = space();
    			p = element("p");
    			p.textContent = "Max. Scale:";
    			add_location(br, file$5, 179, 28, 7556);
    			set_style(p, "font-size", "82%");
    			add_location(p, file$5, 180, 28, 7589);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_20.name,
    		type: "slot",
    		source: "(179:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (183:24) <Column>
    function create_default_slot_19(ctx) {
    	let textinput;
    	let updating_value;
    	let current;

    	function textinput_value_binding_2(value) {
    		/*textinput_value_binding_2*/ ctx[22](value, /*calculation*/ ctx[34]);
    	}

    	let textinput_props = {
    		style: "font-size:82%",
    		hideLabel: true,
    		placeholder: "Maximum Scale"
    	};

    	if (/*calculation*/ ctx[34].maxscale !== void 0) {
    		textinput_props.value = /*calculation*/ ctx[34].maxscale;
    	}

    	textinput = new TextInput({ props: textinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(textinput, 'value', textinput_value_binding_2));

    	const block = {
    		c: function create() {
    			create_component(textinput.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textinput, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const textinput_changes = {};

    			if (!updating_value && dirty[0] & /*mbi2edit*/ 1) {
    				updating_value = true;
    				textinput_changes.value = /*calculation*/ ctx[34].maxscale;
    				add_flush_callback(() => updating_value = false);
    			}

    			textinput.$set(textinput_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinput.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinput.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textinput, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_19.name,
    		type: "slot",
    		source: "(183:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (178:24) <Row>
    function create_default_slot_18(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_20] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_19] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_18.name,
    		type: "slot",
    		source: "(178:24) <Row>",
    		ctx
    	});

    	return block;
    }

    // (188:24) <Column style="vertical-align:middle">
    function create_default_slot_17(ctx) {
    	let br;
    	let t0;
    	let p;

    	const block = {
    		c: function create() {
    			br = element("br");
    			t0 = space();
    			p = element("p");
    			p.textContent = "Reversed Scale:";
    			add_location(br, file$5, 188, 28, 8007);
    			set_style(p, "font-size", "82%");
    			add_location(p, file$5, 189, 28, 8040);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17.name,
    		type: "slot",
    		source: "(188:24) <Column style=\\\"vertical-align:middle\\\">",
    		ctx
    	});

    	return block;
    }

    // (194:28) 
    function create_labelA_slot(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "slot", "labelA");
    			set_style(span, "color", "red");
    			add_location(span, file$5, 193, 28, 8275);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_labelA_slot.name,
    		type: "slot",
    		source: "(194:28) ",
    		ctx
    	});

    	return block;
    }

    // (195:28) 
    function create_labelB_slot(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "slot", "labelB");
    			set_style(span, "color", "green");
    			add_location(span, file$5, 194, 28, 8350);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_labelB_slot.name,
    		type: "slot",
    		source: "(195:28) ",
    		ctx
    	});

    	return block;
    }

    // (192:24) <Column>
    function create_default_slot_16(ctx) {
    	let toggle;
    	let updating_toggled;
    	let current;

    	function toggle_toggled_binding(value) {
    		/*toggle_toggled_binding*/ ctx[23](value, /*calculation*/ ctx[34]);
    	}

    	let toggle_props = {
    		style: "font-size:82%",
    		$$slots: {
    			labelB: [create_labelB_slot],
    			labelA: [create_labelA_slot]
    		},
    		$$scope: { ctx }
    	};

    	if (/*calculation*/ ctx[34].reverseScale !== void 0) {
    		toggle_props.toggled = /*calculation*/ ctx[34].reverseScale;
    	}

    	toggle = new Toggle({ props: toggle_props, $$inline: true });
    	binding_callbacks.push(() => bind(toggle, 'toggled', toggle_toggled_binding));

    	const block = {
    		c: function create() {
    			create_component(toggle.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(toggle, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const toggle_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				toggle_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_toggled && dirty[0] & /*mbi2edit*/ 1) {
    				updating_toggled = true;
    				toggle_changes.toggled = /*calculation*/ ctx[34].reverseScale;
    				add_flush_callback(() => updating_toggled = false);
    			}

    			toggle.$set(toggle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(toggle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(toggle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(toggle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(192:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (187:20) <Row >
    function create_default_slot_15(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				style: "vertical-align:middle",
    				$$slots: { default: [create_default_slot_17] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(187:20) <Row >",
    		ctx
    	});

    	return block;
    }

    // (200:24) <Column style="vertical-align:middle">
    function create_default_slot_14(ctx) {
    	let br;
    	let t0;
    	let p;

    	const block = {
    		c: function create() {
    			br = element("br");
    			t0 = space();
    			p = element("p");
    			p.textContent = "Weight Factor:";
    			add_location(br, file$5, 200, 28, 8611);
    			set_style(p, "font-size", "82%");
    			add_location(p, file$5, 201, 28, 8644);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(200:24) <Column style=\\\"vertical-align:middle\\\">",
    		ctx
    	});

    	return block;
    }

    // (204:24) <Column>
    function create_default_slot_13(ctx) {
    	let textinput;
    	let updating_value;
    	let current;

    	function textinput_value_binding_3(value) {
    		/*textinput_value_binding_3*/ ctx[24](value, /*calculation*/ ctx[34]);
    	}

    	let textinput_props = {
    		style: "font-size:80%",
    		hideLabel: true,
    		placeholder: "Weight Factor"
    	};

    	if (/*calculation*/ ctx[34].weight !== void 0) {
    		textinput_props.value = /*calculation*/ ctx[34].weight;
    	}

    	textinput = new TextInput({ props: textinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(textinput, 'value', textinput_value_binding_3));

    	const block = {
    		c: function create() {
    			create_component(textinput.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textinput, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const textinput_changes = {};

    			if (!updating_value && dirty[0] & /*mbi2edit*/ 1) {
    				updating_value = true;
    				textinput_changes.value = /*calculation*/ ctx[34].weight;
    				add_flush_callback(() => updating_value = false);
    			}

    			textinput.$set(textinput_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinput.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinput.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textinput, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(204:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (199:20) <Row>
    function create_default_slot_12(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				style: "vertical-align:middle",
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(199:20) <Row>",
    		ctx
    	});

    	return block;
    }

    // (212:34) <Button kind="danger-tertiary" icon={TrashCan}  style="width:100%" size="small" on:click={()=>{deleteCalculation(index)}}>
    function create_default_slot_11(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Delete");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(212:34) <Button kind=\\\"danger-tertiary\\\" icon={TrashCan}  style=\\\"width:100%\\\" size=\\\"small\\\" on:click={()=>{deleteCalculation(index)}}>",
    		ctx
    	});

    	return block;
    }

    // (211:24) <Column>
    function create_default_slot_10(ctx) {
    	let span;
    	let button;
    	let current;

    	function click_handler_4() {
    		return /*click_handler_4*/ ctx[25](/*index*/ ctx[36]);
    	}

    	button = new Button({
    			props: {
    				kind: "danger-tertiary",
    				icon: TrashCan,
    				style: "width:100%",
    				size: "small",
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", click_handler_4);

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(button.$$.fragment);
    			add_location(span, file$5, 211, 28, 9099);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(button, span, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const button_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(211:24) <Column>",
    		ctx
    	});

    	return block;
    }

    // (209:20) <Row>
    function create_default_slot_9(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;
    	column0 = new Column({ $$inline: true });

    	column1 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column1_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(209:20) <Row>",
    		ctx
    	});

    	return block;
    }

    // (139:16) <Tile>
    function create_default_slot_8(ctx) {
    	let row0;
    	let t0;
    	let row1;
    	let t1;
    	let row2;
    	let t2;
    	let row3;
    	let t3;
    	let row4;
    	let t4;
    	let row5;
    	let t5;
    	let row6;
    	let t6;
    	let br;
    	let t7;
    	let row7;
    	let current;

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_30] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_27] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row2 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_24] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row3 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_21] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row4 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_18] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row5 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row6 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row7 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row0.$$.fragment);
    			t0 = space();
    			create_component(row1.$$.fragment);
    			t1 = space();
    			create_component(row2.$$.fragment);
    			t2 = space();
    			create_component(row3.$$.fragment);
    			t3 = space();
    			create_component(row4.$$.fragment);
    			t4 = space();
    			create_component(row5.$$.fragment);
    			t5 = space();
    			create_component(row6.$$.fragment);
    			t6 = space();
    			br = element("br");
    			t7 = space();
    			create_component(row7.$$.fragment);
    			add_location(br, file$5, 207, 20, 8965);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(row1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(row2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(row3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(row4, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(row5, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(row6, target, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(row7, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty[0] & /*mbi2edit, themecolor*/ 17 | dirty[1] & /*$$scope*/ 64) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    			const row2_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				row2_changes.$$scope = { dirty, ctx };
    			}

    			row2.$set(row2_changes);
    			const row3_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				row3_changes.$$scope = { dirty, ctx };
    			}

    			row3.$set(row3_changes);
    			const row4_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				row4_changes.$$scope = { dirty, ctx };
    			}

    			row4.$set(row4_changes);
    			const row5_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				row5_changes.$$scope = { dirty, ctx };
    			}

    			row5.$set(row5_changes);
    			const row6_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				row6_changes.$$scope = { dirty, ctx };
    			}

    			row6.$set(row6_changes);
    			const row7_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				row7_changes.$$scope = { dirty, ctx };
    			}

    			row7.$set(row7_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			transition_in(row2.$$.fragment, local);
    			transition_in(row3.$$.fragment, local);
    			transition_in(row4.$$.fragment, local);
    			transition_in(row5.$$.fragment, local);
    			transition_in(row6.$$.fragment, local);
    			transition_in(row7.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			transition_out(row2.$$.fragment, local);
    			transition_out(row3.$$.fragment, local);
    			transition_out(row4.$$.fragment, local);
    			transition_out(row5.$$.fragment, local);
    			transition_out(row6.$$.fragment, local);
    			transition_out(row7.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(row1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(row2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(row3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(row4, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(row5, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(row6, detaching);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t7);
    			destroy_component(row7, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(139:16) <Tile>",
    		ctx
    	});

    	return block;
    }

    // (138:12) <Column>
    function create_default_slot_7(ctx) {
    	let tile;
    	let current;

    	tile = new Tile({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tile.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tile, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tile_changes = {};

    			if (dirty[0] & /*mbi2edit, themecolor*/ 17 | dirty[1] & /*$$scope*/ 64) {
    				tile_changes.$$scope = { dirty, ctx };
    			}

    			tile.$set(tile_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tile.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tile.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tile, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(138:12) <Column>",
    		ctx
    	});

    	return block;
    }

    // (137:8) <Row>
    function create_default_slot_6(ctx) {
    	let column;
    	let t;
    	let current;

    	column = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(column, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column_changes = {};

    			if (dirty[0] & /*mbi2edit, themecolor*/ 17 | dirty[1] & /*$$scope*/ 64) {
    				column_changes.$$scope = { dirty, ctx };
    			}

    			column.$set(column_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(137:8) <Row>",
    		ctx
    	});

    	return block;
    }

    // (135:8) {#each mbi2edit.calculations as calculation, index }
    function create_each_block(ctx) {
    	let br;
    	let t;
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			br = element("br");
    			t = space();
    			create_component(row.$$.fragment);
    			add_location(br, file$5, 135, 8, 4312);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty[0] & /*mbi2edit, themecolor*/ 17 | dirty[1] & /*$$scope*/ 64) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t);
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(135:8) {#each mbi2edit.calculations as calculation, index }",
    		ctx
    	});

    	return block;
    }

    // (119:4) <Tile style="background-color:{mbi2edit.color}">
    function create_default_slot_5(ctx) {
    	let row0;
    	let t0;
    	let hr;
    	let t1;
    	let row1;
    	let t2;
    	let if_block_anchor;
    	let current;

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_34] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_32] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = !/*calculationsrefresh*/ ctx[3] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			create_component(row0.$$.fragment);
    			t0 = space();
    			hr = element("hr");
    			t1 = space();
    			create_component(row1.$$.fragment);
    			t2 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			add_location(hr, file$5, 127, 8, 4092);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row0, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(row1, target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty[0] & /*mbi2edit*/ 1 | dirty[1] & /*$$scope*/ 64) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);

    			if (!/*calculationsrefresh*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*calculationsrefresh*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t1);
    			destroy_component(row1, detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(119:4) <Tile style=\\\"background-color:{mbi2edit.color}\\\">",
    		ctx
    	});

    	return block;
    }

    // (224:4) <Tile on:click={()=>{addCalculation()}} style="background-color:{mbi2edit.color};cursor: pointer">
    function create_default_slot_4(ctx) {
    	let h3;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "+ Add Calculation";
    			set_style(h3, "align", "center");
    			add_location(h3, file$5, 224, 8, 9564);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(224:4) <Tile on:click={()=>{addCalculation()}} style=\\\"background-color:{mbi2edit.color};cursor: pointer\\\">",
    		ctx
    	});

    	return block;
    }

    // (233:15) <Button on:click={()=>{saveEdit()}} style="float: right;">
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Save & Exit");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(233:15) <Button on:click={()=>{saveEdit()}} style=\\\"float: right;\\\">",
    		ctx
    	});

    	return block;
    }

    // (231:4) <Column>
    function create_default_slot_2(ctx) {
    	let br0;
    	let t0;
    	let span;
    	let button;
    	let t1;
    	let br1;
    	let current;

    	button = new Button({
    			props: {
    				style: "float: right;",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler_6*/ ctx[27]);

    	const block = {
    		c: function create() {
    			br0 = element("br");
    			t0 = space();
    			span = element("span");
    			create_component(button.$$.fragment);
    			t1 = space();
    			br1 = element("br");
    			add_location(br0, file$5, 231, 8, 9696);
    			add_location(span, file$5, 232, 9, 9710);
    			add_location(br1, file$5, 233, 9, 9811);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			mount_component(button, span, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br1, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			destroy_component(button);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(231:4) <Column>",
    		ctx
    	});

    	return block;
    }

    // (227:4) <Row>
    function create_default_slot_1$1(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;
    	column0 = new Column({ $$inline: true });

    	column1 = new Column({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column1_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(227:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (108:0) <Content>
    function create_default_slot$1(ctx) {
    	let grid;
    	let t0;
    	let tile0;
    	let t1;
    	let br;
    	let t2;
    	let tile1;
    	let t3;
    	let row;
    	let current;

    	grid = new Grid({
    			props: {
    				$$slots: { default: [create_default_slot_37] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	tile0 = new Tile({
    			props: {
    				style: "background-color:" + /*mbi2edit*/ ctx[0].color,
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	tile1 = new Tile({
    			props: {
    				style: "background-color:" + /*mbi2edit*/ ctx[0].color + ";cursor: pointer",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	tile1.$on("click", /*click_handler_5*/ ctx[26]);

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(grid.$$.fragment);
    			t0 = space();
    			create_component(tile0.$$.fragment);
    			t1 = space();
    			br = element("br");
    			t2 = space();
    			create_component(tile1.$$.fragment);
    			t3 = space();
    			create_component(row.$$.fragment);
    			add_location(br, file$5, 222, 4, 9448);
    		},
    		m: function mount(target, anchor) {
    			mount_component(grid, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(tile0, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(tile1, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const grid_changes = {};

    			if (dirty[0] & /*pluginname, pluginemoji*/ 6 | dirty[1] & /*$$scope*/ 64) {
    				grid_changes.$$scope = { dirty, ctx };
    			}

    			grid.$set(grid_changes);
    			const tile0_changes = {};
    			if (dirty[0] & /*mbi2edit*/ 1) tile0_changes.style = "background-color:" + /*mbi2edit*/ ctx[0].color;

    			if (dirty[0] & /*mbi2edit, themecolor, calculationsrefresh*/ 25 | dirty[1] & /*$$scope*/ 64) {
    				tile0_changes.$$scope = { dirty, ctx };
    			}

    			tile0.$set(tile0_changes);
    			const tile1_changes = {};
    			if (dirty[0] & /*mbi2edit*/ 1) tile1_changes.style = "background-color:" + /*mbi2edit*/ ctx[0].color + ";cursor: pointer";

    			if (dirty[1] & /*$$scope*/ 64) {
    				tile1_changes.$$scope = { dirty, ctx };
    			}

    			tile1.$set(tile1_changes);
    			const row_changes = {};

    			if (dirty[1] & /*$$scope*/ 64) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			transition_in(tile0.$$.fragment, local);
    			transition_in(tile1.$$.fragment, local);
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			transition_out(tile0.$$.fragment, local);
    			transition_out(tile1.$$.fragment, local);
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(grid, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(tile0, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t2);
    			destroy_component(tile1, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(108:0) <Content>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(content.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(content, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const content_changes = {};

    			if (dirty[0] & /*mbi2edit, themecolor, calculationsrefresh, pluginname, pluginemoji*/ 31 | dirty[1] & /*$$scope*/ 64) {
    				content_changes.$$scope = { dirty, ctx };
    			}

    			content.$set(content_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(content, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Mbisettings', slots, []);
    	let { pluginname } = $$props;
    	let { pluginemoji } = $$props;
    	let { mbi2edit } = $$props;
    	let { plugin } = $$props;
    	let { theme } = $$props;
    	let calculationsrefresh = false;
    	let open = true;
    	let trackers = "none";
    	let trackersDisplay = "∅ None";
    	const dispatch = createEventDispatcher();

    	const addTracker = async index => {
    		const justOneTrackable = await plugin.selectTrackables('tracker', false);

    		if (justOneTrackable) {
    			trackers = justOneTrackable[0].id;
    			$$invalidate(0, mbi2edit.calculations[index].trackable = justOneTrackable[0].id, mbi2edit);
    			trackersDisplay = justOneTrackable[0].tracker.emoji + " " + justOneTrackable[0].tracker.label;
    			$$invalidate(0, mbi2edit.calculations[index].trackabledisplay = justOneTrackable[0].tracker.emoji + " " + justOneTrackable[0].tracker.label, mbi2edit);
    		}
    	};

    	const addPerson = async index => {
    		const justOneTrackable = await plugin.selectTrackables('person', false);

    		if (justOneTrackable) {
    			$$invalidate(0, mbi2edit.calculations[index].trackable = justOneTrackable[0].id, mbi2edit);
    			trackers = justOneTrackable[0].id;
    			trackersDisplay = "😎 " + justOneTrackable[0].person.displayName;
    			$$invalidate(0, mbi2edit.calculations[index].trackabledisplay = "😎 " + justOneTrackable[0].person.displayName, mbi2edit);
    		}
    	};

    	const addTag = async index => {
    		const justOneTrackable = await plugin.prompt('Provide Tag', 'Please provide a tag which will be counted in your logs)');

    		if (justOneTrackable.value) {
    			$$invalidate(0, mbi2edit.calculations[index].trackable = "|" + justOneTrackable.value, mbi2edit);
    			trackers = "|" + justOneTrackable.value;
    			trackersDisplay = "🔎 " + justOneTrackable.value;
    			$$invalidate(0, mbi2edit.calculations[index].trackabledisplay = "🔎 " + justOneTrackable.value, mbi2edit);
    		}
    	};

    	const removeTracker = async index => {
    		$$invalidate(0, mbi2edit.calculations[index].trackable = "none", mbi2edit);
    		trackers = "none";
    		trackersDisplay = "∅ None";
    	};

    	const addCalculation = async () => {
    		mbi2edit.calculations.push({
    			minscale: 1,
    			maxscale: 10,
    			weight: 1,
    			statistics: "average",
    			reverseScale: false,
    			timerange: 30,
    			trackable: "none",
    			trackabledisplay: "∅ None"
    		});

    		$$invalidate(3, calculationsrefresh = true);

    		setTimeout(() => {
    			($$invalidate(3, calculationsrefresh = false), 200);
    		});
    	};

    	const deleteCalculation = async index => {
    		mbi2edit.calculations.splice(index, 1);
    		$$invalidate(3, calculationsrefresh = true);

    		setTimeout(() => {
    			($$invalidate(3, calculationsrefresh = false), 200);
    		});
    	};

    	// Set background
    	let themecolor = "#E9E9E9";

    	let themefont = "#161616";

    	if (theme == "g10") {
    		themecolor = "grey";
    		themefont = "#161616";
    	} else {
    		themecolor = "lightgrey";
    		themefont = "#F4F4F4";
    	}

    	function exitEdit() {
    		dispatch("exitedit");
    		open = false;
    	} //not used

    	function saveEdit() {
    		if (mbi2edit.calculations.length < 1) {
    			$$invalidate(0, mbi2edit.calculated = false, mbi2edit);
    		}

    		dispatch("saveedit");
    		open = false;
    	}

    	const writable_props = ['pluginname', 'pluginemoji', 'mbi2edit', 'plugin', 'theme'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Mbisettings> was created with unknown prop '${key}'`);
    	});

    	function textinput_value_binding(value) {
    		if ($$self.$$.not_equal(mbi2edit.label, value)) {
    			mbi2edit.label = value;
    			$$invalidate(0, mbi2edit);
    		}
    	}

    	const click_handler = index => {
    		removeTracker(index);
    	};

    	const click_handler_1 = index => {
    		addTracker(index);
    	};

    	const click_handler_2 = index => {
    		addPerson(index);
    	};

    	const click_handler_3 = index => {
    		addTag(index);
    	};

    	function select_selected_binding(value, calculation) {
    		if ($$self.$$.not_equal(calculation.timerange, value)) {
    			calculation.timerange = value;
    			$$invalidate(0, mbi2edit);
    		}
    	}

    	function select_selected_binding_1(value, calculation) {
    		if ($$self.$$.not_equal(calculation.statistics, value)) {
    			calculation.statistics = value;
    			$$invalidate(0, mbi2edit);
    		}
    	}

    	function textinput_value_binding_1(value, calculation) {
    		if ($$self.$$.not_equal(calculation.minscale, value)) {
    			calculation.minscale = value;
    			$$invalidate(0, mbi2edit);
    		}
    	}

    	function textinput_value_binding_2(value, calculation) {
    		if ($$self.$$.not_equal(calculation.maxscale, value)) {
    			calculation.maxscale = value;
    			$$invalidate(0, mbi2edit);
    		}
    	}

    	function toggle_toggled_binding(value, calculation) {
    		if ($$self.$$.not_equal(calculation.reverseScale, value)) {
    			calculation.reverseScale = value;
    			$$invalidate(0, mbi2edit);
    		}
    	}

    	function textinput_value_binding_3(value, calculation) {
    		if ($$self.$$.not_equal(calculation.weight, value)) {
    			calculation.weight = value;
    			$$invalidate(0, mbi2edit);
    		}
    	}

    	const click_handler_4 = index => {
    		deleteCalculation(index);
    	};

    	const click_handler_5 = () => {
    		addCalculation();
    	};

    	const click_handler_6 = () => {
    		saveEdit();
    	};

    	$$self.$$set = $$props => {
    		if ('pluginname' in $$props) $$invalidate(1, pluginname = $$props.pluginname);
    		if ('pluginemoji' in $$props) $$invalidate(2, pluginemoji = $$props.pluginemoji);
    		if ('mbi2edit' in $$props) $$invalidate(0, mbi2edit = $$props.mbi2edit);
    		if ('plugin' in $$props) $$invalidate(12, plugin = $$props.plugin);
    		if ('theme' in $$props) $$invalidate(13, theme = $$props.theme);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Button,
    		Content,
    		Grid,
    		Row,
    		Column,
    		Tile,
    		TextInput,
    		Select,
    		SelectItem,
    		Toggle,
    		List: TextAlignJustify,
    		CheckboxIndeterminate,
    		Person,
    		Tag,
    		TrashCan,
    		pluginname,
    		pluginemoji,
    		mbi2edit,
    		plugin,
    		theme,
    		calculationsrefresh,
    		open,
    		trackers,
    		trackersDisplay,
    		dispatch,
    		addTracker,
    		addPerson,
    		addTag,
    		removeTracker,
    		addCalculation,
    		deleteCalculation,
    		themecolor,
    		themefont,
    		exitEdit,
    		saveEdit
    	});

    	$$self.$inject_state = $$props => {
    		if ('pluginname' in $$props) $$invalidate(1, pluginname = $$props.pluginname);
    		if ('pluginemoji' in $$props) $$invalidate(2, pluginemoji = $$props.pluginemoji);
    		if ('mbi2edit' in $$props) $$invalidate(0, mbi2edit = $$props.mbi2edit);
    		if ('plugin' in $$props) $$invalidate(12, plugin = $$props.plugin);
    		if ('theme' in $$props) $$invalidate(13, theme = $$props.theme);
    		if ('calculationsrefresh' in $$props) $$invalidate(3, calculationsrefresh = $$props.calculationsrefresh);
    		if ('open' in $$props) open = $$props.open;
    		if ('trackers' in $$props) trackers = $$props.trackers;
    		if ('trackersDisplay' in $$props) trackersDisplay = $$props.trackersDisplay;
    		if ('themecolor' in $$props) $$invalidate(4, themecolor = $$props.themecolor);
    		if ('themefont' in $$props) themefont = $$props.themefont;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		mbi2edit,
    		pluginname,
    		pluginemoji,
    		calculationsrefresh,
    		themecolor,
    		addTracker,
    		addPerson,
    		addTag,
    		removeTracker,
    		addCalculation,
    		deleteCalculation,
    		saveEdit,
    		plugin,
    		theme,
    		textinput_value_binding,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		select_selected_binding,
    		select_selected_binding_1,
    		textinput_value_binding_1,
    		textinput_value_binding_2,
    		toggle_toggled_binding,
    		textinput_value_binding_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6
    	];
    }

    class Mbisettings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$5,
    			create_fragment$5,
    			safe_not_equal,
    			{
    				pluginname: 1,
    				pluginemoji: 2,
    				mbi2edit: 0,
    				plugin: 12,
    				theme: 13
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mbisettings",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pluginname*/ ctx[1] === undefined && !('pluginname' in props)) {
    			console.warn("<Mbisettings> was created without expected prop 'pluginname'");
    		}

    		if (/*pluginemoji*/ ctx[2] === undefined && !('pluginemoji' in props)) {
    			console.warn("<Mbisettings> was created without expected prop 'pluginemoji'");
    		}

    		if (/*mbi2edit*/ ctx[0] === undefined && !('mbi2edit' in props)) {
    			console.warn("<Mbisettings> was created without expected prop 'mbi2edit'");
    		}

    		if (/*plugin*/ ctx[12] === undefined && !('plugin' in props)) {
    			console.warn("<Mbisettings> was created without expected prop 'plugin'");
    		}

    		if (/*theme*/ ctx[13] === undefined && !('theme' in props)) {
    			console.warn("<Mbisettings> was created without expected prop 'theme'");
    		}
    	}

    	get pluginname() {
    		throw new Error("<Mbisettings>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pluginname(value) {
    		throw new Error("<Mbisettings>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pluginemoji() {
    		throw new Error("<Mbisettings>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pluginemoji(value) {
    		throw new Error("<Mbisettings>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mbi2edit() {
    		throw new Error("<Mbisettings>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mbi2edit(value) {
    		throw new Error("<Mbisettings>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get plugin() {
    		throw new Error("<Mbisettings>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set plugin(value) {
    		throw new Error("<Mbisettings>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get theme() {
    		throw new Error("<Mbisettings>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set theme(value) {
    		throw new Error("<Mbisettings>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/SettingsAdjust.svelte generated by Svelte v3.49.0 */

    const file$4 = "node_modules/carbon-icons-svelte/lib/SettingsAdjust.svelte";

    // (23:2) {#if title}
    function create_if_block$4(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$4, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$4(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M30 8h-4.1c-.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2v2h14.1c.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30V8zM21 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3S22.7 12 21 12zM2 24h4.1c.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30v-2H15.9c-.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2V24zM11 20c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3S9.3 20 11 20z");
    			add_location(path, file$4, 23, 2, 573);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$4, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SettingsAdjust', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class SettingsAdjust extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SettingsAdjust",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get size() {
    		throw new Error("<SettingsAdjust>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<SettingsAdjust>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<SettingsAdjust>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<SettingsAdjust>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/Sun.svelte generated by Svelte v3.49.0 */

    const file$3 = "node_modules/carbon-icons-svelte/lib/Sun.svelte";

    // (23:2) {#if title}
    function create_if_block$3(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$3, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let path2;
    	let path3;
    	let path4;
    	let path5;
    	let path6;
    	let path7;
    	let path8;
    	let if_block = /*title*/ ctx[1] && create_if_block$3(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			path3 = svg_element("path");
    			path4 = svg_element("path");
    			path5 = svg_element("path");
    			path6 = svg_element("path");
    			path7 = svg_element("path");
    			path8 = svg_element("path");
    			attr_dev(path0, "d", "M16,12a4,4,0,1,1-4,4,4.0045,4.0045,0,0,1,4-4m0-2a6,6,0,1,0,6,6,6,6,0,0,0-6-6Z");
    			attr_dev(path0, "transform", "translate(0 .005)");
    			add_location(path0, file$3, 23, 2, 573);
    			attr_dev(path1, "d", "M6.854 5.375H8.854V10.333H6.854z");
    			attr_dev(path1, "transform", "rotate(-45 7.86 7.856)");
    			add_location(path1, file$3, 23, 127, 698);
    			attr_dev(path2, "d", "M2 15.005H7V17.005000000000003H2z");
    			add_location(path2, file$3, 23, 212, 783);
    			attr_dev(path3, "d", "M5.375 23.147H10.333V25.147H5.375z");
    			attr_dev(path3, "transform", "rotate(-45 7.86 24.149)");
    			add_location(path3, file$3, 23, 263, 834);
    			attr_dev(path4, "d", "M15 25.005H17V30.005H15z");
    			add_location(path4, file$3, 23, 351, 922);
    			attr_dev(path5, "d", "M23.147 21.668H25.147V26.625999999999998H23.147z");
    			attr_dev(path5, "transform", "rotate(-45 24.152 24.149)");
    			add_location(path5, file$3, 23, 393, 964);
    			attr_dev(path6, "d", "M25 15.005H30V17.005000000000003H25z");
    			add_location(path6, file$3, 23, 497, 1068);
    			attr_dev(path7, "d", "M21.668 6.854H26.625999999999998V8.854H21.668z");
    			attr_dev(path7, "transform", "rotate(-45 24.152 7.856)");
    			add_location(path7, file$3, 23, 551, 1122);
    			attr_dev(path8, "d", "M15 2.005H17V7.005H15z");
    			add_location(path8, file$3, 23, 652, 1223);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$3, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    			append_dev(svg, path3);
    			append_dev(svg, path4);
    			append_dev(svg, path5);
    			append_dev(svg, path6);
    			append_dev(svg, path7);
    			append_dev(svg, path8);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sun', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Sun extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sun",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get size() {
    		throw new Error("<Sun>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Sun>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Sun>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Sun>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/Information.svelte generated by Svelte v3.49.0 */

    const file$2 = "node_modules/carbon-icons-svelte/lib/Information.svelte";

    // (23:2) {#if title}
    function create_if_block$2(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$2, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$2(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M17 22L17 14 13 14 13 16 15 16 15 22 12 22 12 24 20 24 20 22 17 22zM16 8a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 8z");
    			add_location(path0, file$2, 23, 2, 573);
    			attr_dev(path1, "d", "M16,30A14,14,0,1,1,30,16,14,14,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12,12,0,0,0,16,4Z");
    			add_location(path1, file$2, 23, 130, 701);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$2, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Information', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Information extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Information",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get size() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/widget.svelte generated by Svelte v3.49.0 */
    const file$1 = "src/components/widget.svelte";

    // (94:0) {#if showwidget}
    function create_if_block$1(ctx) {
    	let div;
    	let span0;
    	let p0;
    	let t1;
    	let span1;
    	let p1;
    	let t3;
    	let span2;
    	let p2;
    	let t5;
    	let span3;
    	let p3;
    	let t7;
    	let span4;
    	let p4;
    	let t9;
    	let span5;
    	let p5;
    	let t11;
    	let span6;
    	let p6;
    	let t13;
    	let span7;
    	let p7;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			p0 = element("p");
    			p0.textContent = `${/*widgetparams*/ ctx[1][0][0]}`;
    			t1 = space();
    			span1 = element("span");
    			p1 = element("p");
    			p1.textContent = `${/*widgetparams*/ ctx[1][1][0]}`;
    			t3 = space();
    			span2 = element("span");
    			p2 = element("p");
    			p2.textContent = `${/*widgetparams*/ ctx[1][2][0]}`;
    			t5 = space();
    			span3 = element("span");
    			p3 = element("p");
    			p3.textContent = `${/*widgetparams*/ ctx[1][3][0]}`;
    			t7 = space();
    			span4 = element("span");
    			p4 = element("p");
    			p4.textContent = `${/*widgetparams*/ ctx[1][4][0]}`;
    			t9 = space();
    			span5 = element("span");
    			p5 = element("p");
    			p5.textContent = `${/*widgetparams*/ ctx[1][5][0]}`;
    			t11 = space();
    			span6 = element("span");
    			p6 = element("p");
    			p6.textContent = `${/*widgetparams*/ ctx[1][6][0]}`;
    			t13 = space();
    			span7 = element("span");
    			p7 = element("p");
    			p7.textContent = `${/*widgetparams*/ ctx[1][7][0]}`;
    			attr_dev(p0, "class", "label svelte-5o3dql");
    			add_location(p0, file$1, 96, 68, 1353);
    			attr_dev(span0, "id", "first");
    			attr_dev(span0, "class", "bar svelte-5o3dql");
    			set_style(span0, "height", /*widgetparams*/ ctx[1][0][1]);
    			add_location(span0, file$1, 96, 2, 1287);
    			attr_dev(p1, "class", "label svelte-5o3dql");
    			add_location(p1, file$1, 97, 69, 1471);
    			attr_dev(span1, "id", "second");
    			attr_dev(span1, "class", "bar svelte-5o3dql");
    			set_style(span1, "height", /*widgetparams*/ ctx[1][1][1]);
    			add_location(span1, file$1, 97, 2, 1404);
    			attr_dev(p2, "class", "label svelte-5o3dql");
    			add_location(p2, file$1, 98, 68, 1588);
    			attr_dev(span2, "id", "third");
    			attr_dev(span2, "class", "bar svelte-5o3dql");
    			set_style(span2, "height", /*widgetparams*/ ctx[1][2][1]);
    			add_location(span2, file$1, 98, 2, 1522);
    			attr_dev(p3, "class", "label svelte-5o3dql");
    			add_location(p3, file$1, 99, 69, 1706);
    			attr_dev(span3, "id", "fourth");
    			attr_dev(span3, "class", "bar svelte-5o3dql");
    			set_style(span3, "height", /*widgetparams*/ ctx[1][3][1]);
    			add_location(span3, file$1, 99, 2, 1639);
    			attr_dev(p4, "class", "label svelte-5o3dql");
    			add_location(p4, file$1, 100, 67, 1822);
    			attr_dev(span4, "id", "five");
    			attr_dev(span4, "class", "bar svelte-5o3dql");
    			set_style(span4, "height", /*widgetparams*/ ctx[1][4][1]);
    			add_location(span4, file$1, 100, 2, 1757);
    			attr_dev(p5, "class", "label svelte-5o3dql");
    			add_location(p5, file$1, 101, 66, 1937);
    			attr_dev(span5, "id", "six");
    			attr_dev(span5, "class", "bar svelte-5o3dql");
    			set_style(span5, "height", /*widgetparams*/ ctx[1][5][1]);
    			add_location(span5, file$1, 101, 2, 1873);
    			attr_dev(p6, "class", "label svelte-5o3dql");
    			add_location(p6, file$1, 102, 68, 2054);
    			attr_dev(span6, "id", "seven");
    			attr_dev(span6, "class", "bar svelte-5o3dql");
    			set_style(span6, "height", /*widgetparams*/ ctx[1][6][1]);
    			add_location(span6, file$1, 102, 2, 1988);
    			attr_dev(p7, "class", "label svelte-5o3dql");
    			add_location(p7, file$1, 103, 68, 2171);
    			attr_dev(span7, "id", "eight");
    			attr_dev(span7, "class", "bar svelte-5o3dql");
    			set_style(span7, "height", /*widgetparams*/ ctx[1][7][1]);
    			add_location(span7, file$1, 103, 2, 2105);
    			attr_dev(div, "class", "parent svelte-5o3dql");
    			add_location(div, file$1, 95, 0, 1264);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, p0);
    			append_dev(div, t1);
    			append_dev(div, span1);
    			append_dev(span1, p1);
    			append_dev(div, t3);
    			append_dev(div, span2);
    			append_dev(span2, p2);
    			append_dev(div, t5);
    			append_dev(div, span3);
    			append_dev(span3, p3);
    			append_dev(div, t7);
    			append_dev(div, span4);
    			append_dev(span4, p4);
    			append_dev(div, t9);
    			append_dev(div, span5);
    			append_dev(span5, p5);
    			append_dev(div, t11);
    			append_dev(div, span6);
    			append_dev(span6, p6);
    			append_dev(div, t13);
    			append_dev(div, span7);
    			append_dev(span7, p7);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(94:0) {#if showwidget}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let if_block = /*showwidget*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*showwidget*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Widget', slots, []);
    	let { mbis } = $$props;
    	let widgetparams = [];
    	let showwidget = false;

    	function initwidget() {
    		for (let i in mbis) {
    			let scale = 0;

    			if (mbis[i].calculated) {
    				scale = mbis[i].calculatedscale * 95;
    			} else {
    				scale = mbis[i].scale * 95;
    			}

    			let label = mbis[i].label;
    			widgetparams.push([label, scale.toFixed(0).toString() + "%"]);
    		}

    		$$invalidate(0, showwidget = true);
    	}

    	onMount(() => {
    		initwidget();
    	});

    	const writable_props = ['mbis'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Widget> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('mbis' in $$props) $$invalidate(2, mbis = $$props.mbis);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		mbis,
    		widgetparams,
    		showwidget,
    		initwidget
    	});

    	$$self.$inject_state = $$props => {
    		if ('mbis' in $$props) $$invalidate(2, mbis = $$props.mbis);
    		if ('widgetparams' in $$props) $$invalidate(1, widgetparams = $$props.widgetparams);
    		if ('showwidget' in $$props) $$invalidate(0, showwidget = $$props.showwidget);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [showwidget, widgetparams, mbis];
    }

    class Widget extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { mbis: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Widget",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*mbis*/ ctx[2] === undefined && !('mbis' in props)) {
    			console.warn("<Widget> was created without expected prop 'mbis'");
    		}
    	}

    	get mbis() {
    		throw new Error("<Widget>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mbis(value) {
    		throw new Error("<Widget>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.49.0 */
    const file = "src/App.svelte";

    // (339:19) 
    function create_if_block_9(ctx) {
    	let h1;
    	let t1;
    	let h2;
    	let t3;
    	let h5;
    	let t4;
    	let t5;
    	let t6;
    	let hr;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = `${pluginemoji}`;
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = `${pluginname}`;
    			t3 = space();
    			h5 = element("h5");
    			t4 = text("This is a plugin for ");
    			t5 = text(/*parent*/ ctx[0]);
    			t6 = space();
    			hr = element("hr");
    			set_style(h1, "text-align", "center");
    			add_location(h1, file, 339, 8, 21852);
    			set_style(h2, "text-align", "center");
    			add_location(h2, file, 340, 8, 21909);
    			set_style(h5, "text-align", "center");
    			add_location(h5, file, 341, 8, 21965);
    			add_location(hr, file, 342, 8, 22038);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, h5, anchor);
    			append_dev(h5, t4);
    			append_dev(h5, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, hr, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*parent*/ 1) set_data_dev(t5, /*parent*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(h5);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(339:19) ",
    		ctx
    	});

    	return block;
    }

    // (310:0) {#if mode == "modal"  || mode =="widget"}
    function create_if_block_1(ctx) {
    	let theme_1;
    	let updating_theme;
    	let t;
    	let if_block_anchor;
    	let current;

    	function theme_1_theme_binding(value) {
    		/*theme_1_theme_binding*/ ctx[19](value);
    	}

    	let theme_1_props = {};

    	if (/*theme*/ ctx[2] !== void 0) {
    		theme_1_props.theme = /*theme*/ ctx[2];
    	}

    	theme_1 = new Theme({ props: theme_1_props, $$inline: true });
    	binding_callbacks.push(() => bind(theme_1, 'theme', theme_1_theme_binding));
    	let if_block = /*inNomie*/ ctx[1] && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			create_component(theme_1.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(theme_1, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const theme_1_changes = {};

    			if (!updating_theme && dirty[0] & /*theme*/ 4) {
    				updating_theme = true;
    				theme_1_changes.theme = /*theme*/ ctx[2];
    				add_flush_callback(() => updating_theme = false);
    			}

    			theme_1.$set(theme_1_changes);

    			if (/*inNomie*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*inNomie*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(theme_1.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(theme_1.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(theme_1, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(310:0) {#if mode == \\\"modal\\\"  || mode ==\\\"widget\\\"}",
    		ctx
    	});

    	return block;
    }

    // (313:0) {#if inNomie}
    function create_if_block_2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_3, create_if_block_8];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*mode*/ ctx[3] == "modal") return 0;
    		if (/*mode*/ ctx[3] == "widget") return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type_1(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(313:0) {#if inNomie}",
    		ctx
    	});

    	return block;
    }

    // (334:27) 
    function create_if_block_8(ctx) {
    	let mbiwidget;
    	let updating_mbis;
    	let current;

    	function mbiwidget_mbis_binding(value) {
    		/*mbiwidget_mbis_binding*/ ctx[26](value);
    	}

    	let mbiwidget_props = {};

    	if (/*mbis*/ ctx[6] !== void 0) {
    		mbiwidget_props.mbis = /*mbis*/ ctx[6];
    	}

    	mbiwidget = new Widget({ props: mbiwidget_props, $$inline: true });
    	binding_callbacks.push(() => bind(mbiwidget, 'mbis', mbiwidget_mbis_binding));

    	const block = {
    		c: function create() {
    			create_component(mbiwidget.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mbiwidget, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const mbiwidget_changes = {};

    			if (!updating_mbis && dirty[0] & /*mbis*/ 64) {
    				updating_mbis = true;
    				mbiwidget_changes.mbis = /*mbis*/ ctx[6];
    				add_flush_callback(() => updating_mbis = false);
    			}

    			mbiwidget.$set(mbiwidget_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mbiwidget.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mbiwidget.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mbiwidget, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(334:27) ",
    		ctx
    	});

    	return block;
    }

    // (314:0) {#if mode == "modal"}
    function create_if_block_3(ctx) {
    	let header;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	header = new Header({
    			props: {
    				company: /*parent*/ ctx[0],
    				platformName: pluginname,
    				$$slots: {
    					"skip-to-content": [create_skip_to_content_slot],
    					default: [create_default_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	header.$on("click", /*showMain*/ ctx[11]);
    	const if_block_creators = [create_if_block_4, create_if_block_5, create_if_block_6, create_if_block_7];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*view*/ ctx[5] == "main") return 0;
    		if (/*view*/ ctx[5] == "info") return 1;
    		if (/*view*/ ctx[5] == "settings") return 2;
    		if (/*view*/ ctx[5] == "mbisettings") return 3;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type_2(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const header_changes = {};
    			if (dirty[0] & /*parent*/ 1) header_changes.company = /*parent*/ ctx[0];

    			if (dirty[1] & /*$$scope*/ 4) {
    				header_changes.$$scope = { dirty, ctx };
    			}

    			header.$set(header_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(314:0) {#if mode == \\\"modal\\\"}",
    		ctx
    	});

    	return block;
    }

    // (319:2) <HeaderUtilities>
    function create_default_slot_1(ctx) {
    	let headerglobalaction0;
    	let t0;
    	let headerglobalaction1;
    	let t1;
    	let headerglobalaction2;
    	let current;

    	headerglobalaction0 = new HeaderGlobalAction({
    			props: {
    				"aria-label": "Settings",
    				icon: SettingsAdjust
    			},
    			$$inline: true
    		});

    	headerglobalaction0.$on("click", /*showSettings*/ ctx[13]);

    	headerglobalaction1 = new HeaderGlobalAction({
    			props: { "aria-label": "Theme", icon: Sun },
    			$$inline: true
    		});

    	headerglobalaction1.$on("click", /*toggleTheme*/ ctx[10]);

    	headerglobalaction2 = new HeaderGlobalAction({
    			props: { "aria-label": "Theme", icon: Information },
    			$$inline: true
    		});

    	headerglobalaction2.$on("click", /*showInformation*/ ctx[12]);

    	const block = {
    		c: function create() {
    			create_component(headerglobalaction0.$$.fragment);
    			t0 = space();
    			create_component(headerglobalaction1.$$.fragment);
    			t1 = space();
    			create_component(headerglobalaction2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(headerglobalaction0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(headerglobalaction1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(headerglobalaction2, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(headerglobalaction0.$$.fragment, local);
    			transition_in(headerglobalaction1.$$.fragment, local);
    			transition_in(headerglobalaction2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(headerglobalaction0.$$.fragment, local);
    			transition_out(headerglobalaction1.$$.fragment, local);
    			transition_out(headerglobalaction2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(headerglobalaction0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(headerglobalaction1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(headerglobalaction2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(319:2) <HeaderUtilities>",
    		ctx
    	});

    	return block;
    }

    // (315:0) <Header company={parent} platformName={pluginname} on:click={showMain}>
    function create_default_slot(ctx) {
    	let headerutilities;
    	let current;

    	headerutilities = new HeaderUtilities({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(headerutilities.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(headerutilities, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const headerutilities_changes = {};

    			if (dirty[1] & /*$$scope*/ 4) {
    				headerutilities_changes.$$scope = { dirty, ctx };
    			}

    			headerutilities.$set(headerutilities_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(headerutilities.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(headerutilities.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(headerutilities, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(315:0) <Header company={parent} platformName={pluginname} on:click={showMain}>",
    		ctx
    	});

    	return block;
    }

    // (316:2) <svelte:fragment slot="skip-to-content">
    function create_skip_to_content_slot(ctx) {
    	let skiptocontent;
    	let current;
    	skiptocontent = new SkipToContent({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(skiptocontent.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(skiptocontent, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skiptocontent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skiptocontent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(skiptocontent, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_skip_to_content_slot.name,
    		type: "slot",
    		source: "(316:2) <svelte:fragment slot=\\\"skip-to-content\\\">",
    		ctx
    	});

    	return block;
    }

    // (331:32) 
    function create_if_block_7(ctx) {
    	let mbisettings;
    	let updating_mbi2edit;
    	let current;

    	function mbisettings_mbi2edit_binding(value) {
    		/*mbisettings_mbi2edit_binding*/ ctx[23](value);
    	}

    	let mbisettings_props = {
    		plugin: /*plugin*/ ctx[9],
    		pluginname,
    		pluginemoji,
    		theme: /*theme*/ ctx[2]
    	};

    	if (/*mbis*/ ctx[6][/*currentmbiindex*/ ctx[7]] !== void 0) {
    		mbisettings_props.mbi2edit = /*mbis*/ ctx[6][/*currentmbiindex*/ ctx[7]];
    	}

    	mbisettings = new Mbisettings({ props: mbisettings_props, $$inline: true });
    	binding_callbacks.push(() => bind(mbisettings, 'mbi2edit', mbisettings_mbi2edit_binding));
    	mbisettings.$on("exitedit", /*exitedit_handler*/ ctx[24]);
    	mbisettings.$on("saveedit", /*saveedit_handler*/ ctx[25]);

    	const block = {
    		c: function create() {
    			create_component(mbisettings.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mbisettings, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const mbisettings_changes = {};
    			if (dirty[0] & /*theme*/ 4) mbisettings_changes.theme = /*theme*/ ctx[2];

    			if (!updating_mbi2edit && dirty[0] & /*mbis, currentmbiindex*/ 192) {
    				updating_mbi2edit = true;
    				mbisettings_changes.mbi2edit = /*mbis*/ ctx[6][/*currentmbiindex*/ ctx[7]];
    				add_flush_callback(() => updating_mbi2edit = false);
    			}

    			mbisettings.$set(mbisettings_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mbisettings.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mbisettings.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mbisettings, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(331:32) ",
    		ctx
    	});

    	return block;
    }

    // (329:29) 
    function create_if_block_6(ctx) {
    	let settings;
    	let current;

    	settings = new Settings({
    			props: { pluginname, pluginemoji },
    			$$inline: true
    		});

    	settings.$on("exitsettings", /*showMain*/ ctx[11]);
    	settings.$on("savesettings", /*saveSettings*/ ctx[15]);

    	const block = {
    		c: function create() {
    			create_component(settings.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(settings, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(settings.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(settings.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(settings, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(329:29) ",
    		ctx
    	});

    	return block;
    }

    // (327:25) 
    function create_if_block_5(ctx) {
    	let info;
    	let current;

    	info = new Info({
    			props: {
    				parent: /*parent*/ ctx[0],
    				pluginname,
    				pluginemoji
    			},
    			$$inline: true
    		});

    	info.$on("exitinfo", /*showMain*/ ctx[11]);

    	const block = {
    		c: function create() {
    			create_component(info.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(info, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const info_changes = {};
    			if (dirty[0] & /*parent*/ 1) info_changes.parent = /*parent*/ ctx[0];
    			info.$set(info_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(info.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(info, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(327:25) ",
    		ctx
    	});

    	return block;
    }

    // (325:0) {#if view == "main"}
    function create_if_block_4(ctx) {
    	let main;
    	let updating_mbis;
    	let current;

    	function main_mbis_binding(value) {
    		/*main_mbis_binding*/ ctx[20](value);
    	}

    	let main_props = { pluginname, pluginemoji };

    	if (/*mbis*/ ctx[6] !== void 0) {
    		main_props.mbis = /*mbis*/ ctx[6];
    	}

    	main = new Main({ props: main_props, $$inline: true });
    	binding_callbacks.push(() => bind(main, 'mbis', main_mbis_binding));
    	main.$on("mbisettings", /*mbisettings_handler*/ ctx[21]);
    	main.$on("savembis", /*savembis_handler*/ ctx[22]);

    	const block = {
    		c: function create() {
    			create_component(main.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(main, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const main_changes = {};

    			if (!updating_mbis && dirty[0] & /*mbis*/ 64) {
    				updating_mbis = true;
    				main_changes.mbis = /*mbis*/ ctx[6];
    				add_flush_callback(() => updating_mbis = false);
    			}

    			main.$set(main_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(main.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(main.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(main, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(325:0) {#if view == \\\"main\\\"}",
    		ctx
    	});

    	return block;
    }

    // (345:0) {#if loading}
    function create_if_block(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Loading....";
    			add_location(p, file, 346, 0, 22085);
    			attr_dev(div, "class", "startup");
    			add_location(div, file, 345, 0, 22063);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(345:0) {#if loading}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let libloader;
    	let t0;
    	let current_block_type_index;
    	let if_block0;
    	let t1;
    	let if_block1_anchor;
    	let current;

    	libloader = new LibLoadder({
    			props: { url: /*PlugiAapiUrl*/ ctx[8] },
    			$$inline: true
    		});

    	libloader.$on("loaded", onLoaded);
    	const if_block_creators = [create_if_block_1, create_if_block_9];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*mode*/ ctx[3] == "modal" || /*mode*/ ctx[3] == "widget") return 0;
    		if (!/*inNomie*/ ctx[1]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	let if_block1 = /*loading*/ ctx[4] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			create_component(libloader.$$.fragment);
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(libloader, target, anchor);
    			insert_dev(target, t0, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block0) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block0 = if_blocks[current_block_type_index];

    					if (!if_block0) {
    						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block0.c();
    					} else {
    						if_block0.p(ctx, dirty);
    					}

    					transition_in(if_block0, 1);
    					if_block0.m(t1.parentNode, t1);
    				} else {
    					if_block0 = null;
    				}
    			}

    			if (/*loading*/ ctx[4]) {
    				if (if_block1) ; else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(libloader.$$.fragment, local);
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(libloader.$$.fragment, local);
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(libloader, detaching);
    			if (detaching) detach_dev(t0);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const pluginname = "My Balance";
    const pluginemoji = "⚖️";

    function onLoaded() {
    	
    } // setTimeout(()=>{
    // if (plugin.prefs == undefined) {

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	var parent = "";
    	let PlugiAapiUrl = "https://plugins.nomie.app/v1/nomie-plugin.js";

    	const plugin = new NomiePlugin({
    			name: pluginname,
    			emoji: pluginemoji,
    			avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAC0ALQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDZooooAKKKKACiiigAooqCW7hiyC25h2XmgaTexPRWdJqTf8s4wOerHPFQtfXBJO/A9ABU8yNFRmzXorEM8xOfNk/76NPSWQrzLJ/32aOdE1IOmrs2KKy1nlTpI34nP86ljupzxlWxyS3H+FHMjFTRfoqst6ucSIV9xyKnSRZFyjAj2p3uUmmOooopjCiiigAooooAKKKKACiiigAooooAKhuLmOAfMcsRwoqC7vvLYxxYLDq3pWcGIcNn5gc5PPNS5WN6dFy1ZZnmuJ2ZT8oxygP8/wDCmCONOXYkhucdxx+ff/61NEm0/ulKluOufyqaGwlk+aQ7AeeepqdzbSC10IJJAw2gYGcnAxngf/X/ADpiqzkhFLEdgM1rx2UEY+5vPq3NT0+UzddLZGMlrO4yIm/Hj+dSx2s2CNnIODyK1Kij3F5uf4xj6YFPlRjUm6iszPMUgbBjf/vk01XKghTg9CR1+la9IyK4AdQ2ORkZpcph7PsZu9GyCNoPtnH+eBRsKsTG/I7g/wBfwzVp7KM/cJQ/mKqvFLByw49RyPT+tJpolxaJ4rwqdswz/tCrisGGVII9RWU8m5FXAAFLFM8JynQnJB6GmpDU+5qUU2ORZV3Kfw9KdVmoUUUUAFFFFABRRRQAVSu7vGYojz0Zh2+lS3dx5KbVI3n9B61mVSRSRHyDg9f51JBA877U7dSegp8UBuH2DtyT6VoxbYh5EYXzAN2DxketZuCTN3XaVuotvaxwAYGXxyx/zxU1FFUc7berCiiigQVDGFE0mWOd+QM/7IqaoIyvnyYTJ3nn0+UUAT0UUUAFFFFAFSezB+aLjj7vr9KpdOvH1rYqrcQ+fuJARgcKc/e4/wA/lUuNzOUL6oqwmRP3qcAdv73+cVoxSrNGHU8d/asmJgjncuT0wex/GpIpPs8vmL8yNwcZ/rWvJZaExlY1aKAQwBByDyDRUGwUUUUAFIzBFLNwAMmlqnqEmFWId+T9O3+fahagVyslxIzsCGPIXrx2/CoUUu4VepOBUz/JAoK9eBn884/rVjT4sKZT34FXeyLvYswxCGMIPxPqac67lwDhux9DS0VBBCr+UNr5Lnkhe/qQKmpGRWIJHzDoe4pkTNgiUBX6kA5H4UASUUAgjI5FFABUMTN5soKcb+uf9kVNUUYbzZTnjf0x/sigCWiiigAopGYKpZiAB1Jph3swdSNuOFPc+uaAEwJwrZdQDkDlT+IqQA7RuOSB1xS0UAU7+3DKZkAyPve49aqIVdcOBkA89Pp+ta9ZU8f2a54GV6j6VcX0MprqWLCXaTA55HK/5/WrtZLsqSCSNvmHP1+v+T71qqwdAw6EZFKSKg9LC0UUVJYVmyOXu3fIGw4AJA6ccdvetGR9kbORnaCay4yqxEAsSOSueD+HeqiNDSN8oRcDJxkCtZVCKFHQDArOsV3XO45+UE5960qJAwoooqRBTZI1k27uqncpHY06igCON3MhDjbjjGOvuKkBBGQcg02RBIuMleQQV6imI5EnlBQAo54wD7igCWoogPNlO4k7/X/ZFS1DGVEsgxyX/wDZRQBNR0oqLKzqMhlIOQDkHg9SPSgBfmdmV4x5Z4HfIx3FPVdoxkn3NKM4GeTRQAUUUUAFVr+PfBuA5Q56dv8AP8qs0jKHQq3QjBprQTV1YyogWQBApbd0I6/j+dXNPcNAV/ungd8f5zVGFT5uwr8/ToDg/jVmyJW6kQDAIzj054/nVy2Mobl+iiiszYhu32Wzn8PzOKyq1L0ZtX/D+YrM2mtIp2DnjHdl7TlIWRs8Egfl/wDrq5VSwJELjaT839BU5eQRBhCS/Hy7h/Ooe4XvqiSimM7h1AiJU5ycjil3NuI8s4xwcikA6io1eQq5MJBBO0bh8w7Uu99inyjuOMrkcetAD6bIhdCAdrfwt6H1pC7h1AjJU5y2RxQHcuwMZCjGDkc0ANiZUbyeA4G7A7j1FEbYadnwqh+pPbaOaXl1+dCpBODkce9U7OeeWWVZ4MAnOAMc8Dv17UAXOXKurApjgdj6HNSAAEkAZPU1GHYM37lgOucjn9aPMk2k+Q2RnAyOf1oAkoqPzJNoPkNk4yMjj9aDI+4AQsQepyOP1oAkoqMSOWYGFgB0ORz+tHmPsJ8lt3OBkc/rQBJRUbSOAuIWOTzyOP1pd7bseU2Mdcj/ABoAzJ18u8cZ/izyM9ef61LACLuJg2Q2c5PJ4PuaZcKzXUjAYwRwfoKfbBzdIzY4yOBj1queO1zPkle9jRoooqTQgvQTasB1yD+orPCsxwFJrVlBaFwv3ipA+tZ0fMTDv9cYHX8a1pvQ56qu0WLIK8EiHuefxFWPJTyvLx8tVLBgJXGOWGc/T/8AXV6on8RrTd4oQjJB9DmlwN2cc9KKKksRVC7sZ5OTk0FAY9hHy4xS0UAIyhsZ7HNB2qS7EAAck9hS0zlyyugKHgd8+uRQAmH3gqBs/u4xznrn+lC7pNwdCmG+U5z+NSAYpqhsncwIzxgY4oAZGxXmUASY52ngj1GakVQq7R70jxJIVLD5l5U9xTEkYFvN+XGePUDuP8KAJCoIAI4GDS45zQCGAIIIPIIooAQKAxIzk9eaNoKlexznmlooAb5a7VXHCYx+FLtGc96WigCjOP37n1I/kKIDidB6kj9DTCQzFgchiSPxqW1AM3I6AkH/AD9a5VrM6HpAuUUUV1HOFZoUpK8QyADwAeeOnNaVUr1CkiyDvwfr/n+VXB62Mqq0uRI3k3KkjAzzzjr6/wCe1aVZj5IClixOCFUcDNXraXzYQT94cGnUXUVJ7olooorM2Ciio/8AXBWUsMHIBBGeo5HpQAYEuVdCAGyAT1xyDxUlFFABUUaqJGIkLHceC2cdOKlqOMx7mCLg7jn5cc8Z+v1oAkpskaygAkjByCDjBp1FAEaSEyMjKQV74wD7ipAQRkcimyp5iFQxU9mHUUyN9riHADAZOOOPUUAS0UUUAFMnbZCxGc4wMU+qty2+UR9l9u/+f51MnZFRV2QbTjODj1qzZrw7c8nGMf59ahlI6YJPQcZP+fwq5EnlxqvcdfrWVOPvXNJy0HUUUVuYhTJo/NiKd+x96fRQG5mxE8occZznn9O9LDL5M5PG08HA/Wpb2E581Rn+9/jVOuhWkjkleDNigkKpZiABySe1U7S4CgROcf3Sf5VYLMGJOPLwMeuf84rBqzsdMZKSugJZyrxsChHT1z3qSkChc47nNLSKCiiigAqNGkLsGj2gEgHOcjjBqSmIHDNucMMnHGMD0oAfRRRQAU2Rd6kA4bsfQ06igCGM+XiNuXJzx39SKmprIrYJHzDo3cVGj7AWnwsgHODkEe350APlk8uMt1PQCqapkFieucn3olk819xGMcAelGS5VRjceAfWueUuZ2N4x5VcliXzpyx5Veef0/xq1TY0EaBR+J9TTq2irIxk7sKKKKoQUUUUABAIIIyD1BrOubfyTlc7D0z2rRpGUMpVhkGqjLlZM4KSszJC56jj0q5b3QVdsrdOjH+tR3EBi+Ycoe/pQNrQlR29T9Oahybd2dMYQUEol+iqCSyW5xkMvpn+XpVuOeOTgHB9D1ouZyg0SUUUUyAqOPZvba247jn5s4PHH/1qkqOLbufbGVO45O3GTxzQBJRRRQAUUEgDJOAKhe4HKxDc3r2/+vQBK7qgyxx2qjMxmbLEgD7oHb3+tDlmO5iT/SkAyQB1PSrUe5NyMMQdrfe9u/0q/bxbF3MBvP6e1Ngt9h3vgt2H93/69T1iqcYu6NHNtWYUUUVZIUUUUAFFFFABRRRQAEZGD0qrLakEvCcH0zj8qtUUDUmtjPEpXKsMEe35f0oaNXGVI249OP8APerzxpIMOoNVms2HMb/99VNjaNRegxHmjYAPkZ78jp+dPW8YBd8YPqQcfpUZE6cFDzk8DPt2oWVGG49ARxwc/wCeKBuMWTG9QHGyQ+/H+NL9rTBIRz9Mf41UYghcdhzxSp92qjqyKkFFXRa+1grkIwPo2KY1y56ALxz35qKgckgckckDk1dkYXZIVZ2G5ix689KPkXsSaVYpW7bRjqTjipUtkH3zvP6flRdBYhUNMMAcZHJ6d8//AKqsRQrGPVu7VJRUtjsFFFFIYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUjIrjDqGHoRmiigBvkxYx5a/lQIYx0QUUUBcPKj3BvLTI77RT6KKACiiigAooooAKKKKACiiigAooooA//Z",
    			description: "Plugin in support of the My Balance Indicator (MBI) framework",
    			uses: [
    				"createNote",
    				"getLocation",
    				"selectTrackables",
    				"getTrackableUsage",
    				"searchNotes"
    			],
    			version: "1.1",
    			addToCaptureMenu: true,
    			addToMoreMenu: true,
    			addToWidgets: true
    		});

    	let inNomie = false;
    	let isSideNavOpen = false;
    	let theme = "g10";
    	let mode = "hidden";
    	let loading = true;
    	let view = "main";

    	const mbisinit = [
    		{
    			label: "Breathe",
    			color: "#ED2527",
    			scale: 0.0,
    			calculated: false,
    			calculations: [],
    			calculatedscale: 0.0
    		},
    		{
    			label: "Hydrate",
    			color: "#3DB549",
    			scale: 0.0,
    			calculated: false,
    			calculations: [],
    			calculatedscale: 0.0
    		},
    		{
    			label: "Sleep",
    			color: "#2289B4",
    			scale: 0.0,
    			calculated: false,
    			calculations: [],
    			calculatedscale: 0.0
    		},
    		{
    			label: "Eat",
    			color: "#F79321",
    			scale: 0.0,
    			calculated: false,
    			calculations: [],
    			calculatedscale: 0.0
    		},
    		{
    			label: "Move",
    			color: "#94AFDC",
    			scale: 0.0,
    			calculated: false,
    			calculations: [],
    			calculatedscale: 0.0
    		},
    		{
    			label: "Connect",
    			color: "#FF5F75",
    			scale: 0.0,
    			calculated: false,
    			calculations: [],
    			calculatedscale: 0.0
    		},
    		{
    			label: "Learn",
    			color: "#00ADEF",
    			scale: 0.0,
    			calculated: false,
    			calculations: [],
    			calculatedscale: 0.0
    		},
    		{
    			label: "Reflect",
    			color: "#935FA7",
    			scale: 0.0,
    			calculated: false,
    			calculations: [],
    			calculatedscale: 0.0
    		}
    	];

    	let mbis = [];
    	let currentmbiindex = 0;

    	// Load init params
    	function loadInitParams() {
    		$$invalidate(0, parent = getParentUrl());

    		plugin.onUIOpened(async () => {
    			$$invalidate(3, mode = 'modal');
    		});

    		plugin.onWidget(() => {
    			if (plugin.prefs.theme == "light") {
    				$$invalidate(2, theme = "white");
    			} else if (plugin.prefs.theme == "dark") {
    				$$invalidate(2, theme = "g100");
    			} else {
    				$$invalidate(2, theme = "g10");
    			}

    			$$invalidate(3, mode = "widget");
    		});

    		plugin.onRegistered(async () => {
    			await plugin.storage.init();
    			$$invalidate(6, mbis = await plugin.storage.getItem('mbis') || mbisinit);

    			if (mbis.length == 0) {
    				$$invalidate(6, mbis = mbisinit);
    			}

    			// lets check if loaded data, otherwise try again after 2 secs
    			if (mbis == mbisinit) {
    				setTimeout(
    					async () => {
    						$$invalidate(6, mbis = await plugin.storage.getItem('mbis') || mbisinit);

    						if (mbis.length == 0) {
    							$$invalidate(6, mbis = mbisinit);
    						}
    					},
    					2000
    				);
    			}

    			if (mbis.length == 0) {
    				$$invalidate(6, mbis = mbisinit);
    			}

    			if (mode != "widget") {
    				if (plugin.prefs.theme == "light") {
    					$$invalidate(2, theme = "g10");
    				} else if (plugin.prefs.theme == "dark") {
    					$$invalidate(2, theme = "g90");
    				} else {
    					$$invalidate(2, theme = "g10");
    				}
    			}
    		});

    		setTimeout(
    			() => {
    				$$invalidate(1, inNomie = true);
    				$$invalidate(4, loading = false);
    			},
    			700
    		);
    	}

    	// change theme
    	function toggleTheme() {
    		if (theme == "white") {
    			$$invalidate(2, theme = "g10");
    		} else if (theme == "g10") {
    			$$invalidate(2, theme = "g80");
    		} else if (theme == "g80") {
    			$$invalidate(2, theme = "g90");
    		} else if (theme == "g90") {
    			$$invalidate(2, theme = "g100");
    		} else {
    			$$invalidate(2, theme = "white");
    		}
    	}

    	// Get parent
    	function getParentUrl() {
    		var isInIframe = parent !== window, parentUrl = null;
    		var parentfound = null;

    		if (isInIframe) {
    			parentUrl = document.referrer;
    		}

    		if (parentUrl.includes("nomie")) {
    			parentfound = "Nomie";
    		} else {
    			parentfound = "Smarter4Ever";
    		}

    		return parentfound;
    	}

    	//view main page
    	function showMain() {
    		$$invalidate(5, view = "main");
    		window.scrollTo(0, 0);
    	}

    	//view info page
    	function showInformation() {
    		$$invalidate(5, view = "info");
    		window.scrollTo(0, 0);
    	}

    	//view settings page
    	function showSettings() {
    		$$invalidate(5, view = "settings");
    		window.scrollTo(0, 0);
    	}

    	//view mbisettings page
    	function showMBISettings(payload) {
    		$$invalidate(7, currentmbiindex = payload.detail);
    		$$invalidate(5, view = "mbisettings");
    		window.scrollTo(0, 0);
    	}

    	function saveSettings() {
    		showMain();
    	}

    	// APP CODE
    	function saveEdit() {
    		startCalculation();

    		const tempcheck = [
    			{
    				label: "Breathe",
    				color: "#ED2527",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Hydrate",
    				color: "#3DB549",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Sleep",
    				color: "#2289B4",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Eat",
    				color: "#F79321",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Move",
    				color: "#94AFDC",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Connect",
    				color: "#FF5F75",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Learn",
    				color: "#00ADEF",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Reflect",
    				color: "#935FA7",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			}
    		];

    		//prevent from saving when initial items
    		if (mbis !== tempcheck & mbis.length > 0) {
    			plugin.storage.setItem('mbis', mbis);
    		}

    		showMain();
    	}

    	async function exitEdit() {
    		$$invalidate(6, mbis = await plugin.storage.getItem('mbis'));
    		showMain();
    	}

    	function saveMBIs() {
    		const tempcheck = [
    			{
    				label: "Breathe",
    				color: "#ED2527",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Hydrate",
    				color: "#3DB549",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Sleep",
    				color: "#2289B4",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Eat",
    				color: "#F79321",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Move",
    				color: "#94AFDC",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Connect",
    				color: "#FF5F75",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Learn",
    				color: "#00ADEF",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			},
    			{
    				label: "Reflect",
    				color: "#935FA7",
    				scale: 0.0,
    				calculated: false,
    				calculations: [],
    				calculatedscale: 0.0
    			}
    		];

    		//prevent from saving when initial items
    		if (mbis !== tempcheck & mbis.length > 0) {
    			plugin.storage.setItem('mbis', mbis);
    		}
    	}

    	async function startCalculation() {
    		//START loop through BMI's
    		for (let mbi_index = 0; mbi_index < mbis.length; mbi_index++) {
    			//START loop through Calculation
    			let totalweight = 0;

    			let totalvalue = 0;
    			let finalscale = 0;

    			for (let calc_index = 0; calc_index < mbis[mbi_index].calculations.length; calc_index++) {
    				if (mbis[mbi_index].calculations[calc_index].trackable != "none") {
    					//now get the value for the statistics
    					let calculatedvalue = await getStatsValue(mbis[mbi_index].calculations[calc_index].statistics, mbis[mbi_index].calculations[calc_index].trackable, mbis[mbi_index].calculations[calc_index].timerange);

    					// now we make sure that the value is within the min and max scale. Otherwise we change to either minscale or maxscale value
    					if (calculatedvalue < mbis[mbi_index].calculations[calc_index].minscale) {
    						calculatedvalue = mbis[mbi_index].calculations[calc_index].minscale;
    					}

    					if (calculatedvalue > mbis[mbi_index].calculations[calc_index].maxscale) {
    						calculatedvalue = mbis[mbi_index].calculations[calc_index].maxscale;
    					}

    					// next step is to determin where on the scale the calculated value is
    					let calculatedscale = (calculatedvalue - mbis[mbi_index].calculations[calc_index].minscale) / (mbis[mbi_index].calculations[calc_index].maxscale - mbis[mbi_index].calculations[calc_index].minscale);

    					if (mbis[mbi_index].calculations[calc_index].reverseScale) {
    						calculatedscale = 1 - calculatedscale;
    					}

    					totalweight = totalweight + parseInt(mbis[mbi_index].calculations[calc_index].weight);
    					totalvalue = totalvalue + calculatedscale * mbis[mbi_index].calculations[calc_index].weight;
    				}
    			}

    			//END loop through Calculation
    			//now calculate final result for this MBI
    			if (totalweight > 0) {
    				finalscale = totalvalue / totalweight;
    			} else {
    				finalscale = 0;
    			}

    			$$invalidate(6, mbis[mbi_index].calculatedscale = finalscale, mbis);
    		}

    		//END loop through BMI's
    		saveMBIs();
    	}

    	async function getStatsValue(statistic, trackable, timerange) {
    		let result = 0;

    		if (trackable.charAt(0) == "#" || trackable.charAt(0) == "@") {
    			const call = await plugin.getTrackableUsage({
    				tag: trackable,
    				daysBack: parseInt(timerange)
    			});

    			const usage = call.usage;
    			let total = 0;

    			for (let value of usage.values) {
    				total = total + value;
    			}

    			if (statistic == "sum") {
    				result = total;
    			} else {
    				result = total / usage.values.length;
    			}
    		} else if (trackable.charAt(0) == "|") {
    			let searchstring = trackable.slice(1);
    			const notes = await plugin.searchNotes(searchstring, new Date(), parseInt(timerange));

    			if (notes) {
    				let total = notes.length;

    				if (statistic == "sum") {
    					result = total;
    				} else {
    					result = total / parseInt(timerange);
    				}
    			} else {
    				result = 0;
    			}
    		} else {
    			result = 0;
    		}

    		return result;
    	}

    	//   window.location.reload()}},2000);
    	/*if (!plugin) {
    plugin = new NomiePlugin({
      name: pluginname,
          emoji: pluginemoji,
          avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAC0ALQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDZooooAKKKKACiiigAooqCW7hiyC25h2XmgaTexPRWdJqTf8s4wOerHPFQtfXBJO/A9ABU8yNFRmzXorEM8xOfNk/76NPSWQrzLJ/32aOdE1IOmrs2KKy1nlTpI34nP86ljupzxlWxyS3H+FHMjFTRfoqst6ucSIV9xyKnSRZFyjAj2p3uUmmOooopjCiiigAooooAKKKKACiiigAooooAKhuLmOAfMcsRwoqC7vvLYxxYLDq3pWcGIcNn5gc5PPNS5WN6dFy1ZZnmuJ2ZT8oxygP8/wDCmCONOXYkhucdxx+ff/61NEm0/ulKluOufyqaGwlk+aQ7AeeepqdzbSC10IJJAw2gYGcnAxngf/X/ADpiqzkhFLEdgM1rx2UEY+5vPq3NT0+UzddLZGMlrO4yIm/Hj+dSx2s2CNnIODyK1Kij3F5uf4xj6YFPlRjUm6iszPMUgbBjf/vk01XKghTg9CR1+la9IyK4AdQ2ORkZpcph7PsZu9GyCNoPtnH+eBRsKsTG/I7g/wBfwzVp7KM/cJQ/mKqvFLByw49RyPT+tJpolxaJ4rwqdswz/tCrisGGVII9RWU8m5FXAAFLFM8JynQnJB6GmpDU+5qUU2ORZV3Kfw9KdVmoUUUUAFFFFABRRRQAVSu7vGYojz0Zh2+lS3dx5KbVI3n9B61mVSRSRHyDg9f51JBA877U7dSegp8UBuH2DtyT6VoxbYh5EYXzAN2DxketZuCTN3XaVuotvaxwAYGXxyx/zxU1FFUc7berCiiigQVDGFE0mWOd+QM/7IqaoIyvnyYTJ3nn0+UUAT0UUUAFFFFAFSezB+aLjj7vr9KpdOvH1rYqrcQ+fuJARgcKc/e4/wA/lUuNzOUL6oqwmRP3qcAdv73+cVoxSrNGHU8d/asmJgjncuT0wex/GpIpPs8vmL8yNwcZ/rWvJZaExlY1aKAQwBByDyDRUGwUUUUAFIzBFLNwAMmlqnqEmFWId+T9O3+fahagVyslxIzsCGPIXrx2/CoUUu4VepOBUz/JAoK9eBn884/rVjT4sKZT34FXeyLvYswxCGMIPxPqac67lwDhux9DS0VBBCr+UNr5Lnkhe/qQKmpGRWIJHzDoe4pkTNgiUBX6kA5H4UASUUAgjI5FFABUMTN5soKcb+uf9kVNUUYbzZTnjf0x/sigCWiiigAopGYKpZiAB1Jph3swdSNuOFPc+uaAEwJwrZdQDkDlT+IqQA7RuOSB1xS0UAU7+3DKZkAyPve49aqIVdcOBkA89Pp+ta9ZU8f2a54GV6j6VcX0MprqWLCXaTA55HK/5/WrtZLsqSCSNvmHP1+v+T71qqwdAw6EZFKSKg9LC0UUVJYVmyOXu3fIGw4AJA6ccdvetGR9kbORnaCay4yqxEAsSOSueD+HeqiNDSN8oRcDJxkCtZVCKFHQDArOsV3XO45+UE5960qJAwoooqRBTZI1k27uqncpHY06igCON3MhDjbjjGOvuKkBBGQcg02RBIuMleQQV6imI5EnlBQAo54wD7igCWoogPNlO4k7/X/ZFS1DGVEsgxyX/wDZRQBNR0oqLKzqMhlIOQDkHg9SPSgBfmdmV4x5Z4HfIx3FPVdoxkn3NKM4GeTRQAUUUUAFVr+PfBuA5Q56dv8AP8qs0jKHQq3QjBprQTV1YyogWQBApbd0I6/j+dXNPcNAV/ungd8f5zVGFT5uwr8/ToDg/jVmyJW6kQDAIzj054/nVy2Mobl+iiiszYhu32Wzn8PzOKyq1L0ZtX/D+YrM2mtIp2DnjHdl7TlIWRs8Egfl/wDrq5VSwJELjaT839BU5eQRBhCS/Hy7h/Ooe4XvqiSimM7h1AiJU5ycjil3NuI8s4xwcikA6io1eQq5MJBBO0bh8w7Uu99inyjuOMrkcetAD6bIhdCAdrfwt6H1pC7h1AjJU5y2RxQHcuwMZCjGDkc0ANiZUbyeA4G7A7j1FEbYadnwqh+pPbaOaXl1+dCpBODkce9U7OeeWWVZ4MAnOAMc8Dv17UAXOXKurApjgdj6HNSAAEkAZPU1GHYM37lgOucjn9aPMk2k+Q2RnAyOf1oAkoqPzJNoPkNk4yMjj9aDI+4AQsQepyOP1oAkoqMSOWYGFgB0ORz+tHmPsJ8lt3OBkc/rQBJRUbSOAuIWOTzyOP1pd7bseU2Mdcj/ABoAzJ18u8cZ/izyM9ef61LACLuJg2Q2c5PJ4PuaZcKzXUjAYwRwfoKfbBzdIzY4yOBj1queO1zPkle9jRoooqTQgvQTasB1yD+orPCsxwFJrVlBaFwv3ipA+tZ0fMTDv9cYHX8a1pvQ56qu0WLIK8EiHuefxFWPJTyvLx8tVLBgJXGOWGc/T/8AXV6on8RrTd4oQjJB9DmlwN2cc9KKKksRVC7sZ5OTk0FAY9hHy4xS0UAIyhsZ7HNB2qS7EAAck9hS0zlyyugKHgd8+uRQAmH3gqBs/u4xznrn+lC7pNwdCmG+U5z+NSAYpqhsncwIzxgY4oAZGxXmUASY52ngj1GakVQq7R70jxJIVLD5l5U9xTEkYFvN+XGePUDuP8KAJCoIAI4GDS45zQCGAIIIPIIooAQKAxIzk9eaNoKlexznmlooAb5a7VXHCYx+FLtGc96WigCjOP37n1I/kKIDidB6kj9DTCQzFgchiSPxqW1AM3I6AkH/AD9a5VrM6HpAuUUUV1HOFZoUpK8QyADwAeeOnNaVUr1CkiyDvwfr/n+VXB62Mqq0uRI3k3KkjAzzzjr6/wCe1aVZj5IClixOCFUcDNXraXzYQT94cGnUXUVJ7olooorM2Ciio/8AXBWUsMHIBBGeo5HpQAYEuVdCAGyAT1xyDxUlFFABUUaqJGIkLHceC2cdOKlqOMx7mCLg7jn5cc8Z+v1oAkpskaygAkjByCDjBp1FAEaSEyMjKQV74wD7ipAQRkcimyp5iFQxU9mHUUyN9riHADAZOOOPUUAS0UUUAFMnbZCxGc4wMU+qty2+UR9l9u/+f51MnZFRV2QbTjODj1qzZrw7c8nGMf59ahlI6YJPQcZP+fwq5EnlxqvcdfrWVOPvXNJy0HUUUVuYhTJo/NiKd+x96fRQG5mxE8occZznn9O9LDL5M5PG08HA/Wpb2E581Rn+9/jVOuhWkjkleDNigkKpZiABySe1U7S4CgROcf3Sf5VYLMGJOPLwMeuf84rBqzsdMZKSugJZyrxsChHT1z3qSkChc47nNLSKCiiigAqNGkLsGj2gEgHOcjjBqSmIHDNucMMnHGMD0oAfRRRQAU2Rd6kA4bsfQ06igCGM+XiNuXJzx39SKmprIrYJHzDo3cVGj7AWnwsgHODkEe350APlk8uMt1PQCqapkFieucn3olk819xGMcAelGS5VRjceAfWueUuZ2N4x5VcliXzpyx5Veef0/xq1TY0EaBR+J9TTq2irIxk7sKKKKoQUUUUABAIIIyD1BrOubfyTlc7D0z2rRpGUMpVhkGqjLlZM4KSszJC56jj0q5b3QVdsrdOjH+tR3EBi+Ycoe/pQNrQlR29T9Oahybd2dMYQUEol+iqCSyW5xkMvpn+XpVuOeOTgHB9D1ouZyg0SUUUUyAqOPZvba247jn5s4PHH/1qkqOLbufbGVO45O3GTxzQBJRRRQAUUEgDJOAKhe4HKxDc3r2/+vQBK7qgyxx2qjMxmbLEgD7oHb3+tDlmO5iT/SkAyQB1PSrUe5NyMMQdrfe9u/0q/bxbF3MBvP6e1Ngt9h3vgt2H93/69T1iqcYu6NHNtWYUUUVZIUUUUAFFFFABRRRQAEZGD0qrLakEvCcH0zj8qtUUDUmtjPEpXKsMEe35f0oaNXGVI249OP8APerzxpIMOoNVms2HMb/99VNjaNRegxHmjYAPkZ78jp+dPW8YBd8YPqQcfpUZE6cFDzk8DPt2oWVGG49ARxwc/wCeKBuMWTG9QHGyQ+/H+NL9rTBIRz9Mf41UYghcdhzxSp92qjqyKkFFXRa+1grkIwPo2KY1y56ALxz35qKgckgckckDk1dkYXZIVZ2G5ix689KPkXsSaVYpW7bRjqTjipUtkH3zvP6flRdBYhUNMMAcZHJ6d8//AKqsRQrGPVu7VJRUtjsFFFFIYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUjIrjDqGHoRmiigBvkxYx5a/lQIYx0QUUUBcPKj3BvLTI77RT6KKACiiigAooooAKKKKACiiigAooooA//Z",
          description: "Plugin in support of the My Balance Indicator (MBI) framework",
          uses: ["createNote", "getLocation", "selectTrackables", "getTrackableUsage", "searchNotes"],
          version: "1.0",
          addToCaptureMenu: true,
          addToMoreMenu: true,
          addToWidgets: true,
        })
    } */
    	onMount(async () => {
    		loadInitParams();

    		setTimeout(
    			() => {
    				startCalculation();
    			},
    			1000
    		);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function theme_1_theme_binding(value) {
    		theme = value;
    		$$invalidate(2, theme);
    	}

    	function main_mbis_binding(value) {
    		mbis = value;
    		$$invalidate(6, mbis);
    	}

    	const mbisettings_handler = e => {
    		showMBISettings(e);
    	};

    	const savembis_handler = () => {
    		saveMBIs();
    	};

    	function mbisettings_mbi2edit_binding(value) {
    		if ($$self.$$.not_equal(mbis[currentmbiindex], value)) {
    			mbis[currentmbiindex] = value;
    			$$invalidate(6, mbis);
    		}
    	}

    	const exitedit_handler = () => {
    		exitEdit();
    	};

    	const saveedit_handler = () => {
    		saveEdit();
    	};

    	function mbiwidget_mbis_binding(value) {
    		mbis = value;
    		$$invalidate(6, mbis);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		LibLoader: LibLoadder,
    		Header,
    		HeaderUtilities,
    		HeaderGlobalAction,
    		SkipToContent,
    		Theme,
    		Button,
    		Main,
    		Info,
    		Settings,
    		MBISettings: Mbisettings,
    		SettingsAdjust,
    		Sun,
    		Information,
    		MBIWidget: Widget,
    		pluginname,
    		pluginemoji,
    		parent,
    		PlugiAapiUrl,
    		plugin,
    		inNomie,
    		isSideNavOpen,
    		theme,
    		mode,
    		loading,
    		view,
    		mbisinit,
    		mbis,
    		currentmbiindex,
    		loadInitParams,
    		toggleTheme,
    		getParentUrl,
    		showMain,
    		showInformation,
    		showSettings,
    		showMBISettings,
    		saveSettings,
    		saveEdit,
    		exitEdit,
    		saveMBIs,
    		startCalculation,
    		getStatsValue,
    		onLoaded
    	});

    	$$self.$inject_state = $$props => {
    		if ('parent' in $$props) $$invalidate(0, parent = $$props.parent);
    		if ('PlugiAapiUrl' in $$props) $$invalidate(8, PlugiAapiUrl = $$props.PlugiAapiUrl);
    		if ('inNomie' in $$props) $$invalidate(1, inNomie = $$props.inNomie);
    		if ('isSideNavOpen' in $$props) isSideNavOpen = $$props.isSideNavOpen;
    		if ('theme' in $$props) $$invalidate(2, theme = $$props.theme);
    		if ('mode' in $$props) $$invalidate(3, mode = $$props.mode);
    		if ('loading' in $$props) $$invalidate(4, loading = $$props.loading);
    		if ('view' in $$props) $$invalidate(5, view = $$props.view);
    		if ('mbis' in $$props) $$invalidate(6, mbis = $$props.mbis);
    		if ('currentmbiindex' in $$props) $$invalidate(7, currentmbiindex = $$props.currentmbiindex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		parent,
    		inNomie,
    		theme,
    		mode,
    		loading,
    		view,
    		mbis,
    		currentmbiindex,
    		PlugiAapiUrl,
    		plugin,
    		toggleTheme,
    		showMain,
    		showInformation,
    		showSettings,
    		showMBISettings,
    		saveSettings,
    		saveEdit,
    		exitEdit,
    		saveMBIs,
    		theme_1_theme_binding,
    		main_mbis_binding,
    		mbisettings_handler,
    		savembis_handler,
    		mbisettings_mbi2edit_binding,
    		exitedit_handler,
    		saveedit_handler,
    		mbiwidget_mbis_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
