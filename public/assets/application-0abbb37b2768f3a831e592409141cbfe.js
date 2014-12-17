/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
function getTrafficRating(){
	
	/*Adjustable Variables*/
	// var distanceCoefficients = [];				//Array of distance coefficients
	// var categoryPriceCompetition = [0,9,2,0];	//Competition with the same category and price
	// var priceCompetition = [0,6,1,0];			//Competition with the same price range but different category
	// var categoryCompetition = [0,0,0,0];		//Competition with the same category but different price range
	// var complementaryEstabishment = [0,-3,1,0]; //Establishments with a different category and price rage

	/*Program Variables*/
	var latitude = document.getElementById('lat').value;
	var longitude = document.getElementById('lng').value;
	var output = 0;

	// /*Nameing Variables Do Not Change*/
	// var samePriceAndCategory = 0;
	// var samePriceOnly = 1;
	// var sameCategoryOnly = 2;
	// var differentPriceAndCategory = 3;
	// var lati = 0;
	// var lngi = 1;
	// var pricei = 2;
	// var cati = 3;

	/*Temporary*/
	// var restaurant = 0;
	// var coffeeShop = 1;
	// var est = [];
	// est.push([34.025787,-118.483277,2,'$']);
	// est.push([34.023690,-118.492328,2,'$']);
	// est.push([34.028597,-118.486277,2,0]);
	// est.push([34.029111,-118.486358,1,0]);
	// est.push([34.020216,-118.496283,2,0]);
	// est.push([34.023857,-118.492100,2,0]);
	// est.push([34.016630,-118.491290,2,0]);
	// est.push([34.016828,-118.494929,1,1]);
	// est.push([34.023823,-118.483193,1,1]);
	// est.push([34.032964,-118.480940,1,1]);

	// distanceCoefficients.push(
	// 	categoryPriceCompetition,
	// 	priceCompetition,
	// 	categoryCompetition,
	// 	complementaryEstabishment);

	// rate = function(lat,lng,cost,category){
		// var latitude = lat;
		// var longitude = lng;
		var rating = 0;
		var distance = 0;
	//	var competitionType = 0;
		var trafficData = findRoutes(latitude,longitude);
		var trafficRating = 0;

		var trafficDistance = 0;
		var trafficVolume = 3;

		for(var i = 0; i < trafficData.length; i++){
			if(trafficData[i][trafficDistance] < 10){
				trafficRating+=(trafficData[i][3]*(trafficData.length-i))/((1+trafficData[i][0])*100000);
			}
		}
		// for(var i = 0; i < est.length; i++){
		// 	distance = Math.sqrt(Math.pow(est[i][lati]-latitude,2)+Math.pow(est[i][lngi]-longitude,2));
		// 	if(est[i][pricei] == cost && est[i][cati] == category){
		// 		competitionType = samePriceAndCategory;
		// 	}else if(est[i][pricei] == cost){
		// 		competitionType = samePriceOnly;
		// 	}else if(est[i][cati] == category){
		// 		competitionType = sameCategoryOnly;
		// 	}else{
		// 		competitionType = differentPriceAndCategory;
		// 	}
		// 	rating -= distanceCoefficients[competitionType][0]
		// 	rating -= distanceCoefficients[competitionType][1]*Math.pow(distance,(-1));
		// 	rating -= distanceCoefficients[competitionType][2]*Math.pow(distance,(-2));
		// 	rating -= distanceCoefficients[competitionType][3]*Math.pow(distance,(-3));
		// }
		rating = rating/10000;
		return trafficRating;
	// };
	// output = (rate(latitude,longitude,0,0));
	// localStorage.setItem('rating', output.toString());
}

function getCompetitionRating(){
	/*Program Variables*/
	var data = document.getElementById('factual-data').innerHTML.toString().split('|');
	var latitude = localStorage.latitude;
	var longitude = localStorage.longitude;
	var cost = localStorage.cost;
	var category = localStorage.category;

	var distance = 0;
	var competitionType = [0,1];
	var positiveRating = 0;
	var negativeRating = 0;

	for(var i = 0; i < data.length-6; i+=6){
		competitionType = [0,1]
		distance = Math.sqrt(Math.pow(data[i+1]-latitude,2)+Math.pow(data[i+2]-longitude,2))*500;
		competitionType[0] = Math.abs(cost.length-data[i+3][9]);
		if(data[i+5].toString().toLowerCase().indexOf(category.toString().toLowerCase()) >= 0){
			competitionType[1] = 0
		}
//		alert(distance);
	}
	if(competitionType[0] == 0 && competitionType[1] == 0){
		
	}
}

function getRating(){
	var storeTrafficRating = getTrafficRating();
	var storeLatitude = document.getElementById('lat').value;
	var storeLongitude = document.getElementById('lng').value;
	var storeCost = document.getElementById('restaurant_price').value;
	var storeCategory = document.getElementById('restaurant_category').value;

	localStorage.trafficRating = storeTrafficRating.toString();
	localStorage.latitude = storeLatitude.toString();
	localStorage.longitude = storeLongitude.toString();
	localStorage.cost = storeCost.toString();
	localStorage.category = storeCategory.toString();
}
;
(function() {


}).call(this);
var data = [33.46416,-117.67891,38700,
33.53176,-117.77487,36800,
33.54274,-117.78531,38500,
33.54384,-117.78834,37400,
33.55674,-117.81651,35500,
33.61626,-117.90088,54600,
33.61626,-117.90711,48500,
33.62121,-117.92934,49200,
33.62295,-117.93924,49000,
33.63062,-117.95657,38500,
33.63526,-117.9641,39000,
33.64857,-117.98825,38000,
33.66824,-118.01732,37000,
33.71161,-118.06301,44300,
33.74084,-118.0955,46000,
33.75096,-118.10598,41500,
33.75096,-118.10598,43000,
33.77406,-118.12101,27000,
33.77533,-118.12276,35500,
33.78269,-118.13266,29500,
33.78985,-118.16767,38000,
33.78986,-118.18928,35500,
33.78989,-118.20788,40000,
33.78986,-118.22464,34000,
33.79129,-118.24077,36800,
33.79115,-118.26332,44000,
33.79058,-118.28215,55000,
33.79099,-118.29174,53000,
33.78988,-118.2976,48500,
33.78947,-118.30753,61000,
33.79208,-118.33314,43500,
33.80507,-118.35112,42500,
33.81862,-118.38352,27500,
33.83833,-118.38542,41500,
33.86259,-118.3924,52500,
33.8648,-118.39303,47000,
33.87283,-118.39552,47500,
33.88737,-118.39596,59000,
33.9018,-118.39617,67000,
33.91637,-118.39597,56000,
33.93149,-118.39611,110000,
33.94456,-118.39619,80500,
33.95166,-118.39627,37000,
33.9598,-118.41927,56000,
33.9721,-118.43034,58000,
33.97599,-118.43302,60000,
33.98469,-118.44272,65000,
33.99044,-118.44784,47500,
33.99406,-118.45275,41500,
34.01482,-118.48587,61500,
34.01139,-118.4949,71000,
34.02026,-118.50667,79000,
34.02824,-118.5194,80000,
34.03853,-118.55566,60000,
34.04009,-118.57932,43500,
34.03692,-118.63603,41000,
34.03438,-118.68512,43000,
34.0352,-118.69709,36500,
34.03473,-118.70336,34500,
34.02151,-118.80258,29500,
34.03106,-118.84354,16700,
34.03497,-118.85134,16700,
34.04037,-118.88546,12300,
34.04146,-118.89439,11700,
34.04513,-118.93507,11900,
34.04664,-118.94463,11900,
34.04664,-118.94463,11900,
34.11233,-119.08175,11000,
34.11682,-119.08535,10000,
34.1333,-119.09853,13000,
34.14678,-119.11147,13500,
34.15388,-119.12269,13500,
34.1663,-119.14238,17800,
34.16549,-119.14401,14700,
34.17259,-119.15646,12000,
34.17537,-119.15995,18000,
34.18026,-119.1655,18000,
34.19001,-119.17746,30000,
34.19766,-119.1774,34000,
34.21906,-119.17711,42000,
34.22651,-119.1774,31000,
34.23988,-119.18094,4400,
34.34323,-119.41669,630,
34.35096,-119.4261,630,
34.50918,-120.22588,6600,
34.58941,-120.40835,7100,
34.64131,-120.43589,13000,
34.63897,-120.4579,11800,
34.6673,-120.45767,26800,
34.67835,-120.45591,18900,
34.71316,-120.48913,13100,
34.75086,-120.52054,14300,
34.80108,-120.44291,16400,
34.85419,-120.45298,2400,
34.86398,-120.45693,2820,
34.88186,-120.49813,2050,
34.95756,-120.57406,5800,
34.97455,-120.57109,4400,
34.97751,-120.57083,4600,
34.97751,-120.57083,5200,
34.99619,-120.57057,5500,
35.04744,-120.59153,6800,
35.09687,-120.58149,3200,
35.0982,-120.59113,8800,
35.10711,-120.62325,7600,
35.12199,-120.62981,9000,
35.13712,-120.63804,10100,
35.28758,-120.66149,11200,
35.28664,-120.66354,28100,
35.29406,-120.66789,24900,
35.29924,-120.67464,25900,
35.31897,-120.69551,19900,
35.32106,-120.71659,21900,
35.33323,-120.7427,18100,
35.36421,-120.82333,24600,
35.36723,-120.83946,20600,
35.37348,-120.85135,23600,
35.37995,-120.85555,19000,
35.39379,-120.86056,15000,
35.40412,-120.86766,14500,
35.45312,-120.90315,6500,
35.52716,-121.04478,8800,
35.53735,-121.0537,9250,
35.55131,-121.07162,8600,
35.61556,-121.14705,4000,
35.63405,-121.16379,3500,
35.65104,-121.20282,3100,
35.76442,-121.31944,2700,
35.7952,-121.34528,2500,
35.7952,-121.34528,2300,
36.15346,-121.66573,2800,
36.25,-121.78616,4300,
36.41676,-121.91398,4900,
36.48806,-121.93772,8100,
36.52297,-121.92649,14200,
36.5394,-121.91023,14000,
36.54342,-121.90839,33900,
36.55597,-121.91114,42000,
36.57471,-121.91233,52000,
36.58024,-121.90405,52000,
36.58043,-121.90375,50000,
36.59134,-121.88054,77000,
36.59512,-121.86846,58000,
36.6043,-121.86112,72000,
36.61019,-121.85788,71000,
36.62408,-121.84206,83000,
36.64752,-121.81543,79000,
36.66947,-121.81301,64900,
36.6778,-121.80766,43700,
36.6966,-121.80495,42000,
36.72522,-121.78958,45000,
36.73142,-121.78339,45000,
36.74579,-121.77134,47000,
36.75301,-121.76607,17700,
36.7708,-121.7654,31000,
36.78039,-121.77777,31000,
36.80407,-121.78379,37000,
36.85381,-121.77109,34800,
36.8698,-121.77003,35000,
36.8838,-121.77238,35000,
36.8838,-121.77238,36000,
36.89431,-121.7742,39000,
36.91441,-121.7869,30000,
36.91969,-121.7903,53000,
36.92456,-121.79698,60000,
36.93145,-121.81048,59000,
36.94966,-121.85109,59000,
36.96049,-121.8624,66000,
36.97035,-121.87317,76000,
36.97503,-121.88633,80000,
36.97799,-121.91041,84000,
36.98397,-121.93685,89000,
36.98323,-121.95683,98000,
36.98276,-121.96448,89000,
36.98709,-121.9863,95000,
36.98828,-122.00337,86000,
36.98904,-122.01792,84000,
36.98948,-122.02098,59000,
36.98441,-122.02976,46000,
36.97577,-122.03304,54000,
36.96667,-122.04025,26000,
36.96056,-122.04939,15400,
36.96162,-122.0661,12000,
37.001,-122.18047,8800,
37.02848,-122.21626,7300,
37.10769,-122.29262,3900,
37.10769,-122.29262,4350,
37.25968,-122.41322,6400,
37.32449,-122.39978,6000,
37.35882,-122.39761,7100,
37.38701,-122.40553,7300,
37.43135,-122.42668,13700,
37.45037,-122.42983,15800,
37.46801,-122.43351,27000,
37.46927,-122.43355,31500,
37.48211,-122.44535,27500,
37.5099,-122.48811,17500,
37.5286,-122.51449,16000,
37.59353,-122.50584,15000,
37.59598,-122.50374,32500,
37.60875,-122.4952,47500,
37.61385,-122.48711,49000,
37.62596,-122.48775,33500,
37.62961,-122.48939,33000,
37.64587,-122.49168,25500,
37.65189,-122.49025,40000,
37.66847,-122.48505,63000,
37.67141,-122.47627,68000,
37.67939,-122.47199,68000,
37.70498,-122.47157,98000,
37.70827,-122.47118,98000,
37.70827,-122.47118,115000,
37.70972,-122.47113,108000,
37.71258,-122.47122,101000,
37.71722,-122.47265,72000,
37.72692,-122.47489,72000,
37.73463,-122.47511,72000,
37.74865,-122.47603,72000,
37.76543,-122.47731,66000,
37.77281,-122.47178,66000,
37.78632,-122.47263,52000,
37.80309,-122.46972,52000,
37.88021,-122.51628,30000,
37.88214,-122.52491,16700,
37.87956,-122.53507,13300,
37.88611,-122.53742,7800,
37.88409,-122.55376,3350,
37.867,-122.57717,3800,
37.89623,-122.63667,3750,
37.93397,-122.69543,2250,
37.93466,-122.69739,2450,
38.0405,-122.78779,2950,
38.06612,-122.8049,4350,
38.07332,-122.8014,2100,
38.16316,-122.8926,1300,
38.24185,-122.90514,1250,
38.24628,-122.90481,1250,
38.27684,-122.89997,1050,
38.31369,-122.89721,1050,
38.31642,-122.8965,4400,
38.32394,-122.92798,3900,
38.33713,-122.97741,6300,
38.33843,-123.0474,4000,
38.43704,-123.1044,2750,
38.45011,-123.11675,2800,
38.51847,-123.24641,1850,
38.6519,-123.39944,1650,
38.75979,-123.51843,2800,
38.75979,-123.51843,2800,
38.77007,-123.53191,2500,
38.80353,-123.58541,1900,
38.90394,-123.69153,1900,
38.91093,-123.69239,2700,
38.91436,-123.70102,2200,
38.91817,-123.70574,2100,
38.95124,-123.69039,1600,
39.13899,-123.72429,1050,
39.19752,-123.74665,3100,
39.26816,-123.78656,6000,
39.29971,-123.79396,6600,
39.30656,-123.79352,5900,
39.31886,-123.79966,12000,
39.3723,-123.81519,10700,
39.38333,-123.81391,11000,
39.41244,-123.80838,18100,
39.42013,-123.8079,20800,
39.43271,-123.80618,18900,
39.4442,-123.80598,17800,
39.457,-123.80605,8000,
39.46318,-123.80573,6400,
39.48791,-123.78731,1350,
39.64142,-123.78456,800,
39.78035,-123.83158,660,
39.86825,-123.71499,610,
39.86815,-123.71358,610,
34.03863,-118.46772,33500,
34.04054,-118.46334,32500,
34.04697,-118.44667,50000,
34.0907,-118.34279,49500,
34.09071,-118.33855,50500,
34.09074,-118.32671,40000,
34.09076,-118.31388,44000,
34.09077,-118.30937,46000,
34.07209,-118.26685,44000,
34.07764,-118.26344,34000,
34.08269,-118.26032,76500,
34.09144,-118.25828,57000,
34.10257,-118.24996,155000,
34.11345,-118.24392,148000,
34.12107,-118.23001,132000,
34.12519,-118.22824,151000,
34.14717,-118.22614,121000,
34.16476,-118.22474,110500,
34.20491,-118.2185,15000,
34.21143,-118.21545,15400,
34.20666,-118.20015,15400,
34.21898,-118.19855,6900,
34.22715,-118.18654,3200,
34.24222,-118.18951,3200,
34.2702,-118.15335,1500,
34.25844,-118.10519,550,
34.32601,-118.0027,500,
34.34637,-117.92101,300,
34.35687,-117.85108,280,
34.37514,-117.72069,500,
34.37893,-117.69068,1800,
34.36616,-117.65264,1700,
34.36616,-117.65264,1550,
34.35817,-117.62475,6500,
34.39081,-117.57626,6500,
40.42016,-123.17511,400,
40.54596,-123.19115,2200,
40.55413,-123.18137,2200,
40.73276,-122.94049,3750,
40.74163,-122.92463,2100,
40.79517,-122.89049,1000,
40.98162,-122.71124,500,
41.08639,-122.707,200,
41.23427,-122.64581,140,
41.27564,-122.6976,140,
41.27564,-122.6976,200,
41.31037,-122.76908,350,
41.30944,-122.80143,370,
41.4613,-122.88818,1300,
41.46275,-122.89531,2250,
41.6015,-122.84629,4150,
41.63277,-122.75273,2800,
41.67513,-122.68436,2800,
41.7033,-122.64529,9500,
41.71624,-122.64009,9400,
41.73083,-122.63581,9200,
41.74028,-122.63328,4250,
41.73959,-122.6279,3400,
41.74158,-122.59973,2200,
41.73539,-122.59306,1900,
41.72458,-122.53021,3250,
41.72484,-122.51558,1050,
38.01507,-122.26932,36500,
38.01384,-122.25553,45000,
38.01498,-122.17765,44000,
37.99066,-122.12997,59000,
37.99527,-122.11982,63000,
37.99184,-122.10067,76000,
37.99113,-122.08659,85000,
37.99457,-122.06983,79000,
38.00091,-122.05345,77000,
38.00588,-122.03628,90000,
38.00963,-122.02303,148000,
38.01373,-121.99746,145000,
38.02269,-121.96444,129000,
38.0189,-121.942,128000,
38.01697,-121.88946,111000,
38.01174,-121.8668,105000,
38.00385,-121.83739,108000,
37.99945,-121.82149,100000,
37.99812,-121.81537,94000,
37.99815,-121.8063,86000,
37.99622,-121.78541,72000,
37.96163,-121.74274,44500,
37.94351,-121.74142,37000,
37.92525,-121.73283,20200,
37.91077,-121.73012,9600,
37.89641,-121.64228,21600,
37.89043,-121.64102,18700,
37.89015,-121.60223,8100,
37.89089,-121.56996,8100,
37.89089,-121.56996,8100,
37.90173,-121.4679,7000,
37.92689,-121.39699,7700,
37.92689,-121.37535,7700,
37.92747,-121.33247,10500,
37.93292,-121.31203,13400,
37.93623,-121.29963,24600,
37.94322,-121.31207,14700,
37.94828,-121.30073,79000,
37.95132,-121.28273,100000,
37.95337,-121.27089,98000,
37.96025,-121.25132,92000,
37.95781,-121.24056,7500,
37.94475,-121.21836,4550,
37.94209,-121.14801,4750,
37.93005,-120.99917,4650,
37.93019,-120.98076,3500,
37.94486,-120.92636,3650,
37.94486,-120.92636,3650,
37.94475,-120.84376,5200,
37.93882,-120.77086,7500,
37.93882,-120.77086,7500,
37.97418,-120.65381,4250,
37.98278,-120.64539,3900,
38.09732,-120.47127,7600,
38.13955,-120.45565,6700,
38.20287,-120.36973,6600,
38.2562,-120.34928,6700,
38.265,-120.3337,3200,
38.27722,-120.30991,2500,
38.30101,-120.2768,1600,
38.32224,-120.25258,1450,
38.42213,-120.08477,990,
38.45555,-120.05358,1150,
38.45555,-120.05358,1150,
38.48253,-120.01961,1200,
38.47811,-120.00375,950,
38.54351,-119.81365,490,
38.66052,-119.72643,560,
32.54439,-117.0327,71000,
32.54952,-117.04064,36000,
32.55147,-117.04555,47500,
32.55857,-117.06233,63000,
32.56493,-117.07306,95000,
32.57649,-117.08244,113000,
32.58358,-117.08722,145000,
32.59491,-117.08876,147000,
32.60608,-117.09007,143000,
32.62227,-117.09314,155000,
32.62772,-117.09524,159000,
32.63336,-117.09745,163000,
32.64159,-117.10077,125000,
32.65092,-117.10412,180000,
32.65992,-117.10795,179000,
32.6698,-117.11138,170000,
32.6752,-117.10957,185000,
32.6828,-117.11123,192000,
32.69287,-117.12175,156000,
32.69499,-117.13365,160000,
32.70128,-117.14284,162000,
32.70934,-117.14763,165000,
32.71367,-117.14766,212000,
32.71907,-117.14785,212000,
32.72404,-117.15527,204000,
32.72309,-117.15911,204000,
32.72317,-117.16351,161000,
32.7268,-117.16734,192000,
32.73096,-117.17098,186000,
32.73428,-117.17391,145000,
32.73711,-117.17646,141000,
32.74247,-117.18244,187000,
32.74744,-117.19292,196000,
32.75853,-117.20367,198000,
32.76993,-117.20665,217000,
32.79062,-117.20714,200000,
32.79903,-117.21079,159000,
32.80667,-117.21576,143000,
32.81211,-117.22004,196000,
32.83792,-117.23475,182000,
32.84964,-117.23514,164000,
32.86819,-117.22949,145000,
32.87208,-117.22916,158000,
32.88711,-117.22787,164000,
32.88711,-117.22787,74000,
32.88711,-117.22787,74000,
32.91166,-117.22856,107000,
32.90094,-117.22441,70000,
32.90094,-117.22441,97000,
32.90094,-117.22441,204000,
32.91801,-117.23453,204000,
32.93245,-117.2412,204000,
32.93328,-117.24126,245000,
32.94994,-117.24369,243000,
32.97998,-117.2531,230000,
32.99588,-117.25652,231000,
33.01167,-117.26621,203000,
33.02671,-117.27504,201000,
33.03622,-117.28141,210000,
33.04842,-117.28713,211000,
33.0651,-117.29228,208000,
33.0842,-117.29812,204000,
33.10348,-117.31048,201000,
33.12216,-117.32215,198000,
33.13431,-117.3293,199000,
33.15216,-117.33643,196000,
33.16323,-117.34232,194000,
33.17085,-117.3466,196000,
33.17706,-117.35137,192000,
33.18013,-117.35394,191000,
33.18478,-117.35781,190000,
33.19026,-117.36241,191000,
33.20455,-117.38309,158000,
33.21041,-117.38723,130000,
33.29877,-117.4646,129000,
33.3855,-117.58312,136000,
33.39528,-117.5929,137000,
33.39639,-117.59365,137000,
33.39639,-117.59365,138500,
33.40987,-117.60057,147000,
33.41835,-117.60485,160000,
33.4271,-117.61062,162000,
33.43105,-117.61448,187000,
33.43892,-117.62239,199500,
33.4589,-117.6561,242000,
33.46705,-117.66985,234100,
33.4734,-117.67474,251300,
33.49155,-117.662,258800,
33.50242,-117.65848,278400,
33.52052,-117.66573,286200,
33.54063,-117.67422,248000,
33.54727,-117.67293,255200,
33.55931,-117.67302,302000,
33.58009,-117.67177,315000,
33.59797,-117.6764,311100,
33.60459,-117.69052,332800,
33.61478,-117.70766,354000,
33.62834,-117.72058,278500,
33.64472,-117.7351,153000,
33.65571,-117.74389,200000,
33.6666,-117.75263,242700,
33.6777,-117.75812,255000,
33.6899,-117.7684,270300,
33.71014,-117.7823,293400,
33.7197,-117.79527,315300,
33.72576,-117.80405,323000,
33.73363,-117.81544,323100,
33.73716,-117.82326,278200,
33.74049,-117.8333,328000,
33.74538,-117.84221,351000,
33.7548,-117.85168,358200,
33.75946,-117.86162,361300,
33.7674,-117.86722,365000,
33.7787,-117.87617,286000,
33.78893,-117.88703,252100,
33.79159,-117.88994,240000,
33.80324,-117.90215,263900,
33.8068,-117.90635,263900,
33.81551,-117.91539,263100,
33.8182,-117.91821,275600,
33.82294,-117.92305,275600,
33.83275,-117.93275,265000,
33.83588,-117.94182,260000,
33.84544,-117.95888,242000,
33.84544,-117.95888,192000,
33.86402,-117.99384,192000,
33.86635,-117.99816,167300,
33.87336,-118.00992,167300,
33.87379,-118.01036,157000,
33.87461,-118.01147,157000,
33.87461,-118.01147,174000,
33.88412,-118.02894,168000,
33.88794,-118.03598,169000,
33.89366,-118.04648,169000,
33.90423,-118.06409,169000,
33.9106,-118.07079,171000,
33.91711,-118.07981,190000,
33.94121,-118.09661,234000,
33.95772,-118.11151,237000,
33.96368,-118.11954,235000,
33.97433,-118.12422,219000,
33.98736,-118.13731,216000,
33.99509,-118.14477,223000,
34.00884,-118.15868,230000,
34.01644,-118.17332,254000,
34.01973,-118.18053,261000,
34.02014,-118.18983,259000,
34.02021,-118.19227,260000,
34.02985,-118.21608,231000,
34.04288,-118.21724,238000,
34.04956,-118.2141,226000,
34.05534,-118.21416,237000,
34.0664,-118.2163,231000,
34.07386,-118.2194,217000,
34.08222,-118.22493,287000,
34.09431,-118.2427,283000,
34.10278,-118.25025,235000,
34.11187,-118.26519,225000,
34.12051,-118.27116,252000,
34.14209,-118.27796,260000,
34.15617,-118.29001,231000,
34.16501,-118.29708,221000,
34.17025,-118.3043,213000,
34.17904,-118.31132,203000,
34.18582,-118.31822,189000,
34.19318,-118.32915,175000,
34.19853,-118.33746,177000,
34.21221,-118.34856,186000,
34.22161,-118.36042,174000,
34.22203,-118.36695,175000,
34.22616,-118.37562,173000,
34.22663,-118.38776,176000,
34.23141,-118.40298,173000,
34.23312,-118.40973,289000,
34.24464,-118.42232,296000,
34.25055,-118.42857,286000,
34.25642,-118.43479,274000,
34.26664,-118.44344,151000,
34.27389,-118.45001,144000,
34.2768,-118.45297,136000,
34.29216,-118.46865,264000,
34.30329,-118.47967,245000,
34.317,-118.49108,272000,
34.317,-118.49108,17800,
34.317,-118.49108,17800,
34.317,-118.49108,17800,
34.317,-118.49108,17800,
34.317,-118.49108,33500,
34.317,-118.49108,33500,
34.33362,-118.50823,193000,
34.36227,-118.55515,192000,
34.37868,-118.56552,180000,
34.39413,-118.57123,169000,
34.40825,-118.57627,148000,
34.42341,-118.58342,134000,
34.43111,-118.58813,124000,
34.44324,-118.60549,109000,
34.45607,-118.616,89000,
34.49007,-118.61947,71000,
34.49588,-118.62381,70000,
34.56971,-118.68787,70000,
34.66644,-118.76294,70000,
34.70786,-118.7961,69000,
34.75865,-118.79597,67000,
34.76233,-118.79734,67000,
34.76723,-118.80022,70000,
34.79507,-118.85243,70000,
34.81754,-118.88203,67000,
34.81783,-118.88169,67000,
34.81783,-118.88169,67000,
34.83573,-118.86344,74000,
34.87686,-118.89472,74000,
34.87686,-118.89472,74000,
34.98621,-118.94523,70000,
34.98621,-118.94523,30500,
35.05934,-118.9992,30500,
35.16168,-119.11084,30000,
35.20907,-119.16286,31500,
35.26712,-119.22461,32000,
35.29338,-119.2525,32500,
35.35503,-119.33612,34000,
35.3989,-119.39738,35000,
35.44227,-119.45675,33500,
35.45544,-119.47489,37500,
35.50033,-119.53519,37000,
35.61622,-119.65323,34000,
35.73206,-119.73943,33500,
35.79008,-119.78272,33500,
35.79008,-119.78272,33500,
35.93462,-119.91202,34500,
35.98176,-119.9604,34500,
36.07453,-120.0983,34500,
36.07453,-120.0983,34500,
36.07648,-120.1015,33000,
36.13773,-120.15881,32500,
36.25437,-120.244,33500,
36.29431,-120.26918,34000,
36.43569,-120.39412,33000,
36.53083,-120.48803,33500,
36.60457,-120.58567,35500,
36.63945,-120.62272,34000,
36.68575,-120.65831,34000,
36.77792,-120.72412,34500,
36.85031,-120.77391,37000,
36.85514,-120.77725,37000,
36.85514,-120.77725,37000,
36.93027,-120.84049,29000,
37.05665,-120.9697,31000,
37.10622,-121.01572,33000,
37.12851,-121.0313,35500,
37.2448,-121.08852,40500,
37.24597,-121.08881,40500,
37.24597,-121.08881,40500,
37.32559,-121.1101,39000,
37.39741,-121.13825,39000,
37.46388,-121.18055,41500,
37.54013,-121.26773,37500,
37.59103,-121.3338,37500,
37.59103,-121.3338,37500,
37.59103,-121.3338,36500,
37.6378,-121.34304,21500,
37.68236,-121.34325,21300,
37.74826,-121.34368,21400,
37.75944,-121.34193,42000,
37.76719,-121.33172,145000,
37.78888,-121.30194,109000,
37.82635,-121.29009,103000,
37.875,-121.27786,107000,
37.88206,-121.27883,105000,
37.89708,-121.2838,108000,
37.92674,-121.29449,138000,
37.93704,-121.29758,139000,
37.94836,-121.30071,137000,
37.95517,-121.31324,122000,
37.9571,-121.32928,99000,
37.96426,-121.33541,112000,
37.97857,-121.34099,117000,
37.98498,-121.34355,112000,
38.0048,-121.35142,104000,
38.02138,-121.35885,82000,
38.05794,-121.37267,79000,
38.11602,-121.3979,53000,
38.18941,-121.4048,48000,
38.22606,-121.43083,51000,
38.25481,-121.44787,54000,
38.25481,-121.44787,54000,
38.2843,-121.45792,50000,
38.37541,-121.47683,52000,
38.40877,-121.48375,66000,
38.42611,-121.48736,91000,
38.48127,-121.51059,101000,
38.49553,-121.51655,114000,
38.51615,-121.52204,137000,
38.5256,-121.52135,140000,
38.54072,-121.51081,142000,
38.5683,-121.51093,178000,
38.57681,-121.50776,174000,
38.58461,-121.50292,186000,
38.59698,-121.50393,189000,
38.6064,-121.50802,187000,
38.61477,-121.51232,159000,
38.625,-121.51719,152000,
38.65587,-121.53313,107000,
38.66741,-121.54014,74000,
38.67123,-121.59102,49000,
38.67325,-121.62635,49000,
38.67325,-121.62635,50000,
38.67333,-121.63598,50000,
38.67378,-121.7286,44000,
38.67728,-121.7456,33000,
38.6847,-121.75113,36000,
38.70251,-121.78326,27500,
38.71865,-121.80042,23800,
38.73539,-121.81845,22300,
38.79429,-121.87936,21100,
38.84791,-121.93985,29000,
38.86128,-121.95366,29500,
38.88171,-121.97387,29500,
38.92548,-122.00015,29500,
38.92548,-122.00015,29500,
39.01325,-122.0554,27500,
39.02417,-122.06265,28500,
39.0569,-122.08611,27500,
39.12879,-122.13275,27000,
39.15684,-122.14407,27000,
39.16671,-122.15,24400,
39.2763,-122.18247,24600,
39.31251,-122.1918,25000,
39.34884,-122.19495,24900,
39.38529,-122.19302,24900,
39.38529,-122.19302,24900,
39.40712,-122.19578,24500,
39.49499,-122.19697,24400,
39.52399,-122.21472,25500,
39.58232,-122.2104,24800,
39.62439,-122.20516,24600,
39.68249,-122.20465,24400,
39.74038,-122.20565,24500,
39.75071,-122.20549,24000,
39.78375,-122.20435,23900,
39.79809,-122.20086,23900,
39.79809,-122.20086,23900,
39.88161,-122.20014,24600,
39.90651,-122.2002,26000,
39.92808,-122.20027,27500,
39.95699,-122.20026,28000,
40.00013,-122.20586,26500,
40.08399,-122.21683,27000,
40.15751,-122.22334,29500,
40.15854,-122.22321,32500,
40.18103,-122.22545,36000,
40.20336,-122.24384,36500,
40.2192,-122.25163,36000,
40.23601,-122.25632,34500,
40.29302,-122.279,34000,
40.32697,-122.28118,34500,
40.36765,-122.28412,40500,
40.37623,-122.28465,40500,
40.37623,-122.28465,40500,
40.38957,-122.28529,43500,
40.40362,-122.28146,49000,
40.43123,-122.28474,39500,
40.43756,-122.28697,48000,
40.45195,-122.29165,39000,
40.45576,-122.29528,47500,
40.46845,-122.30767,47500,
40.50552,-122.33799,50000,
40.53841,-122.351,56000,
40.57095,-122.36043,61000,
40.58537,-122.36051,53000,
40.61228,-122.36325,42000,
40.62278,-122.36654,34000,
40.6286,-122.36834,41500,
40.64152,-122.36491,33500,
40.66351,-122.35547,29000,
40.67922,-122.34845,21000,
40.70581,-122.33711,19300,
40.73094,-122.32007,18600,
40.75151,-122.32008,18000,
40.75151,-122.32008,18000,
40.75151,-122.32008,17100,
40.84783,-122.33851,16800,
40.89253,-122.38327,16100,
40.91063,-122.38565,15900,
40.94067,-122.42721,15800,
40.97469,-122.43259,15800,
40.99864,-122.41516,15600,
41.02047,-122.40031,15600,
41.07185,-122.35811,15700,
41.09546,-122.34553,15700,
41.10783,-122.33136,15700,
41.12299,-122.32581,15700,
41.14849,-122.31592,15900,
41.16267,-122.29747,16100,
41.18187,-122.29084,16400,
41.18398,-122.28923,16400,
41.18398,-122.28923,16400,
41.19341,-122.28454,15800,
41.21813,-122.27468,17300,
41.23553,-122.26952,17800,
41.25755,-122.27082,18100,
41.28484,-122.30177,18400,
41.31012,-122.3201,19300,
41.33173,-122.33203,22100,
41.33173,-122.33203,21000,
41.36829,-122.3703,20700,
41.39635,-122.38012,20600,
41.41898,-122.38403,14100,
41.42324,-122.39642,14900,
41.44178,-122.43501,14000,
41.47289,-122.45266,14200,
41.55232,-122.48531,14200,
41.64609,-122.53537,16100,
41.66786,-122.61042,16600,
41.70371,-122.64294,16500,
41.73095,-122.63299,16000,
41.73959,-122.62783,15300,
41.73959,-122.62783,14600,
41.90101,-122.56617,13900,
41.91965,-122.57434,13800,
41.91965,-122.57434,14000,
41.99273,-122.6097,13800,
42.00547,-122.61548,13800,
37.37408,-118.3955,3550,
37.39997,-118.35244,2100,
37.46279,-118.34956,2100,
37.46279,-118.34956,2100,
37.8183,-118.47699,890,
37.90138,-118.43512,890,
32.67977,-115.3905,15900,
32.68285,-115.38574,8100,
32.68216,-115.38466,4550,
32.67978,-115.38796,2450,
32.68287,-115.38577,6200,
32.68652,-115.38025,8400,
32.69378,-115.37898,6200,
32.7733,-115.38375,3300,
32.77482,-115.38373,3300,
32.75467,-117.23662,11800,
32.75517,-117.23582,45500,
32.75702,-117.22366,101000,
32.7594,-117.20403,129000,
32.76014,-117.19814,183000,
32.75977,-117.18829,188000,
32.76125,-117.16667,197000,
32.76242,-117.16377,203000,
32.7654,-117.15365,217000,
32.7699,-117.13975,192000,
32.77181,-117.13189,234000,
32.7786,-117.11234,206000,
32.77908,-117.10151,227000,
32.78083,-117.08811,214000,
32.7794,-117.06642,187000,
32.77417,-117.04603,180000,
32.77335,-117.03001,165000,
32.77097,-117.02376,182000,
32.77096,-117.02151,187000,
32.7749,-117.0112,178000,
32.77758,-117.0037,220000,
32.77929,-116.99697,218000,
32.78245,-116.98127,171000,
32.79562,-116.97706,166000,
32.80294,-116.97055,148000,
32.80299,-116.96238,116000,
32.80306,-116.951,101000,
32.80306,-116.93576,65000,
32.80307,-116.92809,102000,
32.81165,-116.91729,77000,
32.82648,-116.9035,66000,
32.84186,-116.88598,66000,
32.84447,-116.88191,54000,
32.85693,-116.82044,48000,
32.84,-116.77961,33000,
32.83383,-116.73117,24600,
32.8382,-116.68107,24000,
32.82734,-116.6256,19200,
32.81831,-116.53299,17600,
32.81105,-116.51064,16600,
32.71858,-116.47059,14600,
32.71858,-116.47059,14000,
32.67714,-116.29132,14000,
32.63644,-116.16606,13500,
32.64235,-116.10729,13600,
32.64235,-116.10729,13600,
32.64235,-116.10729,13600,
32.64235,-116.10729,13600,
32.72681,-116.02551,11700,
32.73422,-115.99441,11900,
32.76892,-115.80052,12200,
32.77398,-115.69032,13800,
32.77387,-115.62061,16600,
32.77393,-115.56941,31000,
32.77382,-115.55226,33000,
32.7738,-115.53527,31500,
32.7738,-115.50121,18000,
32.7736,-115.47378,16400,
32.77331,-115.38373,11700,
32.77333,-115.33716,11400,
32.77304,-115.28596,12100,
32.71063,-115.08932,14100,
32.70794,-115.03699,14200,
32.70859,-114.95725,14600,
32.76047,-114.83679,15700,
32.74687,-114.75468,16100,
32.7435,-114.72017,21700,
32.7372,-114.65068,20100,
32.73177,-114.62457,16300,
32.72826,-114.61731,16300,
36.9844,-122.02978,23000,
36.99175,-122.03309,5000,
37.04001,-122.07097,7400,
37.05203,-122.07322,20800,
37.07252,-122.08432,15300,
37.08949,-122.09291,15800,
37.1077,-122.10783,11600,
37.12532,-122.12228,15300,
37.12818,-122.12292,9300,
37.15372,-122.13361,5900,
37.15372,-122.13361,2400,
37.25838,-122.12224,2400,
37.25838,-122.12224,3100,
37.24912,-122.06812,4400,
37.25242,-122.05746,6600,
37.25558,-122.03754,7100,
37.25821,-122.03303,12600,
37.24561,-122.01331,13800,
37.2399,-121.99682,18300,
37.22901,-121.98092,34500,
37.22661,-121.97509,34500,
34.01482,-118.48587,147000,
34.02394,-118.47143,186000,
34.02776,-118.45411,188000,
34.02818,-118.44954,222000,
34.03128,-118.43355,244000,
34.03179,-118.41706,241000,
34.02967,-118.40344,256000,
34.03048,-118.39161,253000,
34.03661,-118.37585,260000,
34.03428,-118.35045,273000,
34.03505,-118.33374,289000,
34.03672,-118.3177,302000,
34.03714,-118.309,315000,
34.03707,-118.3006,316000,
34.03695,-118.29189,324000,
34.03711,-118.28414,217000,
34.03824,-118.27401,255000,
34.03112,-118.25965,251000,
34.02681,-118.2509,278000,
34.02614,-118.23567,285000,
34.03413,-118.2212,210000,
34.03413,-118.2212,6000,
34.03413,-118.2212,8400,
34.03413,-118.2212,9200,
34.03413,-118.2212,24100,
34.03413,-118.2212,20900,
34.03413,-118.2212,680,
34.03413,-118.2212,680,
34.05448,-118.20277,235000,
34.05617,-118.18315,224000,
34.0612,-118.16514,209000,
34.06841,-118.15113,211000,
34.07148,-118.13457,214000,
34.07163,-118.12308,219000,
34.07182,-118.10833,227000,
34.07193,-118.09968,229000,
34.07201,-118.09079,225000,
34.07211,-118.08203,223000,
34.07223,-118.07301,212000,
34.07251,-118.05392,212000,
34.06879,-118.04233,206000,
34.06805,-118.02729,200000,
34.0642,-118.00997,220000,
34.06508,-118.00015,230000,
34.06596,-117.99345,213000,
34.06755,-117.98179,207000,
34.06852,-117.97422,191000,
34.0701,-117.96227,197000,
34.07214,-117.94314,205000,
34.0723,-117.9267,215000,
34.07213,-117.90756,218000,
34.07198,-117.89047,214000,
34.0719,-117.88127,213000,
34.07179,-117.87253,199000,
34.07043,-117.8648,200000,
34.06885,-117.8397,198000,
34.06523,-117.80655,240000,
34.07281,-117.78735,234000,
34.07288,-117.77835,240000,
34.07116,-117.75962,229000,
34.07381,-117.75239,238000,
34.07816,-117.74177,237000,
34.08175,-117.71942,239000,
34.08186,-117.71032,239000,
34.08186,-117.71032,234000,
34.08207,-117.69864,246000,
34.08539,-117.68985,253000,
34.08728,-117.67042,253000,
34.08735,-117.6511,244000,
34.07773,-117.62352,242000,
34.07064,-117.61116,240000,
34.06764,-117.59336,254000,
34.06753,-117.5759,253000,
34.06747,-117.55818,252000,
34.06742,-117.54493,248000,
34.06755,-117.52408,212000,
34.06613,-117.48884,207000,
34.06692,-117.45376,206000,
34.06737,-117.43568,199000,
34.06851,-117.39611,194000,
34.06888,-117.37028,195000,
34.06903,-117.353,196000,
34.06746,-117.33581,198000,
34.06605,-117.32461,202000,
34.06493,-117.31369,198000,
34.06426,-117.2965,228000,
34.06425,-117.27899,203000,
34.06444,-117.26146,196000,
34.0666,-117.24393,192000,
34.06662,-117.22642,189000,
34.06661,-117.20897,174000,
34.06181,-117.18285,146000,
34.06179,-117.18094,155000,
34.05684,-117.16743,132000,
34.05487,-117.16396,137000,
34.04176,-117.15552,126000,
34.03958,-117.15393,136000,
34.03322,-117.13883,137000,
34.02679,-117.11934,111000,
34.01672,-117.09601,103000,
34.00399,-117.06504,103000,
34.00399,-117.06504,103000,
34.00372,-117.06489,96000,
33.99284,-117.05826,99000,
33.97903,-117.05015,100000,
33.9682,-117.03579,92000,
33.94493,-117.00297,89000,
33.9333,-116.99009,123000,
33.92701,-116.97715,125000,
33.92732,-116.96619,131000,
33.92694,-116.94701,126000,
33.92462,-116.91192,123000,
33.92434,-116.901,121000,
33.92429,-116.88555,121000,
33.92429,-116.8682,109000,
33.92648,-116.85244,112000,
33.93105,-116.82193,104000,
33.92141,-116.80665,92000,
33.91878,-116.77697,91000,
33.92381,-116.68944,92000,
33.92256,-116.67834,80000,
33.92354,-116.64476,80000,
33.91434,-116.60384,78000,
33.9047,-116.54538,80000,
33.87963,-116.50377,86000,
33.84936,-116.45837,92000,
33.81634,-116.40402,94000,
33.80627,-116.38788,95000,
33.78564,-116.35402,92000,
33.76033,-116.30103,82000,
33.75008,-116.27131,67000,
33.7395,-116.23391,61000,
33.73806,-116.21711,56000,
33.72606,-116.20147,52000,
33.71654,-116.19048,25000,
33.71506,-116.17321,23000,
33.66023,-115.80217,23000,
33.66007,-115.72366,23500,
33.66824,-115.65423,23500,
33.70205,-115.45251,23500,
33.71051,-115.40043,22000,
33.68246,-115.24349,22000,
33.60748,-114.98998,22000,
33.60785,-114.90158,23500,
33.60936,-114.72723,23000,
33.60664,-114.65772,25000,
33.60705,-114.60571,24000,
33.60716,-114.5883,25000,
33.60744,-114.57073,26000,
33.60635,-114.53755,26000,
33.60623,-114.53702,27000,
33.6047,-114.53076,25500,
38.4021,-122.82419,24700,
38.40292,-122.81899,23200,
38.42757,-122.76918,40500,
38.43058,-122.74178,66000,
38.43299,-122.72651,77000,
38.43116,-122.71541,74000,
38.4326,-122.70509,52000,
38.43394,-122.69713,62000,
38.4356,-122.68932,45500,
38.45486,-122.68039,37500,
38.46397,-122.66435,33500,
38.46489,-122.65307,28000,
38.45823,-122.63452,20800,
38.42412,-122.556,17500,
38.41403,-122.54586,15900,
38.37919,-122.51421,15500,
38.3714,-122.516,14500,
38.3439,-122.49779,12300,
38.3374,-122.493,13700,
38.32573,-122.48828,15900,
38.31384,-122.48151,23300,
38.30269,-122.47608,22500,
38.29367,-122.47584,24900,
38.29291,-122.46791,17400,
38.29203,-122.459,15500,
38.29023,-122.45812,10200,
38.28489,-122.45893,12100,
38.27579,-122.46033,8700,
38.2654,-122.46195,6200,
38.2421,-122.44927,5600,
38.22316,-122.25788,23900,
38.2226,-122.25331,33500,
38.20966,-122.20404,31500,
38.20966,-122.20404,31500,
38.23965,-122.0924,30000,
38.24033,-122.06636,35000,
38.24124,-122.05056,40500,
38.24456,-122.03143,35000,
38.24362,-122.02033,30000,
38.24292,-121.99479,14000,
38.22849,-121.96918,11700,
38.1836,-121.80619,13900,
38.16225,-121.69891,19000,
38.16053,-121.68737,20000,
38.15957,-121.68526,21000,
38.15957,-121.68526,21000,
38.15507,-121.67615,17100,
38.12976,-121.58883,17500,
38.12575,-121.57961,17500,
38.12575,-121.57961,18200,
38.11541,-121.48522,16300,
38.11609,-121.42246,16800,
38.11603,-121.39797,15000,
38.11602,-121.39554,12200,
38.11552,-121.30652,23500,
38.11545,-121.28805,23100,
38.11543,-121.27898,23900,
38.11612,-121.26485,18800,
38.11633,-121.2603,18700,
38.11628,-121.25786,10300,
38.13762,-121.2525,10300,
38.13794,-121.20588,8700,
38.13838,-121.1644,6200,
38.20479,-120.98708,6200,
38.20479,-120.98708,6000,
38.19748,-120.98048,5500,
38.18354,-120.89041,6100,
38.18948,-120.83061,6200,
38.19156,-120.82902,8900,
38.19346,-120.8211,7100,
38.21188,-120.76438,5000,
38.20485,-120.69736,6000,
37.7839,-122.17794,50000,
37.79394,-122.18189,41000,
37.79854,-122.18527,53000,
37.81062,-122.19768,57000,
37.82189,-122.20745,58000,
37.83281,-122.21701,69000,
37.84144,-122.22462,72000,
37.84879,-122.2283,18600,
37.85811,-122.24411,23200,
37.85804,-122.24579,16000,
37.8562,-122.25968,19000,
37.85437,-122.27045,19400,
37.85217,-122.28665,31000,
37.85217,-122.28665,31200,
34.3339,-118.50799,160000,
34.36492,-118.50363,145000,
34.3775,-118.49376,137000,
34.39242,-118.47273,142000,
34.40171,-118.45643,109000,
34.42521,-118.42362,99000,
34.43366,-118.38608,95000,
34.4666,-118.32999,93000,
34.49207,-118.28361,92000,
34.50065,-118.22817,93000,
34.49166,-118.1985,92000,
34.48883,-118.16302,92000,
34.4872,-118.14031,93000,
34.51052,-118.11137,69000,
34.55769,-118.13245,79000,
34.58143,-118.13377,85000,
34.60538,-118.14753,86000,
34.63109,-118.15316,91000,
34.64571,-118.15324,87000,
34.66051,-118.15335,72000,
34.67468,-118.15746,57000,
34.68197,-118.16425,40500,
34.68871,-118.1694,46500,
34.70385,-118.17005,38500,
34.71871,-118.17018,37000,
34.73321,-118.1703,36500,
34.74776,-118.17039,35500,
34.77692,-118.17065,29500,
34.82048,-118.17044,29500,
34.82048,-118.17044,29500,
34.86427,-118.17175,15900,
34.99544,-118.15967,15900,
35.06646,-118.17821,16900,
35.10043,-118.14316,9600,
35.12543,-118.12382,5900,
35.30162,-117.99886,4500,
35.60161,-117.90302,5100,
35.63931,-117.88365,2750,
35.69453,-117.86761,2750,
35.69453,-117.86761,98000,
32.70105,-117.12067,109000,
32.71141,-117.11899,119000,
32.71684,-117.11784,113000,
32.73243,-117.1117,160000,
32.74996,-117.10878,158000,
32.75534,-117.10878,156000,
32.76324,-117.10933,165000,
32.77903,-117.11247,200000,
32.78851,-117.11394,207000,
32.81039,-117.11414,182000,
32.82288,-117.11651,169000,
32.83375,-117.11904,151000,
32.84192,-117.12063,178000,
32.86187,-117.11134,172000,
32.86348,-117.11051,292000,
32.88056,-117.10852,289000,
32.89299,-117.11508,272000,
32.90343,-117.11643,258000,
32.91696,-117.11611,249000,
32.93669,-117.11131,236000,
32.94829,-117.10568,207000,
32.96468,-117.09536,229000,
32.97873,-117.08652,218000,
32.99776,-117.08327,213000,
33.01211,-117.07997,204000,
33.02296,-117.07889,196000,
33.05585,-117.07145,202000,
33.06923,-117.06939,194000,
33.07948,-117.07163,206000,
33.09253,-117.08265,216000,
33.10833,-117.09484,202000,
33.11535,-117.09896,217000,
33.1275,-117.10485,131000,
33.14673,-117.10447,115000,
33.16225,-117.1057,121000,
33.19729,-117.12573,122000,
33.25279,-117.15585,115000,
33.28645,-117.14955,117000,
33.33116,-117.15929,126000,
33.38718,-117.17467,134000,
33.43053,-117.14559,133000,
33.43254,-117.14349,133000,
33.43254,-117.14349,133000,
33.48086,-117.14079,151000,
33.50085,-117.15138,161000,
33.52255,-117.16299,180000,
33.54904,-117.18158,106000,
33.55478,-117.1921,124000,
33.56548,-117.20698,122000,
33.5958,-117.24496,121000,
33.61232,-117.26006,116000,
33.6266,-117.27263,111000,
33.66229,-117.29869,119000,
33.67733,-117.32363,116000,
33.69237,-117.33784,110000,
33.7071,-117.35785,112000,
33.73004,-117.39353,117000,
33.74868,-117.45236,123000,
33.77821,-117.48816,134000,
33.80696,-117.50739,148000,
33.82121,-117.51846,158000,
33.83205,-117.52968,163000,
33.84384,-117.53493,164000,
33.86585,-117.54221,182000,
33.88216,-117.54738,156000,
33.8987,-117.55986,155000,
33.90976,-117.55862,149000,
33.93785,-117.55597,149000,
33.97522,-117.54886,147000,
34.02193,-117.55028,215000,
34.03347,-117.55021,215000,
34.03347,-117.55021,215000,
34.04841,-117.54989,215000,
34.06756,-117.54487,198000,
34.07725,-117.5448,187000,
34.1064,-117.53206,164000,
34.11311,-117.52397,164000,
34.12198,-117.51328,145000,
34.13882,-117.49295,134000,
34.15109,-117.47816,122000,
34.1816,-117.43685,122000,
34.21499,-117.41162,122000,
34.22515,-117.40964,152000,
34.23666,-117.4251,152000,
34.29891,-117.45767,152000,
34.31179,-117.47482,132000,
34.36226,-117.43333,124000,
34.40001,-117.40122,101000,
34.40625,-117.39637,104000,
34.42672,-117.3804,98000,
34.47043,-117.3462,87000,
34.50779,-117.32288,87000,
34.52892,-117.31577,79000,
34.5455,-117.30053,60000,
34.54659,-117.29874,60000,
34.55439,-117.28939,56000,
34.59036,-117.26002,55000,
34.64423,-117.21797,55000,
34.69851,-117.20701,55000,
34.75304,-117.16655,55000,
34.85348,-117.08509,58000,
34.87177,-117.07535,71000,
34.88482,-117.05564,70000,
34.886,-117.02286,65000,
34.88681,-117.00792,45500,
34.89174,-117.00062,45500,
34.90803,-116.97259,45500,
34.90174,-116.92622,43500,
34.90261,-116.8866,42500,
34.90928,-116.83812,40000,
34.91077,-116.80779,40000,
34.91801,-116.77165,40000,
34.9637,-116.64471,39500,
35.01102,-116.5312,40000,
35.07088,-116.41245,40000,
35.10157,-116.26479,39500,
35.13434,-116.211,39500,
35.19566,-116.14105,39500,
35.25674,-116.08373,33000,
35.26342,-116.07316,32000,
35.28105,-116.04791,38500,
35.37451,-115.89114,39000,
35.40272,-115.79137,39000,
35.44385,-115.67487,39000,
35.46818,-115.52874,39000,
35.47335,-115.44883,40000,
35.54088,-115.41971,40000,
35.60735,-115.39126,40000,
39.01305,-122.35879,570,
38.9241,-122.33193,570,
38.9241,-122.33193,700,
8.88705,-122.23694,1100,
38.82655,-122.19049,1350,
38.74915,-122.15004,1850,
38.73475,-122.14433,10700,
38.73158,-122.14297,9300,
38.70694,-122.05741,9300,
38.69637,-122.02077,10000,
38.69323,-122.0166,10600,
38.6889,-122.01654,11600,
38.68174,-121.96721,13600,
38.67962,-121.95202,7500,
38.66947,-121.87108,9900,
38.67778,-121.82106,11000,
38.67767,-121.80442,7300,
38.6878,-121.80248,6800,
38.69215,-121.80245,5600,
38.71865,-121.80043,4000,
38.55371,-121.40934,55000,
38.5492,-121.40834,43000,
38.54676,-121.39892,11500,
38.5444,-121.39089,9000,
38.53873,-121.37083,13000,
38.529,-121.33493,11100,
38.51887,-121.29787,8900,
38.50574,-121.24238,12800,
38.50192,-121.2233,13200,
38.49326,-121.16126,12000,
38.49573,-121.1466,16500,
38.49642,-121.09876,11600,
38.48169,-121.0405,6300,
38.48083,-121.02728,6300,
38.48083,-121.02728,6300,
38.45383,-120.87266,9000,
38.45488,-120.86765,8500,
36.9898,-122.02172,63000,
36.99936,-122.02151,61000,
37.01901,-122.02777,61000,
37.03591,-122.02082,54000,
37.06115,-122.00454,55000,
37.14406,-121.98475,54000,
37.14406,-121.98475,54000,
37.14562,-121.98502,54000,
37.15872,-121.98245,52000,
37.1898,-121.99255,71000,
37.21855,-121.98686,65000,
37.22634,-121.97522,92000,
37.24948,-121.95944,94000,
37.25567,-121.95592,136000,
37.27059,-121.9474,146000,
37.29422,-121.9383,181000,
37.3173,-121.94027,181000,
34.14509,-117.27867,28000,
34.15877,-117.27868,22500,
34.16496,-117.27871,16500,
34.17542,-117.27857,16000,
34.18247,-117.27384,16000,
34.21712,-117.29151,15500,
34.22815,-117.2902,8000,
34.2283,-117.25134,9000,
34.23073,-117.21488,10500,
34.23392,-117.1964,5000,
34.23538,-117.17944,5500,
34.20556,-117.10803,6000,
34.20489,-117.10401,9700,
34.21925,-117.07165,6000,
34.2424,-116.9777,4700,
34.23854,-116.94689,6500,
34.2386,-116.92287,9000,
34.24155,-116.91966,10300,
34.24368,-116.91129,30000,
34.24579,-116.88305,22500,
34.2567,-116.88301,19500,
34.26115,-116.84558,10700,
34.27037,-116.84683,4800,
34.29375,-116.81384,2200,
34.29092,-116.81025,2400,
34.35757,-116.85334,3500,
34.44387,-116.95008,8000,
34.47365,-117.12506,4900,
34.50057,-117.19026,18600,
34.5239,-117.21705,29500,
34.54014,-117.27215,44000,
34.53517,-117.28514,40000,
34.53632,-117.29285,30000,
34.50777,-117.32286,40000,
34.50696,-117.33013,30000,
34.50668,-117.39954,8400,
34.49897,-117.66009,5400,
34.49852,-117.74102,5400,
33.84716,-118.14248,28500,
33.87476,-118.14258,48000,
33.87714,-118.14259,29500,
33.88919,-118.14266,27500,
33.8963,-118.14271,33000,
33.90373,-118.14287,27500,
33.91049,-118.14247,27500,
39.42012,-123.80791,8400,
39.41929,-123.80297,6300,
39.4152,-123.77111,3100,
39.3527,-123.55594,2300,
39.40554,-123.36495,4800,
39.23991,-123.20748,11400,
39.23994,-123.20743,11400,
39.24348,-123.19857,11400,
39.24599,-123.12804,10300,
39.19161,-123.04034,10300,
39.19161,-123.04034,8200,
39.15803,-122.99325,8600,
39.16349,-122.92107,8200,
39.12993,-122.86986,11700,
39.07654,-122.7831,7500,
39.02029,-122.70456,6000,
39.00877,-122.61435,6600,
39.01132,-122.40935,5000,
39.01132,-122.40935,5000,
39.01152,-122.3611,4600,
39.15343,-122.17364,5900,
39.16669,-122.15001,3700,
39.17417,-122.13267,6400,
39.19537,-122.04616,8000,
39.20925,-122.01719,15000,
39.21562,-122.01474,20400,
39.21405,-122.00793,25000,
39.21245,-122.0013,21000,
39.20627,-122.0036,11000,
39.19503,-121.99999,9300,
39.15015,-121.96513,7300,
39.14567,-121.91773,7300,
39.14567,-121.91773,7300,
39.14762,-121.82868,7300,
39.14231,-121.7538,8800,
39.14139,-121.68903,12000,
39.1414,-121.67171,17000,
39.1418,-121.63927,34500,
39.14185,-121.63467,37500,
39.14132,-121.62076,43000,
39.14077,-121.61744,38000,
39.14265,-121.61196,36500,
39.14355,-121.60808,36500,
39.14355,-121.60808,36500,
39.14537,-121.59657,35000,
39.1456,-121.59372,32000,
39.14542,-121.59128,25000,
39.14495,-121.58765,27500,
39.14806,-121.58699,19100,
39.14911,-121.57868,17000,
39.15811,-121.56528,12000,
39.20348,-121.51657,10000,
39.21418,-121.5085,9000,
39.22769,-121.41468,7600,
39.20227,-121.28621,7500,
39.20379,-121.27976,7500,
39.20379,-121.27976,7500,
39.20514,-121.20507,13000,
39.2033,-121.16966,15000,
39.20981,-121.06961,22500,
39.2096,-121.06818,43500,
39.2097,-121.06805,43500,
39.21604,-121.06141,35000,
39.21882,-121.05845,48000,
39.22246,-121.05116,37000,
39.23514,-121.03673,32500,
39.2429,-121.03115,32500,
39.24788,-121.02493,28200,
39.25892,-121.01834,25000,
39.2623,-121.01686,17300,
39.26616,-121.01639,17600,
39.26813,-121.01485,6100,
39.28633,-120.94742,4000,
39.32004,-120.84535,3100,
39.3162,-120.81092,2600,
39.30647,-120.67917,2600,
39.31523,-120.6362,2600,
39.32236,-120.60635,2550,
33.77532,-118.1227,58000,
33.77532,-118.12126,61000,
33.77427,-118.10322,96000,
33.77428,-118.09764,95500,
33.77428,-118.09764,95000,
33.77479,-118.04242,142000,
33.77442,-118.00781,150000,
33.77113,-117.99247,182000,
33.76591,-117.97284,195300,
33.76594,-117.95526,201000,
33.76608,-117.93812,214300,
33.76767,-117.92083,222500,
33.77418,-117.90541,229000,
33.77901,-117.88928,234000,
33.77902,-117.87645,145500,
33.77826,-117.86744,145500,
33.77573,-117.85337,140900,
33.7768,-117.83576,117600,
33.77704,-117.83103,117600,
34.04149,-118.89441,510,
34.08882,-118.87302,1050,
34.10438,-118.85844,2100,
34.12667,-118.85645,2100,
34.12667,-118.85645,2100,
34.14291,-118.84939,11500,
34.14944,-118.83891,23100,
34.15202,-118.82914,24100,
34.17431,-118.85026,107000,
34.20004,-118.85706,103000,
34.21163,-118.84914,91000,
34.22752,-118.84706,87000,
34.24164,-118.83993,68000,
34.26673,-118.85122,65000,
34.28558,-118.88211,7100,
34.29675,-118.8787,4000,
34.30188,-118.87796,10300,
34.31519,-118.88125,6300,
34.3152,-118.90082,6300,
34.37151,-118.92,7600,
34.3962,-118.91775,9100,
37.8243,-122.26831,145000,
37.84094,-122.26241,136000,
37.8478,-122.24469,140000,
37.8488,-122.22837,147000,
37.85325,-122.22178,153000,
37.85774,-122.21315,153000,
37.85774,-122.21315,153000,
37.86315,-122.20923,157000,
37.86737,-122.19813,157000,
37.87877,-122.18413,164000,
37.89156,-122.17126,165000,
37.89206,-122.15471,167000,
37.89464,-122.11693,182000,
37.89772,-122.09635,183000,
37.89633,-122.07363,183000,
36.18721,-120.82123,100,
36.30115,-120.92929,100,
36.30115,-120.92929,300,
36.38055,-121.00129,500,
36.51805,-121.13708,490,
36.72889,-121.27894,1900,
36.82685,-121.38246,6600,
36.87271,-121.40922,16500,
36.8956,-121.42735,20000,
36.90784,-121.43929,18700,
36.94805,-121.51209,19500,
36.94805,-121.51209,22600,
36.96123,-121.55104,22000,
36.96103,-121.55161,22000,
37.96996,-121.24567,20300,
37.97396,-121.23213,9800,
37.98799,-121.19456,7800,
38.00073,-121.14949,6100,
38.01735,-121.09556,7300,
38.02116,-121.08366,7100,
38.02321,-121.07718,4950,
38.04989,-121.01474,5000,
38.09637,-120.94199,4300,
38.09637,-120.94199,4300,
38.10481,-120.91193,3900,
38.12271,-120.87754,5300,
38.15908,-120.84661,8900,
38.17001,-120.83797,10700,
38.18577,-120.82558,12000,
38.21188,-120.7644,1900,
38.25935,-120.74408,1650,
38.29781,-120.70463,1950,
38.34608,-120.58197,900,
38.37991,-120.53374,560,
38.38896,-120.52789,1700,
38.40247,-120.52512,1900,
38.40337,-120.52684,2000,
38.42283,-120.54124,1550,
38.42283,-120.54124,1550,
38.4156,-120.61016,2400,
34.04009,-118.57925,14600,
34.08932,-118.60417,16900,
34.15117,-118.60477,26000,
34.16845,-118.60584,60000,
34.17073,-118.60585,48000,
34.19375,-118.60591,39000,
34.20109,-118.60593,37500,
34.21975,-118.60598,46000,
34.25716,-118.60605,40000,
34.27775,-118.60478,41000,
39.16775,-120.14518,12400,
39.17213,-120.13949,15200,
39.17578,-120.13564,11600,
39.18507,-120.12173,11000,
39.20744,-120.09364,7800,
39.22618,-120.08293,11000,
39.23667,-120.0675,12000,
39.23968,-120.04891,14500,
39.23791,-120.03151,17600,
39.23588,-120.02205,12500,
39.22716,-120.00614,11300,
39.22736,-120.00571,11300,
38.0755,-122.23149,6900,
38.08801,-122.24366,12000,
38.09923,-122.25502,12700,
38.10999,-122.25474,20000,
38.14008,-122.25603,40000,
38.15388,-122.25382,38000,
38.15519,-122.25364,38000,
38.15519,-122.25364,38000,
38.16554,-122.25283,47000,
38.19517,-122.25616,46000,
38.20764,-122.25615,46000,
38.22319,-122.25789,60000,
38.2414,-122.26913,46000,
38.25758,-122.30273,46000,
38.28195,-122.30032,52000,
38.29984,-122.30271,61000,
38.30683,-122.30471,54000,
38.32128,-122.30839,41000,
38.35306,-122.33142,30000,
38.39752,-122.35899,22800,
38.43391,-122.40018,23400,
38.45869,-122.42286,20200,
38.48256,-122.44255,22300,
38.50536,-122.47047,14800,
38.50948,-122.47764,15900,
38.52335,-122.4961,13200,
38.55346,-122.52567,12500,
38.57525,-122.5805,8700,
38.58894,-122.57738,4200,
38.60552,-122.59542,7500,
38.67595,-122.592,7400,
38.67595,-122.592,7400,
38.73175,-122.62291,9500,
38.7367,-122.62607,10700,
38.75253,-122.61515,11500,
38.80916,-122.57283,9400,
38.81994,-122.57659,9400,
38.91014,-122.61234,11100,
38.91044,-122.63684,10100,
38.91041,-122.64635,9000,
38.92963,-122.74131,8300,
38.94259,-122.79215,9800,
38.94458,-122.81513,10800,
38.97102,-122.83035,10700,
38.97237,-122.83288,11000,
38.97559,-122.8423,9500,
38.98401,-122.85689,12500,
38.99388,-122.87919,12600,
39.00078,-122.89392,12100,
39.01684,-122.91286,14800,
39.03341,-122.924,14800,
39.04987,-122.93151,12500,
39.08424,-122.92612,9900,
39.11823,-122.90511,6100,
39.16343,-122.92076,6100,
39.75062,-122.20532,5600,
39.7474,-122.19752,10800,
39.74722,-122.17307,7600,
39.74692,-122.14091,8700,
39.7446,-122.019,11700,
39.75113,-121.99654,12400,
39.75113,-121.99654,12400,
39.75334,-121.91906,13000,
39.75059,-121.90336,13000,
39.74208,-121.88325,16000,
39.74054,-121.87971,15500,
39.73602,-121.86913,17800,
39.73069,-121.8584,19500,
39.72481,-121.85047,22900,
39.72164,-121.84687,17400,
39.71965,-121.84455,9400,
39.71965,-121.84455,9900,
39.71965,-121.84455,10900,
39.71965,-121.84455,12400,
39.71965,-121.84455,16900,
39.71965,-121.84455,21900,
39.71965,-121.84455,16900,
39.71965,-121.84455,19000,
39.71965,-121.84455,8300,
39.73849,-121.80951,18900,
39.73849,-121.80951,12900,
39.73849,-121.80951,14400,
39.73849,-121.80951,13900,
39.73849,-121.80951,14900,
39.73849,-121.80951,16900,
39.73849,-121.80951,18900,
39.73849,-121.80951,16800,
39.73849,-121.80951,11100,
39.73849,-121.80951,9300,
39.73849,-121.80951,18900,
39.73946,-121.80467,13400,
39.74033,-121.80007,13600,
39.74188,-121.7924,8400,
39.76241,-121.73658,3250,
39.874,-121.68023,1700,
40.03886,-121.61704,940,
40.04718,-121.61484,1050,
40.04718,-121.61484,1050,
40.27939,-121.42119,1050,
34.27926,-119.30564,41000,
34.30082,-119.30171,29500,
34.31572,-119.29426,26500,
34.34165,-119.29273,25500,
34.35254,-119.30576,23900,
34.38562,-119.30218,21200,
34.40045,-119.29972,20200,
34.42189,-119.29026,21200,
34.44142,-119.26092,11200,
34.44659,-119.27068,3750,
34.45648,-119.27828,1650,
34.46279,-119.28304,1450,
34.48544,-119.30088,600,
34.50803,-119.29154,620,
34.5343,-119.23891,420,
34.56496,-119.26416,380,
34.68654,-119.35574,300,
34.79027,-119.4441,320,
34.79027,-119.4441,360,
34.89761,-119.50528,730,
34.89761,-119.50528,730,
34.93669,-119.50751,4300,
34.93791,-119.47274,5150,
34.93791,-119.47274,2900,
35.0581,-119.40292,4100,
35.07626,-119.4018,5100,
35.13571,-119.4477,2500,
35.14078,-119.45206,8800,
35.1431,-119.45941,11700,
35.1449,-119.46512,7400,
35.17943,-119.5264,4400,
35.29133,-119.62707,3600,
35.30388,-119.62351,1800,
35.39766,-119.66505,4800,
35.43752,-119.68944,3600,
35.77588,-119.97509,1800,
35.78929,-119.98329,1800,
35.78929,-119.98329,1800,
35.89014,-120.04714,2600,
35.99334,-120.12882,2200,
35.99385,-120.12919,2950,
36.00067,-120.13737,3350,
36.02275,-120.16574,2500,
36.02275,-120.16574,2500,
36.09927,-120.26075,2150,
36.13662,-120.34396,11700,
36.13662,-120.35523,4800,
36.13972,-120.36028,9000,
36.15422,-120.35443,6600,
36.17998,-120.35378,4250,
36.2465,-120.31535,2250,
36.28272,-120.29785,2100,
36.29426,-120.26926,1850,
36.43519,-120.39433,1850,
36.63247,-120.38826,1850,
36.74926,-120.38682,5200,
36.76109,-120.38662,10800,
36.765,-120.38725,6350,
36.85432,-120.45339,11700,
36.8572,-120.45643,12500,
36.86131,-120.46077,8000,
36.88287,-120.49122,2500,
36.93115,-120.59035,2000,
36.96856,-120.63561,2650,
36.96857,-120.63561,2650,
36.98574,-120.63557,6100,
36.99633,-120.63564,5300,
37.05688,-121.01631,8400,
37.09044,-121.01598,9400,
37.09957,-121.01586,9800,
37.10492,-121.01577,13500,
37.1136,-121.01563,5200,
37.26015,-120.99975,7600,
37.3043,-121.01635,5500,
37.3043,-121.01635,5500,
37.31353,-121.02052,6400,
37.3173,-121.02197,6300,
37.33292,-121.02735,3650,
37.36769,-121.05054,4100,
37.3913,-121.07009,3050,
37.39503,-121.07315,3050,
37.46437,-121.1233,5500,
37.47106,-121.12823,6700,
37.47206,-121.12896,4250,
37.4731,-121.1296,5400,
37.48899,-121.14079,4900,
37.51271,-121.15839,3250,
37.54644,-121.19611,2600,
37.55033,-121.20066,2100,
37.629,-121.28552,1300,
37.629,-121.28552,1300,
37.63793,-121.29529,2400,
37.6673,-121.32747,2400,
37.68166,-121.3432,2350,
34.19766,-119.1774,13400,
34.19683,-119.14232,11900,
34.19661,-119.1045,11200,
34.19656,-119.09616,10000,
34.19632,-119.0698,8000,
34.20539,-119.0408,11700,
34.20541,-119.03569,12900,
34.21582,-119.03489,19400,
34.21658,-119.03425,19400,
34.21721,-119.03367,21500,
34.24287,-119.01006,8100,
34.26375,-118.99466,13600,
37.14552,-121.98496,750,
37.14463,-121.98622,750,
37.14463,-121.98622,790,
37.16565,-122.01595,200,
37.20535,-122.04813,210,
37.20535,-122.04813,180,
37.20547,-122.04828,750,
37.25849,-122.12192,1100,
37.28719,-122.1525,1100,
37.28719,-122.1525,1100,
37.31497,-122.18724,1100,
37.38599,-122.26368,1250,
37.42495,-122.31383,1200,
37.51182,-122.34976,3050,
37.6056,-122.42961,14200,
37.61842,-122.442,18500,
37.62438,-122.44727,21300,
37.6389,-122.46411,17900,
37.64619,-122.47088,16900,
37.66845,-122.48507,32000,
37.68334,-122.48923,27500,
37.69054,-122.49271,28500,
37.6989,-122.4951,23000,
37.70828,-122.49819,23100,
37.70828,-122.49819,24000,
37.71927,-122.50024,27500,
37.73155,-122.49899,24000,
37.73391,-122.49368,24700,
37.73463,-122.47513,24200,
40.54862,-124.1454,4200,
40.54855,-124.13979,4200,
40.54763,-124.09696,3900,
40.54579,-124.08897,3900,
40.51938,-124.02354,2000,
40.46821,-123.80293,1200,
40.46849,-123.79929,1100,
40.47883,-123.57095,1000,
40.46554,-123.54448,1100,
40.46554,-123.54448,1100,
40.44445,-123.49514,510,
40.37213,-123.30912,490,
40.42028,-123.17565,310,
40.38168,-123.01606,330,
40.38168,-123.01606,330,
40.36136,-122.88783,390,
40.34775,-122.86462,390,
40.34775,-122.86462,390,
40.27861,-122.49236,470,
40.2256,-122.45728,480,
40.22399,-122.34076,1300,
40.2107,-122.27124,3400,
40.20835,-122.26448,3350,
40.19841,-122.24278,7100,
40.18985,-122.2393,9800,
40.18125,-122.23815,8700,
40.17777,-122.23515,11622,
40.17692,-122.23347,19200,
40.17768,-122.23183,19200,
40.17948,-122.22779,19200,
40.18068,-122.22515,19100,
40.18607,-122.20867,15400,
40.18582,-122.19954,11000,
40.1857,-122.18605,1900,
40.31364,-122.07089,1200,
40.31106,-122.01735,950,
40.34759,-121.59664,900,
40.36543,-121.53557,700,
40.36192,-121.51185,980,
40.26185,-121.35246,1650,
40.26185,-121.35246,1650,
40.27877,-121.25353,2850,
40.30115,-121.23609,2900,
40.31065,-121.22859,4800,
40.31247,-121.22302,3800,
40.3051,-121.14313,1850,
40.3147,-121.06096,1850,
40.3147,-121.06096,1850,
40.31082,-121.04857,1900,
40.31456,-121.00432,1950,
40.31513,-120.99339,2200,
40.41121,-120.75529,3650,
40.42007,-120.70317,4600,
40.41859,-120.6644,6000,
40.41675,-120.65427,11400,
40.41549,-120.64893,14500,
40.41262,-120.63895,15900,
40.40954,-120.635,8900,
40.38057,-120.59192,8900,
38.07969,-122.54539,40000,
38.10524,-122.5119,40000,
38.11403,-122.50751,37000,
38.11546,-122.5057,37000,
38.11546,-122.5057,37000,
38.13406,-122.47636,44500,
38.1509,-122.44936,33000,
38.15566,-122.40696,33000,
38.15566,-122.40696,33000,
38.11751,-122.28888,34500,
38.122,-122.27605,38500,
38.13999,-122.25607,69000,
38.14134,-122.23307,92000,
38.14141,-122.22438,92500,
34.0618,-117.18253,21500,
34.06284,-117.18252,13600,
34.07003,-117.18249,14500,
34.07014,-117.13885,14000,
34.06986,-117.12142,11400,
34.07839,-117.04874,5500,
34.09196,-117.03582,5500,
34.09563,-116.95872,3500,
34.16098,-116.9115,2300,
34.17058,-116.8279,2100,
34.2622,-116.82321,11000,
34.27037,-116.84683,3700,
34.26241,-116.88555,2450,
34.2648,-116.92136,1400,
34.2424,-116.9777,1400,
33.64863,-117.98823,29200,
33.67207,-117.98856,42500,
33.69374,-117.98884,65000,
33.70091,-117.98914,66500,
33.70849,-117.98919,69500,
33.71569,-117.98911,71900,
33.73253,-117.98935,83500,
33.74458,-117.98949,77500,
33.75923,-117.98966,73500,
33.77097,-117.99226,73500,
33.78099,-117.99288,77500,
33.78827,-117.99295,71500,
33.80266,-117.99314,64400,
33.81023,-117.9932,65100,
33.81749,-117.99328,62500,
33.83216,-117.99348,66500,
33.85616,-117.99801,57700,
33.86735,-117.99817,57500,
33.87349,-117.99824,60500,
33.8816,-117.99803,66500,
33.88443,-117.99551,48400,
33.89648,-117.98718,44000,
33.9169,-117.96829,48700,
33.9245,-117.96778,34500,
33.93974,-117.96695,39600,
33.93953,-117.96443,37800,
33.93911,-117.93417,31600,
34.16409,-117.89512,1950,
34.18274,-117.87963,1800,
34.24018,-117.85326,820,
34.29091,-117.83972,220,
34.31444,-117.83678,150,
34.88676,-117.00712,18000,
34.88645,-116.9938,18100,
34.87878,-116.96878,16500,
34.86376,-116.93245,16000,
34.85504,-116.89016,14000,
34.84127,-116.80375,13000,
34.83005,-116.69459,11800,
34.81638,-116.61019,11500,
34.78808,-116.45298,11400,
34.72546,-116.16312,10400,
34.72102,-115.67864,10500,
34.80107,-115.32062,10500,
34.81221,-115.1905,9900,
34.83024,-115.05101,10400,
34.8452,-114.97022,10400,
34.87809,-114.75528,13600,
34.87153,-114.65245,11200,
34.85407,-114.62655,11400,
34.8396,-114.61138,13900,
34.82398,-114.59685,11200,
34.76278,-114.57439,11600,
34.71755,-114.51083,11700,
34.71718,-114.48783,11700,
35.38007,-120.85554,6200,
35.42937,-120.7516,4950,
35.46601,-120.67161,12800,
35.4853,-120.66509,14300,
35.48624,-120.66482,10400,
35.4995,-120.65904,4800,
35.50434,-120.65242,2850,
35.53434,-120.52728,2500,
35.65551,-120.37972,1470,
35.73433,-120.28523,9900,
35.77876,-120.19412,5950,
35.77876,-120.19412,6500,
35.78869,-120.11262,6500,
35.78869,-120.11262,6500,
35.88889,-120.04638,6400,
35.98793,-119.95969,6500,
36.03638,-119.95892,6500,
36.13782,-119.8787,5732,
36.25467,-119.80885,7800,
36.28233,-119.80806,16100,
36.29646,-119.8105,13900,
36.31336,-119.80794,19000,
36.34247,-119.80801,17000,
36.40217,-119.80698,17000,
36.40217,-119.80698,13300,
36.43131,-119.80111,13200,
36.48923,-119.78965,14500,
36.51831,-119.78617,14500,
36.54733,-119.78608,18800,
36.60525,-119.78598,20400,
36.67788,-119.78589,29000,
36.6921,-119.78593,32500,
36.70704,-119.78485,42500,
36.71797,-119.78469,73000,
36.73035,-119.78087,92000,
36.74296,-119.7773,122000,
36.75483,-119.77582,141000,
36.76547,-119.77733,139000,
36.77968,-119.78473,136000,
36.79429,-119.78489,132000,
36.80875,-119.78525,120000,
36.82318,-119.78521,104000,
36.83745,-119.78498,76000,
36.85425,-119.78875,43000,
36.87607,-119.79265,43000,
36.87607,-119.79265,43000,
36.92321,-119.79399,15100,
37.01056,-119.7939,15700,
37.12436,-119.73697,14000,
37.21777,-119.70788,10400,
37.33165,-119.65468,15500,
37.33315,-119.65033,9650,
37.36554,-119.6306,6100,
37.44211,-119.65094,6100,
37.49792,-119.63148,2400,
35.26735,-119.25272,6000,
35.29333,-119.25249,8400,
35.38347,-119.25212,5500,
35.39809,-119.25205,5400,
35.44166,-119.25181,4000,
35.4929,-119.26178,9600,
35.49985,-119.27047,14000,
35.50288,-119.27445,14000,
35.50613,-119.27826,14000,
35.51422,-119.28795,10100,
35.54362,-119.32827,10400,
35.58696,-119.33383,6800,
35.60153,-119.32817,3550,
35.71769,-119.33042,2700,
35.76116,-119.34439,2700,
35.79032,-119.35521,2700,
35.79032,-119.35521,2700,
35.89136,-119.40534,2650,
36.07043,-119.53529,5400,
36.09808,-119.54576,3950,
36.11355,-119.56742,6600,
36.21091,-119.60057,5200,
36.29849,-119.60074,7600,
36.32523,-119.60093,15200,
36.328,-119.60093,13300,
36.34251,-119.60091,11900,
36.36873,-119.63694,9400,
36.40122,-119.63694,11800,
36.44176,-119.63614,10500,
36.44176,-119.63614,10500,
36.5617,-119.62877,12500,
36.57548,-119.62862,16300,
36.57548,-119.62862,17000,
36.57548,-119.62862,18600,
36.57548,-119.62862,19600,
36.57548,-119.62862,20000,
40.58656,-122.38419,20000,
40.58656,-122.38419,20000,
40.58656,-122.38419,20200,
40.58656,-122.38419,19000,
40.58656,-122.38419,39500,
40.58661,-122.37837,52000,
40.58536,-122.36045,47000,
40.58519,-122.35794,34000,
40.58013,-122.33931,32000,
40.57301,-122.32521,21400,
40.56108,-122.30054,16200,
40.5573,-122.23848,8000,
40.53841,-122.17424,4200,
40.51411,-122.03157,4200,
40.49257,-121.88659,3350,
40.51815,-121.68655,1150,
40.54096,-121.58544,1150,
40.68064,-121.4246,1650,
40.65512,-121.32237,1650,
40.65512,-121.32237,1650,
40.53164,-121.03929,1550,
40.41123,-120.75522,1550,
38.80048,-121.72021,860,
38.80255,-121.72405,640,
38.85597,-121.78557,880,
38.92471,-121.84359,880,
38.92471,-121.84359,1000,
39.01243,-121.86662,500,
39.07199,-121.89845,1000,
39.13762,-121.94772,770,
39.21562,-122.01474,6100,
39.21701,-122.0186,6900,
39.2778,-122.03542,2100,
39.38441,-122.0174,2100,
39.41363,-122.0102,2100,
39.41363,-122.0102,2100,
39.45734,-122.01729,1950,
39.52181,-122.01403,2300,
39.58254,-122.00759,2000,
39.65952,-122.0082,2250,
39.70851,-122.00375,2150,
39.7371,-122.01577,2300,
39.74453,-122.01937,2300,
35.54043,-121.01078,3150,
35.53404,-120.85928,4200,
35.53705,-120.83897,4350,
35.5476,-120.79273,4850,
35.55326,-120.76169,4400,
35.64259,-120.68499,27700,
35.64452,-120.64332,20600,
35.6614,-120.41408,14000,
35.72386,-120.2964,13900,
35.73446,-120.28446,5850,
35.72647,-120.19378,5900,
35.72647,-120.19378,5900,
35.67086,-120.08195,6800,
35.61494,-119.86752,6800,
35.6157,-119.74476,7900,
35.61615,-119.6595,10100,
35.61626,-119.65322,6100,
35.61632,-119.64988,5700,
35.60744,-119.58051,5800,
35.6011,-119.47361,8500,
35.60155,-119.34928,15500,
35.60153,-119.33369,12000,
35.60153,-119.32818,9700,
35.60174,-119.277,9300,
35.602,-119.21124,7200,
33.74889,-118.29092,51000,
33.74892,-118.28364,50000,
33.75844,-118.23852,13800,
33.75939,-118.23867,16900,
33.76305,-118.23925,16900,
33.77133,-118.24039,16900,
37.33109,-119.65556,12800,
37.35456,-119.72413,6000,
37.36908,-119.72534,5000,
37.40307,-119.73362,3300,
37.41704,-119.73038,3300,
37.41704,-119.73038,3300,
37.46173,-119.79388,3400,
37.44947,-119.85274,4400,
37.46293,-119.89598,5600,
37.46254,-119.94739,6000,
37.49312,-119.97271,6100,
37.49289,-119.97467,4500,
37.50698,-120.00311,2250,
37.50709,-120.04375,1350,
37.5693,-120.11942,440,
37.71033,-120.19693,670,
37.7506,-120.24541,630,
37.7506,-120.24541,630,
37.87472,-120.43478,1550,
37.8913,-120.44551,2050,
37.9093,-120.45242,12100,
37.95077,-120.42468,16900,
37.95604,-120.42263,17300,
37.96517,-120.39396,11900,
37.97812,-120.39049,10700,
37.98003,-120.38891,10900,
37.9829,-120.3822,18300,
37.98604,-120.38388,19400,
37.99002,-120.38453,15400,
38.01395,-120.39622,5050,
37.98847,-120.44177,4550,
37.99099,-120.4617,5300,
38.00414,-120.50026,5600,
38.00414,-120.50026,5600,
38.06103,-120.53678,7400,
38.06826,-120.53911,13100,
38.07942,-120.55436,15900,
38.08249,-120.5588,8200,
38.08767,-120.57098,6600,
38.13255,-120.63496,6500,
38.18913,-120.67451,10500,
38.19618,-120.6809,10900,
38.20485,-120.69736,4500,
38.22851,-120.70415,4900,
38.29783,-120.70465,6100,
38.29973,-120.71158,5600,
38.31253,-120.7203,5800,
38.31253,-120.7203,5800,
38.33538,-120.75689,7800,
38.33837,-120.76098,6400,
38.34296,-120.76746,14600,
38.34689,-120.77311,20900,
38.35041,-120.7754,17200,
38.36543,-120.79419,11600,
38.36718,-120.79588,17900,
38.37842,-120.8024,12500,
38.45488,-120.86767,6600,
38.47337,-120.85095,6200,
38.48181,-120.84483,5200,
38.48429,-120.84535,2100,
38.55068,-120.84966,2000,
38.55068,-120.84966,2000,
38.57429,-120.84593,3800,
38.66451,-120.85348,7200,
38.6802,-120.84766,9600,
38.68221,-120.84701,13500,
38.69285,-120.82346,15000,
38.69554,-120.8134,6200,
38.72456,-120.80341,10600,
38.72652,-120.80288,5400,
38.72814,-120.80538,6800,
38.73761,-120.81129,4700,
38.74488,-120.82013,3500,
38.76398,-120.85617,2250,
38.7969,-120.88928,5400,
38.81007,-120.90929,3500,
38.82838,-120.97024,3500,
38.88698,-121.0159,8600,
38.91545,-121.04047,8600,
38.91545,-121.04047,8600,
38.90409,-121.06563,13600,
38.90026,-121.0747,31000,
38.90839,-121.07695,33000,
38.92737,-121.08664,48000,
38.93508,-121.09321,50000,
38.93654,-121.09461,34500,
38.94205,-121.0971,28000,
38.95663,-121.10131,28000,
39.01194,-121.10427,27000,
39.01194,-121.10427,27000,
39.0426,-121.09462,20900,
39.06215,-121.08871,21500,
39.1411,-121.07116,27000,
39.16022,-121.05914,24600,
39.20045,-121.05941,31000,
39.26784,-121.015,11100,
39.26763,-121.02791,6100,
39.26904,-121.05717,3850,
39.32874,-121.11122,2700,
39.343,-121.12015,1600,
39.39402,-121.08426,1600,
39.39402,-121.08426,1600,
39.41375,-121.07125,1500,
39.43857,-121.07086,1000,
39.45543,-121.05275,940,
39.49404,-121.03189,550,
39.49404,-121.03189,550,
39.54179,-120.88802,1125,
39.55811,-120.83511,1100,
39.56038,-120.82816,1100,
39.5654,-120.63717,720,
39.61706,-120.59135,330,
39.58956,-120.36703,950,
39.58832,-120.35942,1400,
39.67934,-120.31564,1750,
39.67577,-120.24645,1900,
39.67516,-120.23155,1500,
39.70801,-120.22178,640,
39.70801,-120.22178,640,
39.76238,-120.20918,920,
39.8045,-120.17809,920,
38.57527,-121.5708,86000,
38.57505,-121.54872,114000,
38.57713,-121.52514,109000,
38.57398,-121.51887,176000,
38.5713,-121.51585,176000,
38.5713,-121.51585,176000,
38.56838,-121.51086,227000,
38.56497,-121.4982,227000,
38.56361,-121.49303,246000,
38.5588,-121.47355,246000,
38.5588,-121.47355,205000,
38.56089,-121.4626,206000,
38.55314,-121.43641,192000,
38.55061,-121.42783,197000,
38.55293,-121.41281,170000,
38.5537,-121.40934,176000,
38.55874,-121.37942,171000,
38.56595,-121.33635,169000,
38.57847,-121.30808,153000,
38.59092,-121.28745,141000,
38.609,-121.27049,116000,
38.63085,-121.21706,110000,
38.63366,-121.21166,109000,
38.63992,-121.19689,87000,
38.64202,-121.15652,78000,
38.64326,-121.11462,90000,
38.64769,-121.08631,90000,
38.64769,-121.08631,90000,
38.65294,-121.07056,70000,
38.65533,-121.02984,63000,
38.65663,-120.99827,62000,
38.65948,-120.96905,63000,
38.66259,-120.93759,49000,
38.68021,-120.91506,48500,
38.6959,-120.88778,47500,
38.70473,-120.85655,46500,
38.71127,-120.83935,53000,
38.72176,-120.83227,40000,
38.73031,-120.81678,49500,
38.72889,-120.80952,52000,
38.72826,-120.80793,45000,
38.72816,-120.80538,40000,
38.7288,-120.8032,40500,
38.73042,-120.79894,33500,
38.73172,-120.7902,30000,
38.73293,-120.78183,24000,
38.73137,-120.75989,20400,
38.73145,-120.75228,20600,
38.73973,-120.69837,18100,
38.73778,-120.66522,18800,
38.74845,-120.61738,15600,
38.76135,-120.57576,9500,
38.76922,-120.44745,13100,
38.82434,-120.04467,8000,
38.84774,-120.0279,10100,
38.85101,-120.02233,12200,
38.85955,-120.01214,13100,
38.87629,-120.00528,11600,
38.89844,-119.99911,19000,
38.91345,-120.00454,33000,
38.92224,-119.99088,33000,
38.94542,-119.97279,30500,
38.94857,-119.95754,31500,
38.95387,-119.94612,29000,
38.95521,-119.94476,26500,
38.95918,-119.94207,25500,
38.55891,-121.47348,156000,
38.56224,-121.47202,155000,
38.57557,-121.46622,151000,
38.57911,-121.4647,162000,
38.59695,-121.44354,159000,
38.60028,-121.43947,168000,
38.60028,-121.43947,156000,
38.61125,-121.42665,140000,
38.61914,-121.41959,119000,
38.62308,-121.41894,119000,
38.62432,-121.41671,122000,
38.62619,-121.41202,122000,
38.63081,-121.40139,133000,
38.63666,-121.38663,129000,
38.6398,-121.38317,125000,
38.64958,-121.37253,125000,
32.83786,-117.23476,80000,
32.84189,-117.21772,78000,
32.84686,-117.20268,85000,
32.84743,-117.18004,101000,
32.84113,-117.13347,89000,
32.84166,-117.12794,89000,
32.84181,-117.1213,96000,
32.84127,-117.09733,89000,
32.84495,-117.02639,79000,
32.83643,-117.0192,79000,
32.83672,-117.00296,72000,
32.83301,-116.98373,69000,
32.8325,-116.96535,69000,
38.91014,-122.61228,17800,
38.93001,-122.61892,17700,
38.9507,-122.62311,8900,
39.00884,-122.61376,8100,
39.00884,-122.61376,100500,
39.00884,-122.61376,100500,
39.00884,-122.61376,119000,
32.65836,-117.07449,127000,
32.66423,-117.05753,118000,
32.67322,-117.03921,106000,
32.68155,-117.0301,98000,
32.7396,-116.94252,36000,
32.74112,-116.93838,37000,
32.74481,-116.92934,22900,
32.76878,-116.92788,22500,
32.77563,-116.92788,22500,
32.77612,-116.92789,22500,
33.61718,-117.93033,48500,
33.621,-117.92935,55500,
33.63752,-117.92171,87500,
33.64108,-117.91879,71500,
33.64332,-117.91657,94500,
33.65191,-117.90853,134000,
33.66594,-117.89479,153400,
33.68732,-117.87227,161200,
33.69868,-117.86146,281000,
33.70832,-117.85205,287900,
33.72639,-117.83501,303000,
33.73377,-117.83378,287000,
33.74065,-117.83381,238500,
33.74813,-117.83229,259000,
33.75977,-117.83106,250000,
33.77695,-117.83106,262500,
33.78759,-117.83102,230000,
33.80997,-117.83195,214000,
33.83471,-117.83552,215100,
33.84395,-117.82687,215100,
32.93103,-117.24061,56000,
32.93417,-117.2371,72000,
32.93725,-117.22909,79000,
32.94386,-117.2142,75000,
32.95215,-117.19435,65000,
32.95662,-117.15001,72000,
32.95338,-117.13619,76000,
32.95839,-117.11406,71000,
32.96468,-117.09535,34500,
32.9649,-117.09323,34500,
32.9649,-117.09323,244000,
33.78768,-117.87996,244000,
33.79562,-117.87793,250100,
33.80612,-117.88024,250100,
33.81809,-117.87631,251700,
33.8378,-117.87605,251000,
33.84979,-117.87585,278500,
33.86126,-117.87723,277500,
33.87418,-117.88039,277500,
33.87816,-117.88037,254700,
33.88927,-117.88058,244200,
33.91077,-117.88356,237900,
33.9253,-117.88016,228000,
33.93863,-117.87706,221000,
33.94601,-117.8685,220500,
33.94601,-117.8685,206000,
33.95758,-117.86023,211000,
33.96844,-117.84896,194000,
33.98431,-117.84281,198000,
34.0224,-117.81333,129000,
34.02884,-117.81134,144000,
34.0435,-117.80088,154000,
34.06521,-117.80655,167000,
34.07796,-117.814,168000,
34.09929,-117.81935,157000,
34.10726,-117.82195,148000,
34.10726,-117.82195,148000,
34.10726,-117.82195,148000,
35.3832,-120.63028,4000,
35.39255,-120.60607,4800,
35.39067,-120.60233,3000,
35.38852,-120.58094,1800,
35.41269,-120.56064,780,
35.42377,-120.54686,650,
35.42731,-120.28931,370,
35.35146,-120.00526,180,
35.35099,-119.83366,165,
35.35099,-119.83366,350,
35.35092,-119.82012,350,
35.34536,-119.80924,350,
35.31178,-119.71043,350,
35.29679,-119.6255,2550,
35.3982,-119.5365,5700,
35.39944,-119.51911,5900,
35.39931,-119.4742,6800,
35.3991,-119.44763,7200,
35.39914,-119.4006,15000,
35.39885,-119.39541,9700,
35.38348,-119.25212,7700,
35.35275,-119.04341,40500,
35.35267,-119.03946,79000,
35.35258,-119.02128,69000,
35.35255,-119.01894,81000,
35.35244,-119.00302,78000,
35.35241,-118.98547,76000,
35.35299,-118.96756,63000,
35.35225,-118.94998,52000,
35.35232,-118.93199,40500,
35.35229,-118.91419,27500,
35.34557,-118.8787,25500,
35.33832,-118.8432,21100,
35.32974,-118.80756,20300,
35.29261,-118.75291,20100,
35.26378,-118.62999,22000,
35.14138,-118.46737,20700,
35.13973,-118.45085,20250,
35.12774,-118.41145,20500,
35.11033,-118.3271,20000,
35.09944,-118.29294,20000,
35.11695,-118.20396,19600,
35.1137,-118.17912,14050,
35.09883,-118.14441,14000,
35.03797,-118.10708,17000,
35.0122,-117.91691,17000,
35.00973,-117.8811,15700,
35.00685,-117.8395,15350,
35.01027,-117.64978,12950,
35.01019,-117.63253,13500,
35.01019,-117.63253,13500,
34.99236,-117.54161,10000,
34.92445,-117.32989,10500,
34.91677,-117.11837,12000,
34.88356,-117.08965,12000,
34.87077,-117.07649,12000,
37.08395,-120.49241,5700,
37.1352,-120.49212,6700,
37.18786,-120.48819,6900,
37.27393,-120.48781,9200,
37.28862,-120.48724,11500,
37.30334,-120.50047,23000,
37.30595,-120.49897,27400,
37.31132,-120.50515,17200,
37.31903,-120.50491,8700,
37.36087,-120.50346,3200,
37.41503,-120.51137,1400,
37.46286,-120.49406,1550,
37.49317,-120.50144,1500,
37.5159,-120.45293,2750,
37.51891,-120.44023,2600,
37.52334,-120.42982,3900,
34.02917,-118.22566,168000,
34.02941,-118.21607,190000,
34.02938,-118.20005,193000,
34.03127,-118.19233,206000,
34.03309,-118.18131,212000,
34.03563,-118.17006,248000,
34.03534,-118.15031,237000,
34.0332,-118.12531,221000,
34.03603,-118.0929,211000,
34.03944,-118.0807,223000,
34.04129,-118.06428,232000,
34.03976,-118.05193,239000,
34.03745,-118.03863,236000,
34.034,-118.02721,252000,
34.02908,-118.01272,254000,
34.01971,-117.98834,231000,
34.00696,-117.96459,221000,
33.99698,-117.93113,218000,
33.99417,-117.90542,222000,
33.99415,-117.88865,227000,
33.99625,-117.87056,215000,
34.00056,-117.84511,217000,
34.00185,-117.83536,351000,
34.01015,-117.82333,354000,
34.0221,-117.81318,223000,
34.02391,-117.77092,212000,
34.02332,-117.7479,212000,
34.02508,-117.73173,215000,
34.02514,-117.72944,215000,
34.02514,-117.72944,217000,
34.03014,-117.70683,220000,
34.03028,-117.68942,221000,
34.03035,-117.6679,218000,
34.0304,-117.65087,222000,
34.03049,-117.62861,215000,
34.03056,-117.6112,216000,
34.03062,-117.59347,209000,
34.02898,-117.57572,204000,
34.02405,-117.55835,200000,
34.02405,-117.55835,187000,
34.02181,-117.55027,155000,
34.01796,-117.53227,142000,
34.01822,-117.52475,155000,
34.01886,-117.50675,142000,
34.0192,-117.48044,143000,
34.01635,-117.46277,140000,
34.01183,-117.434,150000,
34.00458,-117.40039,155000,
34.00082,-117.37524,158000,
33.99647,-117.36477,148000,
33.99594,-117.36341,147000,
33.94542,-117.2958,130000,
33.9445,-117.29245,134000,
33.94267,-117.27919,136000,
33.9408,-117.26164,121000,
33.94109,-117.24404,106000,
33.93976,-117.22665,87000,
33.93926,-117.19151,76000,
33.9393,-117.17707,63000,
33.93926,-117.15669,54000,
33.9393,-117.13933,54000,
33.93811,-117.12678,46000,
33.93398,-117.03335,46000,
33.93282,-116.98985,47000,
37.71629,-122.187,22300,
37.72651,-122.20164,21200,
37.74697,-122.23557,39500,
37.74728,-122.23598,39500,
37.75619,-122.24431,9400,
37.76093,-122.2414,7900,
37.77109,-122.264,8800,
37.77146,-122.27689,15900,
33.91487,-116.60618,17500,
33.96134,-116.59063,16000,
34.0052,-116.57637,20500,
34.03266,-116.5915,20500,
34.03266,-116.5915,20500,
34.04299,-116.58493,20000,
34.05426,-116.57276,20500,
34.11421,-116.46646,20000,
34.11948,-116.44584,26500,
34.12346,-116.41405,26500,
34.13497,-116.3152,17000,
34.13514,-116.24713,14000,
34.13547,-116.08953,15000,
34.13562,-116.05442,9500,
34.13586,-116.03672,2800,
34.07255,-115.31605,800,
34.07255,-115.31605,800,
34.04705,-115.21968,1400,
34.07979,-115.13593,1400,
34.07979,-115.13593,1400,
34.10696,-114.93258,1400,
34.08394,-114.85044,1400,
34.18853,-114.57426,2300,
34.1596,-114.29893,5700,
36.21128,-119.31307,16500,
36.26943,-119.31328,22800,
36.27978,-119.31342,21700,
36.29847,-119.31367,26500,
36.30873,-119.31379,26500,
36.31823,-119.3139,24500,
36.31823,-119.3139,25000,
36.31823,-119.3139,14500,
36.31823,-119.3139,14500,
36.31823,-119.3139,13500,
36.31823,-119.3139,11700,
36.31823,-119.3139,8300,
36.34184,-119.2967,14000,
36.34184,-119.2967,14000,
36.34184,-119.2967,15000,
36.34184,-119.2967,11000,
36.34184,-119.2967,9000,
36.34184,-119.2967,13400,
36.34191,-119.29672,19000,
36.38557,-119.29674,9000,
36.42875,-119.29585,7000,
36.48671,-119.28719,8000,
36.51559,-119.28672,9100,
36.52721,-119.28686,11200,
36.54475,-119.28691,6800,
36.55563,-119.28694,3000,
36.57345,-119.28709,1800,
36.62414,-119.28687,1350,
36.6244,-119.30479,1650,
36.6244,-119.30479,2100,
36.66063,-119.30462,1100,
36.73038,-119.28671,600,
35.43468,-119.07527,15300,
35.47391,-119.07465,14300,
35.49945,-119.07662,11100,
35.6025,-119.08758,9400,
35.762,-119.05324,8100,
35.79063,-119.05343,8100,
35.79063,-119.05343,8100,
35.89169,-119.05348,11000,
35.9624,-119.05359,12900,
35.99325,-119.04606,10800,
36.05169,-119.03898,26500,
36.06594,-119.03934,24500,
36.08046,-119.03928,21300,
36.1043,-119.04303,21000,
36.12369,-119.05568,20800,
36.20324,-119.10448,20500,
36.21059,-119.11059,22500,
36.21077,-119.1185,13100,
36.21081,-119.13618,5300,
36.28996,-119.13614,9900,
36.29805,-119.13605,11200,
36.32611,-119.13489,8400,
38.76986,-121.24878,109000,
38.77725,-121.26549,103000,
38.78634,-121.28368,87000,
38.79824,-121.29891,68000,
38.81708,-121.30021,51000,
38.85113,-121.29977,47500,
38.99995,-121.40658,16800,
38.99995,-121.40658,16200,
39.01438,-121.43118,17000,
39.02118,-121.44285,17000,
39.02514,-121.44926,18400,
39.04077,-121.47179,15500,
39.06498,-121.51405,16200,
39.07752,-121.52779,17000,
39.0893,-121.53794,17000,
34.12145,-117.78943,21300,
34.11995,-117.7868,26500,
34.11214,-117.76149,21700,
34.10786,-117.74867,21600,
34.1071,-117.73674,23500,
34.1071,-117.73672,19100,
34.10677,-117.35291,19700,
34.10664,-117.33154,19800,
34.10834,-117.3138,15800,
34.10832,-117.30268,17800,
34.10833,-117.30093,17800,
34.1102,-117.3009,17800,
32.80312,-116.96233,45500,
32.80751,-116.96198,94000,
32.81916,-116.9606,87000,
32.83102,-116.96189,56000,
32.84237,-116.96093,72000,
32.85511,-116.94617,58000,
32.85817,-116.93203,35500,
32.86235,-116.92316,25500,
32.87346,-116.92427,21300,
32.90459,-116.94003,20600,
32.90658,-116.94243,19300,
32.95618,-116.96987,18100,
32.97853,-116.97336,24000,
33.00894,-116.91499,21700,
33.01318,-116.90853,19500,
33.03245,-116.88402,20200,
33.03773,-116.87636,32000,
33.04035,-116.87158,33500,
33.04116,-116.87014,28500,
33.04204,-116.8686,28500,
36.61936,-121.93567,3000,
36.61612,-121.93577,7100,
36.61039,-121.92268,19700,
36.60485,-121.92053,21600,
36.59506,-121.86835,21800,
36.58116,-121.8285,22200,
36.56969,-121.75566,23000,
36.57976,-121.72074,25000,
36.62474,-121.68188,29000,
36.63221,-121.67015,27600,
36.65557,-121.66026,26400,
36.66876,-121.65561,21700,
36.67107,-121.6548,9900,
36.66947,-121.64676,18800,
36.67091,-121.63933,19800,
38.84419,-121.54368,14900,
38.91015,-121.54323,16000,
38.97244,-121.5433,16000,
38.97244,-121.5433,16000,
38.97759,-121.54326,17300,
39.07731,-121.54134,19600,
39.09149,-121.54096,36000,
39.10253,-121.55056,38500,
39.11331,-121.55933,42000,
39.12447,-121.57713,45500,
39.12868,-121.58403,56000,
39.13553,-121.58982,48000,
39.13798,-121.5902,37000,
39.14022,-121.59052,32000,
39.14657,-121.5891,14300,
39.15064,-121.58738,22000,
39.15525,-121.58805,19500,
39.15783,-121.58898,13200,
39.16995,-121.58995,12700,
39.21921,-121.60126,12000,
39.30831,-121.59539,11600,
39.30831,-121.59539,11600,
39.32158,-121.59618,11800,
39.36453,-121.6079,11000,
39.43467,-121.60496,12400,
39.46397,-121.57893,13100,
39.49798,-121.57531,19200,
39.50837,-121.5732,25000,
39.52041,-121.57268,15500,
39.52467,-121.57364,20500,
39.53485,-121.58261,22200,
39.62488,-121.59352,2400,
39.64979,-121.55948,2550,
39.7255,-121.50306,1550,
39.8627,-121.38734,1450,
39.8627,-121.38734,1450,
40.03746,-120.98472,2600,
39.95167,-120.95996,4350,
39.93774,-120.94982,2500,
39.93774,-120.94982,3750,
39.93774,-120.94982,5000,
39.93774,-120.94982,9800,
39.93774,-120.94982,2800,
39.93774,-120.94982,4800,
39.9375,-120.9393,9800,
39.9379,-120.93763,10000,
39.93441,-120.9111,7700,
39.93503,-120.88302,2750,
39.78448,-120.62008,3050,
39.80566,-120.47915,5200,
39.81059,-120.46936,6000,
39.81419,-120.45839,3650,
39.8212,-120.39237,2950,
39.80451,-120.1781,3600,
39.79766,-120.13961,3700,
39.79077,-120.10882,3700,
39.79077,-120.10882,3700,
39.77517,-120.03897,3700,
39.77517,-120.03897,81000,
34.06157,-117.78947,81500,
34.05782,-117.78545,83000,
34.05344,-117.78125,80000,
34.05029,-117.7779,80000,
34.03179,-117.7583,80000,
34.02424,-117.75027,100000,
34.02026,-117.74593,101000,
34.02026,-117.74593,99000,
34.01153,-117.73378,103000,
34.001,-117.72403,89000,
33.98289,-117.70908,76000,
33.96833,-117.69009,70000,
33.94793,-117.67463,73000,
33.93072,-117.65949,66000,
33.92433,-117.6553,66000,
33.92433,-117.6553,66000,
33.88355,-117.64053,66000,
33.93984,-117.96793,35100,
33.93992,-117.97653,30600,
33.93992,-117.97653,30600,
33.94389,-117.99213,37000,
33.94878,-118.00645,43000,
33.96313,-118.03267,40000,
33.96789,-118.04127,28000,
33.98995,-118.06408,41500,
33.99346,-118.0693,33500,
33.99386,-118.06991,33500,
33.99442,-118.0707,33500,
33.5386,-117.6746,34800,
33.55812,-117.68549,38700,
33.57358,-117.70625,47500,
33.58039,-117.7209,56600,
33.59056,-117.74987,66700,
33.60253,-117.78633,66700,
33.62271,-117.82711,67200,
33.6308,-117.84148,64100,
33.65567,-117.86529,173700,
33.67326,-117.8861,116500,
33.68156,-117.89337,106700,
33.68156,-117.89337,106700,
33.50243,-117.65849,44900,
33.51128,-117.64347,41500,
33.51879,-117.62705,37100,
33.51407,-117.57784,31100,
33.54154,-117.54867,11600,
33.55756,-117.5487,10100,
33.6022,-117.45774,10500,
33.6022,-117.45774,10400,
33.65827,-117.37572,19000,
33.68917,-117.35504,26500,
33.6918,-117.33782,31500,
33.78238,-117.2238,26500,
33.75406,-117.189,25000,
33.74289,-117.16938,24500,
33.74313,-117.15408,30000,
33.73911,-117.07651,33000,
33.74389,-117.03278,28000,
33.74745,-116.98908,30000,
33.74755,-116.97169,29000,
33.74762,-116.95865,27000,
33.74765,-116.9499,25000,
33.74771,-116.9412,25000,
33.74775,-116.92378,19000,
33.74783,-116.89948,15500,
33.73916,-116.8408,3500,
33.70477,-116.72613,3300,
33.56952,-116.59139,3400,
33.67004,-116.40876,19000,
32.58381,-117.08604,31500,
32.58382,-117.08732,66000,
32.58385,-117.09265,49500,
32.58388,-117.10567,33500,
32.58392,-117.11411,22700,
32.58412,-117.11663,20300,
32.5844,-117.11777,16000,
32.58613,-117.12065,16700,
32.62491,-117.13772,20700,
32.67162,-117.16579,21800,
32.68013,-117.17599,21600,
32.6857,-117.17995,24300,
32.6873,-117.17904,24300,
32.68875,-117.17819,24300,
32.69169,-117.17645,27000,
32.69448,-117.17483,22300,
32.69448,-117.17483,25500,
32.69448,-117.17483,26000,
32.69448,-117.17483,30000,
32.69448,-117.17483,38000,
32.69448,-117.17483,32500,
32.69448,-117.17483,34000,
32.69263,-117.17023,65000,
32.69196,-117.16889,74000,
32.69063,-117.16692,74000,
32.69897,-117.14432,74000,
33.21042,-117.37781,46500,
33.21247,-117.36721,48500,
33.21477,-117.35734,48500,
33.21646,-117.35109,53000,
33.22377,-117.33117,46500,
33.22577,-117.32565,45000,
33.2279,-117.31824,44500,
33.2391,-117.29844,44500,
33.24369,-117.28979,40500,
33.24603,-117.28155,42000,
33.25793,-117.2375,35500,
33.28885,-117.22557,41000,
33.29434,-117.22221,18700,
33.31533,-117.1952,24800,
33.32806,-117.16267,26000,
33.33118,-117.15929,12900,
33.36446,-117.08532,6700,
33.36425,-117.06612,10800,
33.31891,-116.9929,7200,
33.28843,-116.9588,4000,
33.29366,-116.89952,2000,
33.23873,-116.76878,1500,
33.19975,-116.71028,1500,
37.76987,-122.22117,20000,
37.77213,-122.2174,14300,
37.77303,-122.21616,14300,
33.177,-117.35131,73000,
33.18115,-117.33992,119000,
33.18168,-117.32691,135000,
33.18312,-117.29667,125000,
33.18798,-117.27954,129000,
33.19463,-117.25442,124000,
33.18915,-117.23943,129000,
33.1812,-117.23041,127000,
33.16721,-117.21482,133000,
33.15016,-117.19828,136000,
33.14415,-117.1913,137000,
33.13794,-117.17665,162000,
33.13715,-117.16365,163000,
33.13871,-117.14123,162000,
33.13213,-117.1215,160000,
33.12707,-117.10481,81000,
33.13065,-117.09301,55000,
33.13222,-117.08616,31500,
33.13029,-117.08532,32500,
33.12696,-117.08385,30000,
33.12867,-117.07837,17400,
33.13311,-117.06796,21600,
33.13062,-117.06711,19200,
33.12719,-117.06552,19000,
33.12402,-117.06287,17500,
33.11142,-117.0564,14500,
33.10925,-117.04996,15300,
33.10736,-117.04503,12400,
33.09774,-117.02099,9600,
33.09883,-117.01818,9600,
33.09432,-117.00251,7000,
33.09171,-116.95422,8800,
33.07016,-116.88478,9100,
33.05853,-116.8715,10300,
33.04758,-116.87111,10100,
33.04204,-116.8686,22400,
33.04374,-116.86543,22000,
33.04459,-116.8639,17700,
33.04545,-116.86234,15800,
33.04823,-116.85781,9200,
33.05114,-116.8448,7300,
33.08565,-116.79181,5400,
33.1092,-116.67395,4000,
33.07813,-116.61726,4450,
33.07858,-116.60241,4850,
33.07645,-116.59863,3850,
33.077,-116.59024,2250,
33.09612,-116.59404,1250,
33.09678,-116.47532,1150,
33.09853,-116.47087,1050,
33.13563,-116.37999,880,
33.15737,-116.24454,1250,
33.13223,-116.08106,1250,
33.13223,-116.08106,670,
32.99922,-115.58891,4050,
33.00055,-115.52642,5500,
32.99946,-115.51002,5900,
32.97863,-115.50133,3700,
32.97459,-115.44873,3450,
32.97414,-115.40799,1550,
32.97476,-115.3238,1300,
32.99746,-115.0713,1400,
33.08549,-114.91136,1550,
33.42934,-114.73226,1500,
33.43373,-114.73248,1500,
33.43373,-114.73248,1500,
33.4781,-114.73098,1800,
33.50709,-114.70882,1700,
33.50702,-114.65601,1900,
33.52544,-114.65626,2800,
33.60671,-114.65764,2800,
33.61011,-114.65778,2800,
32.82694,-116.6255,4800,
32.84131,-116.61282,2700,
32.85244,-116.59446,2350,
32.95959,-116.57913,1600,
33.01091,-116.5612,1750,
33.1092,-116.67395,3050,
33.19979,-116.71028,2500,
33.24935,-116.67396,1800,
33.2795,-116.63331,1700,
33.35064,-116.73725,2000,
33.38843,-116.79325,1900,
33.42685,-116.83676,1750,
33.42685,-116.83676,1750,
33.4422,-116.86343,7600,
33.46391,-116.91452,8000,
33.55263,-117.14038,25600,
33.59063,-117.12649,22800,
33.70727,-117.08492,8300,
33.74762,-116.95863,16500,
33.75851,-116.95869,11800,
33.84545,-117.00396,26500,
33.90959,-116.9815,25000,
33.927,-116.97715,26500,
37.76761,-122.40518,163000,
37.77546,-122.40564,173000,
37.77546,-122.40564,121000,
37.77546,-122.40564,123000,
37.77546,-122.40564,85000,
37.77546,-122.40564,121000,
37.77546,-122.40564,120000,
37.77546,-122.40564,246000,
37.77546,-122.40564,246000,
37.82436,-122.3137,246000,
37.82485,-122.30859,144000,
37.8252,-122.3057,144000,
37.83764,-122.2965,270000,
37.84903,-122.29896,263000,
37.86658,-122.30374,261000,
37.87775,-122.3072,268000,
37.88748,-122.30913,172000,
37.89791,-122.30927,172000,
37.89791,-122.30927,172000,
37.90069,-122.31066,175000,
37.91078,-122.31728,183000,
37.92065,-122.31776,169000,
37.92523,-122.32072,195000,
37.93244,-122.32584,192000,
37.93726,-122.32615,198000,
37.94346,-122.3238,188000,
37.94873,-122.32609,195000,
37.95598,-122.32989,186000,
37.96589,-122.32297,188000,
37.97619,-122.31844,173000,
37.98497,-122.31561,181000,
37.99342,-122.30164,185000,
37.99699,-122.28624,170000,
38.01507,-122.26933,118000,
38.02239,-122.26252,110000,
38.04516,-122.23815,112000,
38.05203,-122.22858,109000,
38.06098,-122.22575,109000,
38.06098,-122.22575,109000,
38.07618,-122.23186,102000,
38.08522,-122.23294,111000,
38.09132,-122.23051,134000,
38.10079,-122.22976,138000,
38.10588,-122.22969,139000,
38.10965,-122.22965,141000,
38.12311,-122.22994,131000,
38.13906,-122.22009,119000,
38.15505,-122.21472,119000,
38.15505,-122.21472,119000,
38.16842,-122.20146,119000,
38.16842,-122.20146,119000,
38.16941,-122.20006,121000,
38.20192,-122.15721,120000,
38.20828,-122.1499,151000,
38.21668,-122.13788,187000,
38.22283,-122.12892,202000,
38.24005,-122.09202,180000,
38.24912,-122.07046,169000,
38.25832,-122.06244,183000,
38.27338,-122.04971,166000,
38.29515,-122.03405,170000,
38.33664,-122.01668,169000,
38.34637,-121.99713,158000,
38.35081,-121.98573,153000,
38.36213,-121.96833,141000,
38.37335,-121.95332,115000,
38.44584,-121.85869,113000,
38.47303,-121.82376,113000,
38.52105,-121.76889,119000,
38.53764,-121.7385,119000,
38.53764,-121.7385,119000,
38.54551,-121.72693,120000,
38.5526,-121.69427,135000,
38.56337,-121.63902,139000,
38.57424,-121.57773,150000,
38.57575,-121.56495,83000,
38.592,-121.55215,90000,
38.59828,-121.54795,90000,
38.59828,-121.54795,87000,
38.61525,-121.53543,84000,
38.62498,-121.51712,137000,
38.63377,-121.50042,134000,
38.64071,-121.47743,136000,
38.64139,-121.45692,134000,
38.64281,-121.42916,128000,
38.63736,-121.41167,130000,
38.64006,-121.39916,128000,
38.64523,-121.38318,115000,
38.6462,-121.37741,215000,
38.66101,-121.36004,194000,
38.68285,-121.33641,179000,
38.70743,-121.30952,180000,
38.72175,-121.29369,180000,
38.72175,-121.29369,180000,
38.72467,-121.29046,173000,
38.74408,-121.27073,165000,
38.75856,-121.26132,169000,
38.76568,-121.25548,155000,
38.76984,-121.24879,115000,
38.78838,-121.22277,91000,
38.80288,-121.20554,91000,
38.81671,-121.18908,84000,
38.83398,-121.1685,80000,
8.87365,-121.13147,78000,
38.87819,-121.12585,80000,
38.8931,-121.08407,81000,
38.89733,-121.07808,76000,
38.90004,-121.07486,61000,
38.90328,-121.07172,59000,
38.91646,-121.06253,57000,
38.9235,-121.05739,51000,
38.93329,-121.055,51000,
38.94535,-121.04614,46500,
38.95747,-121.03321,46000,
38.96976,-121.01774,39000,
39.01852,-120.98261,37500,
39.02796,-120.977,37500,
39.03812,-120.97331,35500,
39.04472,-120.97403,31500,
39.07851,-120.95987,30500,
39.09579,-120.94954,26000,
39.14717,-120.90738,26000,
39.14992,-120.89824,26000,
39.17517,-120.85799,26000,
39.18467,-120.84771,26000,
39.18818,-120.83209,25800,
39.20168,-120.81221,25300,
39.20911,-120.78652,25300,
39.21463,-120.77693,25300,
39.23725,-120.7528,25000,
39.28387,-120.70412,24800,
39.29267,-120.67987,24800,
39.30403,-120.65376,24800,
39.30403,-120.65376,24800,
39.30403,-120.65376,24800,
39.31589,-120.61782,24800,
39.3229,-120.6037,27400,
39.3229,-120.6037,13500,
39.3229,-120.6037,13900,
39.3229,-120.6037,27400,
39.3229,-120.6037,27400,
9.30991,-120.54406,27200,
39.31187,-120.5016,26000,
39.31424,-120.44598,25600,
39.31617,-120.43637,25600,
39.31617,-120.43637,25600,
39.31617,-120.43637,12900,
39.31617,-120.43637,13000,
39.31617,-120.43637,13000,
39.31617,-120.43637,13900,
39.31617,-120.43637,13800,
39.31617,-120.43637,13700,
39.32429,-120.22582,29800,
39.3231,-120.20812,34400,
39.3252,-120.19339,32700,
39.33654,-120.17438,26800,
39.35545,-120.14599,25900,
39.38406,-120.08381,25700,
39.39429,-120.0255,25600,
39.42227,-120.03521,25500,
39.44514,-120.01042,25500,
39.44514,-120.01042,25500,
39.46843,-120.00271,25500,
37.34257,-121.92579,27500,
37.3446,-121.93247,23600,
37.35344,-121.93917,18100,
37.3548,-121.94605,24100,
37.35235,-121.95948,28000,
37.35233,-121.99567,41000,
37.35289,-122.01366,41000,
37.36762,-122.03211,33000,
37.36906,-122.03683,37000,
37.37817,-122.06764,49000,
37.3801,-122.07237,45000,
37.38577,-122.08389,38500,
37.3924,-122.09571,42000,
37.40127,-122.11363,42000,
37.41038,-122.12327,46000,
37.42258,-122.14113,41000,
37.4373,-122.16007,37500,
37.44198,-122.16534,38000,
37.44688,-122.17184,30000,
37.44688,-122.17184,30000,
37.45357,-122.183,28500,
37.46214,-122.20017,30500,
37.47646,-122.22179,37000,
37.4863,-122.23503,28000,
37.49361,-122.24427,26500,
37.50727,-122.26029,30500,
37.50864,-122.26192,24500,
37.53686,-122.2973,35000,
37.55028,-122.31201,50000,
37.56297,-122.32593,31500,
37.56445,-122.32737,28500,
37.57458,-122.34316,20700,
37.58424,-122.36635,20900,
37.59849,-122.38739,33300,
37.60753,-122.39869,20700,
37.62108,-122.41127,28500,
37.62879,-122.41657,35500,
37.63356,-122.41944,41500,
37.65513,-122.43435,32500,
37.66657,-122.45131,15700,
37.67348,-122.45455,30000,
37.68955,-122.46597,27500,
37.70507,-122.46217,26500,
37.70597,-122.46133,14800,
37.70827,-122.45901,14800,
37.70827,-122.45901,22700,
37.71076,-122.45637,22700,
33.93071,-117.65947,25000,
33.95331,-117.6504,21000,
33.98303,-117.65072,23000,
34.01934,-117.65081,30000,
34.0304,-117.65086,31000,
34.03379,-117.65088,29000,
34.05498,-117.65096,26000,
34.06336,-117.65101,28000,
34.07064,-117.65103,30500,
34.07802,-117.65106,30500,
34.08734,-117.6511,35000,
37.32452,-122.39986,1350,
37.32684,-122.38652,1350,
37.31196,-122.27631,1800,
37.31913,-122.27432,1850,
37.38635,-122.26454,5200,
37.40724,-122.25694,5100,
37.42604,-122.26618,6200,
37.42956,-122.25398,14200,
37.42922,-122.2503,15800,
37.43518,-122.2437,31000,
37.44864,-122.23158,28000,
37.45963,-122.22619,36500,
37.47643,-122.22179,46000,
37.48119,-122.21903,43500,
37.48334,-122.18065,29000,
37.48204,-122.15027,54000,
37.48626,-122.14283,61000,
37.53522,-122.07543,61000,
37.54032,-122.0675,51000,
37.55172,-122.05233,68000,
37.56348,-122.03852,68000,
37.54669,-122.02289,29500,
37.56066,-122.01174,29000,
37.55831,-122.00715,9600,
37.56432,-121.97949,24500,
37.57652,-121.9716,14100,
37.59785,-121.94691,12600,
37.5929,-121.88227,6700,
37.59276,-121.87018,27500,
37.63748,-121.79876,11900,
37.65211,-121.80559,21200,
37.65598,-121.80564,21200,
37.66093,-121.80551,20000,
37.67395,-121.80531,25000,
37.68898,-121.80571,26000,
37.69612,-121.80544,26000,
38.16061,-121.68741,2850,
38.16881,-121.68019,1150,
38.18676,-121.66176,160,
38.24302,-121.65925,230,
38.29135,-121.63102,190,
38.31369,-121.63062,300,
38.31369,-121.63062,350,
38.34261,-121.58491,1150,
38.41438,-121.58281,1300,
38.44682,-121.58288,1600,
38.50446,-121.58218,1600,
37.24164,-121.769,48000,
37.24165,-121.77234,66000,
37.24006,-121.78318,81000,
37.24287,-121.80392,102000,
37.25077,-121.83693,134000,
37.2555,-121.85889,116000,
37.25568,-121.87555,107000,
37.25062,-121.91021,117000,
37.25097,-121.93135,119000,
37.25451,-121.95129,62000,
37.25572,-121.9559,101000,
37.25857,-121.96417,115000,
37.27669,-122.00722,103000,
37.3011,-122.03237,108000,
37.32286,-122.04997,126000,
37.33245,-122.05575,115000,
37.33725,-122.05952,122000,
37.35192,-122.06047,118000,
37.3782,-122.06765,107000,
37.3842,-122.06829,86000,
37.39094,-122.06852,83000,
37.40253,-122.06985,71000,
37.4087,-122.07084,71000,
37.40986,-122.07322,71000,
32.73068,-115.5004,5700,
32.73065,-115.53444,5000,
32.7307,-115.55042,3950,
32.75204,-115.55184,21000,
32.77427,-115.55223,28000,
32.78135,-115.55241,26000,
32.79187,-115.55252,24800,
32.79285,-115.55251,19600,
32.79655,-115.56146,17700,
32.79285,-115.55251,30000,
32.79838,-115.56995,27000,
32.79923,-115.56995,28000,
32.8014,-115.56989,29000,
32.80563,-115.56988,27500,
32.80933,-115.56988,22800,
32.82218,-115.56989,22100,
32.83836,-115.56977,21600,
32.84338,-115.56898,19900,
32.84748,-115.56897,17100,
32.85167,-115.56898,16200,
32.85371,-115.56899,15000,
32.85469,-115.56898,14900,
32.85896,-115.56985,12600,
32.91257,-115.57005,13100,
32.95949,-115.55083,18700,
32.97132,-115.54366,16200,
32.97302,-115.54177,12000,
32.97865,-115.5419,16600,
32.97865,-115.548,19100,
32.97858,-115.55243,13200,
32.98491,-115.57811,10800,
33.03735,-115.61732,10200,
33.03736,-115.62162,15500,
33.03736,-115.6259,11300,
33.03736,-115.63012,9700,
33.03723,-115.64731,13500,
33.12586,-115.85529,9400,
33.2519,-115.94394,14100,
33.27921,-115.96429,13500,
33.37435,-116.02575,12100,
33.40535,-116.04601,12700,
33.42616,-116.05994,12700,
33.42616,-116.05994,13000,
33.46254,-116.09132,13000,
33.56922,-116.09253,13000,
33.58998,-116.09598,16000,
33.64215,-116.13295,25000,
33.7077,-116.18105,26000,
33.71657,-116.19168,26000,
37.25551,-121.85893,112000,
37.27419,-121.86302,130000,
37.29413,-121.8728,127000,
37.30391,-121.87848,149000,
37.31338,-121.88612,170000,
37.32386,-121.89218,101000,
37.33663,-121.89761,115000,
37.34463,-121.9023,85000,
37.36802,-121.92373,82000,
37.37378,-121.92796,82000,
37.98461,-121.25013,24100,
37.98829,-121.24442,17000,
38.0009,-121.225,12300,
38.00549,-121.21919,10800,
38.03552,-121.18714,6500,
38.05802,-121.18868,9000,
38.10171,-121.17823,9800,
38.13763,-121.16278,14300,
38.15728,-121.15437,15600,
38.1634,-121.15005,13500,
38.17844,-121.11517,10900,
38.19126,-121.08635,11700,
38.19783,-121.06815,13200,
38.23604,-121.05107,8100,
38.27438,-121.01639,8100,
38.27438,-121.01639,8100,
38.31988,-120.93776,6300,
38.33007,-120.90703,10600,
38.35967,-120.82124,12700,
38.34693,-120.77317,8100,
38.35273,-120.76526,8000,
38.41277,-120.6674,16300,
38.41311,-120.65524,11400,
38.41562,-120.61014,6700,
38.44461,-120.53236,5500,
38.4559,-120.53116,4350,
38.47524,-120.52559,3500,
38.5142,-120.48308,2000,
38.62815,-120.20872,2350,
38.70074,-120.07731,2500,
38.70267,-120.07245,2500,
38.70267,-120.07245,2500,
38.70499,-120.05092,2450,
38.6957,-119.99259,2450,
38.77637,-119.9189,2950,
38.77561,-119.82376,3300,
38.84708,-119.77902,3400,
38.64266,-119.52759,440,
38.68078,-119.59306,390,
38.68078,-119.59306,390,
38.66048,-119.72647,780,
38.69358,-119.77796,800,
38.69557,-119.78091,1300,
38.77637,-119.91892,2450,
38.78761,-119.94561,2450,
38.78761,-119.94561,2450,
38.79403,-120.01078,4250,
38.91348,-120.00459,16900,
38.91851,-120.01199,11200,
38.92172,-120.02148,4100,
38.93357,-120.0498,3800,
38.93356,-120.07595,4550,
38.9775,-120.10271,4200,
39.01588,-120.12371,3200,
39.06744,-120.12844,5200,
39.06744,-120.12844,5200,
39.07132,-120.14255,6600,
39.13258,-120.15759,7800,
39.14151,-120.15482,13200,
39.16775,-120.14519,11400,
39.16382,-120.15033,10600,
39.20481,-120.19944,10000,
39.31392,-120.20399,18400,
39.31613,-120.20425,18400,
39.31613,-120.20425,18400,
39.33872,-120.1698,4900,
39.3452,-120.173,4000,
39.39901,-120.18832,1800,
39.44625,-120.21431,1850,
39.44625,-120.21431,1850,
39.58955,-120.36703,1200,
39.62411,-120.4353,980,
39.66464,-120.43327,500,
39.70642,-120.53124,720,
39.70642,-120.53124,720,
39.76259,-120.61303,3600,
40.03869,-120.9839,1950,
40.10965,-120.90739,2300,
40.1394,-120.94478,2750,
40.13942,-120.94799,1750,
40.17197,-121.08061,1100,
40.21633,-121.18924,1550,
40.27874,-121.25355,1550,
40.36628,-121.53599,350,
40.42489,-121.53424,350,
40.68064,-121.4246,1500,
40.93814,-121.60664,1950,
41.02494,-121.62456,1550,
41.14933,-121.64905,1200,
41.1833,-121.71805,1200,
41.1833,-121.71805,1200,
41.2639,-121.94105,1250,
41.2511,-122.1345,2500,
41.28501,-122.30205,3100,
33.98458,-118.44263,33000,
33.9834,-118.43796,57000,
33.98171,-118.42883,66000,
33.98518,-118.41417,83000,
33.98774,-118.39904,35000,
33.98879,-118.38947,35000,
33.91735,-117.96808,45600,
33.91733,-117.94617,46700,
33.91738,-117.93303,45500,
33.91657,-117.9004,63600,
33.9119,-117.88797,67500,
33.91076,-117.88357,48000,
33.91105,-117.86376,42900,
33.90974,-117.85238,48500,
33.87385,-117.80338,44800,
33.86841,-117.79459,38700,
33.86309,-117.79035,57800,
33.8597,-117.79041,62900,
33.8544,-117.79052,62900,
33.87277,-118.29089,54500,
33.87275,-118.28483,181500,
33.87328,-118.26609,185000,
33.8734,-118.24868,188000,
33.87371,-118.23599,195500,
33.87347,-118.21664,203000,
33.87349,-118.2142,217500,
33.87266,-118.20238,222500,
33.87556,-118.19288,266000,
33.87607,-118.16879,267500,
33.87609,-118.16009,261000,
33.87704,-118.15133,259500,
33.87714,-118.14237,248500,
33.8771,-118.1339,261000,
33.87619,-118.12526,261000,
33.87637,-118.10255,276000,
33.87645,-118.08264,270500,
33.87649,-118.07296,268500,
33.87541,-118.06395,249500,
33.8732,-118.06025,248000,
33.86396,-118.04623,241000,
33.86208,-118.0419,241000,
33.86208,-118.0419,235000,
33.85888,-118.03409,254400,
33.85663,-118.0283,259000,
33.85598,-118.01118,265000,
33.85607,-117.99779,263500,
33.85607,-117.99779,198500,
33.85607,-117.99779,248500,
33.85607,-117.99779,199000,
33.85392,-117.95916,261700,
33.85416,-117.94176,273600,
33.85391,-117.924,265000,
33.85422,-117.9196,265000,
33.85387,-117.90671,258000,
33.85422,-117.88963,253000,
33.84973,-117.87583,223600,
33.84795,-117.85545,216000,
33.85115,-117.83799,231000,
33.84433,-117.82727,321000,
33.8509,-117.81439,302000,
33.85438,-117.79066,255000,
33.85438,-117.79066,233000,
33.85438,-117.79066,233100,
33.86671,-117.71975,259000,
33.86684,-117.71158,259000,
33.86684,-117.71158,259000,
33.86684,-117.71158,259200,
33.86968,-117.67178,233400,
33.86968,-117.67178,233400,
33.87874,-117.65742,253000,
33.88357,-117.64053,256000,
33.88075,-117.61325,257000,
33.88018,-117.60359,248000,
33.88189,-117.58254,255000,
33.88066,-117.57149,247000,
33.88009,-117.566,233000,
33.88191,-117.54725,219000,
33.88624,-117.51796,209000,
33.8973,-117.49279,182000,
33.89714,-117.48788,193000,
33.90005,-117.47341,186000,
33.90618,-117.45713,186000,
33.91472,-117.44206,173000,
33.92741,-117.41973,172000,
33.93578,-117.40501,168000,
33.94629,-117.38881,165000,
33.95349,-117.38383,165000,
33.9738,-117.37321,161000,
33.9799,-117.37017,153000,
33.98886,-117.36151,149000,
33.99333,-117.35729,149000,
37.46798,-122.43351,15500,
37.46786,-122.43016,24200,
37.49554,-122.36889,26000,
37.51146,-122.35026,22000,
37.50702,-122.33904,72000,
37.51189,-122.3308,62000,
37.52212,-122.3322,68000,
37.53271,-122.32965,70000,
37.5471,-122.32292,79000,
37.55028,-122.31199,97000,
37.55255,-122.3056,102000,
37.55627,-122.28562,120000,
37.56382,-122.27321,95000,
37.57341,-122.26263,95000,
37.60457,-122.19679,95000,
37.60457,-122.19679,95000,
37.6178,-122.15253,95000,
37.62819,-122.12101,102000,
37.63209,-122.11035,103000,
37.63627,-122.09995,116000,
37.64421,-122.09412,57000,
37.64946,-122.09141,54000,
37.66396,-122.08344,37000,
37.66876,-122.08082,36000,
32.71324,-117.14759,113000,
32.71315,-117.14025,127000,
32.71321,-117.13394,133000,
32.7147,-117.12616,147000,
32.7167,-117.11804,141000,
32.71818,-117.11048,129000,
32.71892,-117.10276,174000,
32.71818,-117.09357,173000,
32.71792,-117.08519,157000,
32.72369,-117.07619,162000,
32.72719,-117.07131,146000,
32.73665,-117.05605,146000,
32.74189,-117.05068,127000,
32.74482,-117.04286,136000,
32.74531,-117.03465,132000,
32.74631,-117.03112,132000,
32.74631,-117.03112,132000,
32.74631,-117.03112,86000,
32.75037,-117.00151,77000,
32.74668,-116.98999,66000,
32.74454,-116.97431,56000,
32.74478,-116.96446,42500,
32.73984,-116.95138,61000,
32.73959,-116.94284,16700,
32.7277,-116.90927,16100,
32.72084,-116.88127,10800,
32.67007,-116.82551,6200,
32.66809,-116.82358,6400,
32.64442,-116.78166,6400,
32.63168,-116.76401,6300,
32.59803,-116.64322,1800,
32.60505,-116.61323,1250,
32.62925,-116.47122,1750,
32.66297,-116.34,440,
32.66804,-116.30091,1450,
32.66904,-116.29136,1200,
32.6769,-116.29123,1200,
33.61091,-114.57077,2850,
33.66134,-114.57181,2000,
33.72722,-114.51656,1650,
34.07977,-114.48122,1450,
34.07977,-114.48122,1450,
34.18853,-114.57425,2400,
34.5579,-114.64518,5100,
34.87749,-114.75526,5700,
34.87805,-114.75538,2600,
34.94141,-114.82409,2850,
35.17594,-114.84931,2850,
40.93937,-123.63144,2750,
40.9408,-123.63156,1750,
40.98976,-123.63699,1750,
41.0447,-123.67252,3400,
41.06892,-123.68688,2000,
41.18667,-123.70468,470,
41.29993,-123.54701,850,
41.30296,-123.53624,850,
41.30352,-123.53144,500,
41.37711,-123.48814,410,
41.37711,-123.48814,180,
41.38328,-123.49361,190,
41.3858,-123.49344,190,
41.60857,-123.50136,190,
41.77015,-123.40324,400,
41.79075,-123.37951,1050,
41.79142,-123.37826,1850,
41.79279,-123.37649,1700,
41.79871,-123.37458,700,
41.86232,-123.31032,600,
41.83783,-123.18779,590,
41.77763,-123.03615,500,
41.83235,-122.59089,450,
41.86066,-122.56804,450,
41.41842,-122.38343,10400,
41.4229,-122.38731,6800,
41.43673,-122.38715,6300,
41.47285,-122.35156,3300,
41.63894,-122.18757,3250,
41.89451,-121.96377,3450,
41.95389,-121.92382,3400,
41.96699,-121.91816,4300,
42.00009,-121.89174,3500,
42.00335,-121.88912,3500,
32.72676,-116.026,1400,
32.72719,-116.02086,1400,
32.72494,-115.99544,1600,
32.67899,-115.6716,1750,
32.67922,-115.5858,2300,
32.67935,-115.55958,3600,
32.67923,-115.53302,8000,
32.67917,-115.51536,18400,
32.67914,-115.50523,17500,
32.67908,-115.4987,24700,
32.67912,-115.49619,26500,
32.67918,-115.49354,25500,
32.67923,-115.49068,23400,
32.67927,-115.48827,18700,
32.67933,-115.48253,9900,
32.68658,-115.46513,6000,
32.69353,-115.45539,10700,
32.69386,-115.43087,10700,
32.69381,-115.41376,10800,
32.69377,-115.37901,2200,
32.69381,-115.35427,1950,
32.69385,-115.33699,1750,
32.69441,-115.30765,1500,
32.69952,-115.27889,1500,
32.71065,-115.08931,1600,
35.01852,-118.95544,38500,
35.05789,-118.96791,40500,
35.09452,-118.97953,43000,
35.17281,-119.00431,42500,
35.20852,-119.01028,47500,
35.23754,-119.01524,50000,
35.26691,-119.02291,60000,
35.29586,-119.03048,88000,
35.31768,-119.03619,114000,
35.33947,-119.03958,140000,
35.35284,-119.03951,140000,
35.36834,-119.04184,143000,
35.38326,-119.04448,111000,
35.39998,-119.04483,111000,
35.40383,-119.04602,106000,
35.41233,-119.05498,78000,
35.42119,-119.06093,80000,
35.43497,-119.07626,65000,
35.44154,-119.08437,65000,
35.4997,-119.16345,58000,
35.52977,-119.18964,58000,
35.55848,-119.19737,56000,
35.60196,-119.21122,52000,
35.64567,-119.22033,52000,
35.67322,-119.22632,50000,
35.68259,-119.22851,52000,
35.68914,-119.22971,54000,
35.71801,-119.23723,54000,
35.74697,-119.24381,51000,
35.76138,-119.24905,47500,
35.77217,-119.25156,42000,
35.77588,-119.25243,47000,
35.79035,-119.25073,47000,
35.79035,-119.25073,44900,
35.83388,-119.26041,44500,
35.87742,-119.27049,41000,
35.92804,-119.28204,40000,
35.96434,-119.2906,38000,
35.97155,-119.29238,38000,
35.97837,-119.29582,39000,
36.00765,-119.30189,42000,
36.05128,-119.311,43000,
36.06594,-119.31422,45000,
36.12347,-119.32478,46000,
36.15115,-119.33107,45500,
36.15999,-119.33283,45500,
36.18218,-119.32857,48000,
36.19669,-119.32851,51000,
36.20747,-119.32851,53000,
36.22445,-119.33401,47000,
36.24022,-119.34561,46000,
36.25715,-119.35835,50000,
36.26664,-119.36384,52000,
36.29816,-119.38462,53000,
36.32627,-119.40689,55000,
36.32902,-119.4092,55000,
36.35054,-119.42688,53000,
36.45231,-119.4906,52000,
6.49005,-119.51856,55000,
36.50678,-119.54811,53000,
36.50788,-119.54969,53000,
36.50788,-119.54969,53000,
36.51794,-119.56144,57000,
36.5294,-119.57534,59000,
36.54702,-119.59625,65000,
36.56376,-119.61555,67000,
36.57569,-119.62867,78000,
36.60536,-119.66109,86000,
36.62664,-119.6844,88000,
36.63468,-119.69328,90000,
36.64094,-119.70006,82000,
36.66355,-119.72486,84000,
36.67408,-119.73667,77000,
6.67787,-119.74136,89000,
36.68894,-119.75467,84000,
36.69238,-119.75881,90000,
36.70664,-119.77379,100000
,36.71521,-119.7822,62000,
36.72537,-119.79296,78000,
36.73142,-119.79961,80000,
36.73447,-119.80295,92000,
36.74339,-119.81923,130000,
36.75017,-119.82484,124000,
36.75739,-119.82968,119000,
36.76454,-119.83407,111000,
36.77194,-119.83851,96000,
36.77873,-119.84518,92000,
36.791,-119.86077,94000,
36.79365,-119.86545,66000,
36.80808,-119.88684,62000,
36.8375,-119.92408,64000,
36.84306,-119.93259,64000,
36.84306,-119.93259,64000,
36.8511,-119.9466,60000,
36.88023,-119.97681,64000,
36.92363,-120.02188,64000,
36.9489,-120.04837,61000,
36.95488,-120.05792,64000,
36.96233,-120.06569,59000,
36.96405,-120.06748,66000,
36.97494,-120.07672,58000,
36.98168,-120.08415,63000,
36.99648,-120.10233,57000,
37.01826,-120.12888,53000,
37.04227,-120.15843,52000,
37.08389,-120.20885,38000,
37.09846,-120.21638,38000,
37.10554,-120.22452,38000,
37.12689,-120.25234,37500,
37.14169,-120.27439,37500,
37.15267,-120.29076,37500,
37.15267,-120.29076,37500,
37.28928,-120.4578,42500,
37.29517,-120.46874,42500,
37.29519,-120.47784,52000,
37.29652,-120.48249,46000,
37.30097,-120.49461,51000,
37.30329,-120.50096,55000,
7.31327,-120.51823,57000,
37.33386,-120.5761,48000,
37.34022,-120.5939,50000,
37.34462,-120.6133,50000,
37.35074,-120.62366,51000,
37.38483,-120.71303,55000,
37.39004,-120.73585,54000,
37.40917,-120.75238,66000,
37.43709,-120.78343,65000,
37.45743,-120.80724,61000,
37.46336,-120.8223,64000,
37.46336,-120.8223,61000,
37.4738,-120.84881,71000,
37.49242,-120.86987,81000,
37.50716,-120.87773,74000,
37.52194,-120.88561,68000,
37.53747,-120.89259,80000,
37.54791,-120.90558,102000,
37.57465,-120.93728,94000,
37.59464,-120.9604,99000,
37.60956,-120.97685,103000,
37.61841,-120.99313,110000,
37.6272,-120.99684,115000,
37.63545,-121.00237,115000,
37.63921,-121.00686,122000,
37.64586,-121.0163,126000,
37.66649,-121.03199,128000,
37.68356,-121.05313,109000,
37.70004,-121.07132,110000,
37.7091,-121.08116,111000,
37.72596,-121.10343,112000,
37.73033,-121.10997,112000,
37.73033,-121.10997,112000,
37.73894,-121.12023,116000,
37.74517,-121.13088,129000,
37.75064,-121.13926,113000,
37.77775,-121.18339,83000,
37.7884,-121.18892,66000,
37.82117,-121.2155,70000,
37.85991,-121.21869,69000,
37.93378,-121.234,87000,
37.94138,-121.23493,94000,
37.95269,-121.2385,96000,
37.96182,-121.24198,99000,
37.96994,-121.24579,105000,
37.98462,-121.25011,91000,
37.99215,-121.25271,86000,
38.00319,-121.25729,96000,
38.02119,-121.25818,71000,
38.03599,-121.25838,76000,
38.10913,-121.25942,68000,
38.11617,-121.2579,66000,
38.13759,-121.25775,66000,
38.14564,-121.2612,68000,
38.1602,-121.26175,62000,
38.17468,-121.2623,62000,
38.20443,-121.26308,61000,
38.24573,-121.28806,62000,
38.24573,-121.28806,60000,
38.24839,-121.28975,59000,
38.25432,-121.29353,62000,
38.26426,-121.29986,61000,
38.26866,-121.30171,62000,
38.28024,-121.30607,61000,
38.2909,-121.31214,64000,
38.30244,-121.31787,64000,
38.32504,-121.32717,67000,
38.34385,-121.33587,68000,
38.36419,-121.34945,68000,
38.37638,-121.36202,66000,
38.4091,-121.38869,103000,
38.42422,-121.39565,123000,
38.43876,-121.40216,133000,
38.45676,-121.41051,153000,
38.47078,-121.41911,126000,
38.47428,-121.42285,162000,
38.49611,-121.44598,179000,
38.50991,-121.45968,178000,
38.51979,-121.46491,172000,
38.52492,-121.46764,191000,
38.54118,-121.47381,211000,
38.55882,-121.47352,211000,
38.6855,-121.54013,40000,
38.71435,-121.54042,36000,
38.73633,-121.5404,36000,
38.73633,-121.5404,36000,
38.74998,-121.54047,30000,
38.85622,-121.54649,15100,
38.89989,-121.58532,16100,
38.91633,-121.60577,15800,
39.00366,-121.61237,13700,
39.0038,-121.6317,16500,
39.06903,-121.63342,17800,
39.07613,-121.63488,19000,
39.0982,-121.63448,23200,
39.11275,-121.63467,29000,
39.12762,-121.63452,33000,
39.13297,-121.63451,29500,
39.13832,-121.63461,29500,
39.1419,-121.63456,19800,
39.15166,-121.63546,19400,
39.1899,-121.63488,18700,
39.21796,-121.64162,18200,
39.27615,-121.66125,18000,
39.30512,-121.67264,14600,
39.30512,-121.67264,14600,
39.34385,-121.68686,18100,
39.35775,-121.68792,18500,
39.36319,-121.68789,22200,
39.36701,-121.68791,14500,
39.41498,-121.68809,10700,
39.46518,-121.68842,10400,
39.49415,-121.68865,9100,
39.53782,-121.68873,9200,
39.64227,-121.71616,26000,
39.66576,-121.74384,24000,
39.71461,-121.80051,49500,
39.72607,-121.80925,70000,
39.73704,-121.82037,73000,
39.75418,-121.84512,41500,
39.75986,-121.85517,28000,
39.77447,-121.87335,18800,
39.79686,-121.90271,14700,
39.81392,-121.91816,11600,
39.86342,-121.95999,11500,
39.88358,-121.97638,11200,
39.88358,-121.97638,11200,
39.93237,-122.0337,6400,
39.94057,-122.04668,6600,
40.01206,-122.09552,6600,
40.02783,-122.09989,7700,
40.12823,-122.12238,8500,
40.18569,-122.18604,8500,
34.03411,-118.22119,136000,
34.04298,-118.22107,125000,
34.04708,-118.22136,120000,
34.05205,-118.22419,206000,
34.0536,-118.23274,202000,
34.05472,-118.2388,273000,
34.05631,-118.24135,284000,
34.06266,-118.24881,273000,
34.06962,-118.26097,296000,
34.07196,-118.26676,293000,
34.07516,-118.27426,282000,
34.07708,-118.28119,262000,
34.0799,-118.29172,235000,
34.08336,-118.29833,212000,
34.09079,-118.30647,187000,
34.09373,-118.30923,209000,
34.09984,-118.31552,192000,
34.10432,-118.32232,206000,
34.10785,-118.33062,227000,
34.11162,-118.33535,262000,
34.12874,-118.34696,250000,
34.13768,-118.36274,235000,
34.14679,-118.37013,227000,
34.14679,-118.37013,140000,
34.14679,-118.37013,140000,
34.15443,-118.39627,257000,
34.15673,-118.41364,262000,
34.15562,-118.43101,267000,
34.15688,-118.44841,283000,
34.15688,-118.44841,155000,
34.15688,-118.44841,155000,
34.16539,-118.4922,298000,
34.17039,-118.50092,300000,
34.17118,-118.51829,290000,
34.17323,-118.53583,282000,
34.17355,-118.55326,271000,
34.17227,-118.57074,261000,
34.16803,-118.58809,256000,
34.16943,-118.59729,229000,
34.1707,-118.6056,197000,
34.16914,-118.61243,197000,
34.16205,-118.63032,211000,
34.15932,-118.63776,192000,
34.15336,-118.65209,186000,
34.14838,-118.69792,173000,
34.14086,-118.70964,178000,
34.13819,-118.72417,179000,
34.14314,-118.7381,173000,
34.14605,-118.76121,171000,
34.14692,-118.78109,171000,
34.14903,-118.80398,174000,
34.15236,-118.81472,174000,
34.15236,-118.81472,174000,
34.15754,-118.82499,176000,
34.16597,-118.83769,189000,
34.17609,-118.85968,174000,
34.17736,-118.87607,174000,
34.18352,-118.89153,171000,
34.18437,-118.91118,156000,
34.18442,-118.92564,141000,
34.18979,-118.93932,118000,
34.20519,-118.98338,130000,
34.21371,-119.00777,122000,
34.21679,-119.03409,125000,
34.21766,-119.05051,116000,
34.21918,-119.06979,133000,
34.22176,-119.10194,129000,
34.2221,-119.12682,125000,
34.22261,-119.14261,122000,
34.225,-119.15829,136000,
34.23193,-119.17328,129000,
34.23944,-119.18101,149000,
34.24352,-119.19275,139000,
34.25245,-119.21082,119000,
34.26221,-119.23072,89000,
34.26487,-119.23731,119000,
34.265,-119.2692,117000,
34.27243,-119.28279,113000,
34.27746,-119.29313,91000,
34.27903,-119.30604,70000,
34.28992,-119.3342,66000,
34.34303,-119.41599,67000,
34.37641,-119.47797,66000,
34.37641,-119.47797,66000,
34.38377,-119.4846,64000,
34.38831,-119.49785,66500,
34.39682,-119.51158,60600,
34.40116,-119.51649,65400,
34.4037,-119.52864,61600,
34.41072,-119.55285,62700,
34.4166,-119.58262,62900,
34.42124,-119.60147,64000,
34.42166,-119.61402,65700,
34.42242,-119.63155,71100,
34.42081,-119.63994,66100,
34.4226,-119.65462,76800,
34.4204,-119.67724,85300,
34.41836,-119.68962,94300,
34.41222,-119.69881,103000,
34.41623,-119.7071,117000,
34.42531,-119.72018,133000,
34.42801,-119.73375,132000,
34.43682,-119.75165,127000,
34.44124,-119.76002,118000,
34.44094,-119.76972,119000,
34.44148,-119.81298,79400,
34.43952,-119.83242,71000,
34.43769,-119.85284,65000,
34.43448,-119.87081,35400,
34.43247,-119.90806,31500,
34.46088,-120.00341,30200,
34.50921,-120.22593,23700,
34.60271,-120.19187,22900,
34.61212,-120.19017,21200,
34.61838,-120.18931,23400,
34.68158,-120.15696,30400,
34.74256,-120.27084,28800,
34.8654,-120.39615,40700,
34.89097,-120.41756,47000,
34.92358,-120.41789,59800,
34.93842,-120.41781,65000,
34.95298,-120.41727,61800,
34.96769,-120.42298,58000,
34.9813,-120.43143,64100,
34.98462,-120.43282,64100,
34.98462,-120.43282,64100,
34.99626,-120.43473,55800,
35.03688,-120.48461,55500,
35.07179,-120.51625,54800,
35.1165,-120.57386,49200,
35.12138,-120.58372,54400,
35.12421,-120.59313,57500,
35.13012,-120.60667,62900,
35.13615,-120.62193,69400,
35.13962,-120.63618,63100,
35.15093,-120.65463,65500,
35.16402,-120.68698,67800,
35.17941,-120.69909,64600,
35.19607,-120.69943,69200,
35.22389,-120.69152,64400,
35.2446,-120.68221,59600,
35.26607,-120.67351,68000,
35.2744,-120.67136,63100,
35.28665,-120.66357,55400,
35.28983,-120.65944,45400,
35.29186,-120.65335,38100,
35.2918,-120.64966,44200,
35.29294,-120.64342,44200,
35.38319,-120.63034,41900,
35.44352,-120.6383,44700,
35.46591,-120.65133,48800,
35.47657,-120.65841,53000,
35.48528,-120.6651,58600,
35.48846,-120.67062,58700,
35.49701,-120.683,56900,
35.5132,-120.69943,58300,
35.52653,-120.70455,59700,
35.54369,-120.71448,54600,
35.55426,-120.71217,55200,
35.56583,-120.70199,51500,
35.58935,-120.69556,60400,
35.61168,-120.69099,36300,
35.62798,-120.68659,34600,
35.64257,-120.68511,22600,
35.65293,-120.69238,22800,
35.68274,-120.69683,22000,
35.72195,-120.69783,21000,
35.7409,-120.69981,19200,
35.74774,-120.70045,19200,
35.77031,-120.70548,19600,
35.77501,-120.71198,20000,
35.79105,-120.73143,20000,
35.79105,-120.73143,19800,
35.79921,-120.74274,18400,
35.81541,-120.75462,17800,
35.86461,-120.81784,17600,
35.87389,-120.83555,15500,
35.94703,-120.87603,14700,
35.97551,-120.89945,14700,
36.01281,-120.92211,15100,
36.09376,-121.02148,15400,
36.12206,-121.02337,16700,
36.18748,-121.07223,16500,
36.20131,-121.11258,17100,
36.20327,-121.12928,17100,
36.20327,-121.12928,26800,
36.20327,-121.12928,26800,
36.20327,-121.12928,26800,
36.26153,-121.17929,23300,
36.31429,-121.23426,23400,
36.32376,-121.23816,28500,
36.32939,-121.24386,31500,
36.33941,-121.25492,33700,
36.4034,-121.31662,36700,
36.41945,-121.3237,36400,
36.43109,-121.33714,38200,
36.44901,-121.36289,37700,
36.46493,-121.38771,39300,
36.49337,-121.42733,36900,
36.51325,-121.43761,39000,
36.52355,-121.46415,42600,
36.56938,-121.518,43600,
36.62689,-121.58607,38100,
36.66082,-121.6229,48000,
36.66659,-121.62802,58500,
36.67086,-121.63911,66000,
36.67753,-121.64126,73900,
36.68697,-121.65253,62900,
36.69782,-121.6645,58900,
36.72202,-121.65984,59200,
36.73479,-121.65725,62600,
36.78959,-121.66755,83700,
36.79937,-121.66422,55500,
36.84569,-121.63486,59000,
36.85697,-121.63007,58000,
36.85697,-121.63007,60000,
36.85697,-121.63007,25000,
36.85697,-121.63007,25000,
36.88253,-121.56158,50000,
36.90468,-121.55668,50000,
36.91737,-121.54803,52000,
36.91737,-121.54803,52000,
36.96128,-121.55106,75000,
36.98662,-121.55847,70000,
37.02243,-121.56667,99000,
37.05939,-121.58456,109000,
37.08887,-121.5994,110000,
37.11926,-121.62629,118000,
37.13155,-121.63355,124000,
37.15308,-121.65259,132000,
37.24204,-121.76926,131000,
37.25722,-121.79629,157000,
37.2818,-121.80844,170000,
37.30313,-121.81673,208000,
37.31853,-121.83161,245000,
37.33959,-121.85197,190000,
37.34989,-121.86169,150000,
37.3543,-121.86627,179000,
37.36301,-121.89153,182000,
37.36415,-121.90187,139000,
37.36888,-121.90908,131000,
37.37176,-121.91696,146000,
37.37377,-121.92791,191000,
37.37674,-121.94173,186000,
37.382,-121.96392,191000,
37.38571,-121.97686,178000,
37.39117,-121.99592,171000,
37.39565,-122.01278,166000,
37.39894,-122.02776,153000,
37.40067,-122.03566,174000,
37.40405,-122.05106,175000,
37.40765,-122.06635,172000,
37.40882,-122.0703,219000,
37.41469,-122.08375,219000,
37.42101,-122.09246,209000,
37.4283,-122.10138,226000,
37.44894,-122.12307,214000,
37.45279,-122.12786,214000,
37.45279,-122.12786,214000,
37.46047,-122.1409,208000,
37.46891,-122.15525,196000,
37.48336,-122.18068,213000,
37.48894,-122.21283,207000,
37.49634,-122.23311,218000,
37.51394,-122.25612,219000,
37.52631,-122.27013,229000,
37.54455,-122.28792,227000,
37.55344,-122.2962,260000,
37.56262,-122.30506,260000,
37.571,-122.31413,257000,
37.58041,-122.32439,246000,
37.58435,-122.32861,244000,
37.58999,-122.36111,242000,
37.60255,-122.38039,236000,
37.61399,-122.39696,229000,
37.63578,-122.40362,239000,
37.64973,-122.40669,220000,
37.65305,-122.40699,209000,
37.66273,-122.40069,196000,
37.67021,-122.3924,196000,
37.70255,-122.39367,196000,
37.70825,-122.39495,196000,
37.70825,-122.39495,196000,
37.71877,-122.3995,213000,
37.72353,-122.40112,221000,
37.73525,-122.40678,232000,
37.74803,-122.40413,227000,
37.76398,-122.405,220000,
37.76595,-122.40508,234000,
37.78102,-122.42044,47000,
37.78192,-122.42062,46000,
37.79043,-122.42234,43000,
37.80134,-122.42457,35500,
37.7988,-122.44467,45000,
37.80383,-122.45281,53000,
37.80317,-122.46911,105000,
37.80719,-122.47559,105000,
37.8255,-122.47947,105000,
37.8255,-122.47947,105000,
37.83574,-122.48478,100000,
37.85279,-122.49237,102000,
37.86038,-122.50198,101000,
37.87145,-122.50722,126000,
37.88015,-122.51624,124000,
37.8891,-122.5167,122000,
37.90274,-122.51571,158000,
37.92594,-122.5146,161000,
37.93011,-122.51574,162000,
37.93862,-122.51644,164000,
37.94358,-122.51514,142000,
37.96219,-122.51019,186000,
37.96738,-122.51858,135000,
37.97572,-122.52067,187000,
37.98828,-122.52703,191000,
37.99421,-122.53225,179000,
38.00709,-122.54149,171000,
38.02106,-122.53922,163000,
38.03367,-122.53711,162000,
38.0481,-122.53232,150000,
38.06624,-122.53742,157000,
38.08,-122.54621,135000,
38.09222,-122.55914,114000,
38.105,-122.56222,97000,
38.11766,-122.56511,90000,
38.17668,-122.59423,90000,
38.18524,-122.60082,90000,
38.18524,-122.60082,90000,
38.21643,-122.60335,90000,
38.22386,-122.612,87000,
38.23325,-122.61788,97000,
38.24689,-122.62777,98000,
38.27206,-122.66996,105000,
38.28363,-122.685,103000,
38.30351,-122.70809,101000,
38.32117,-122.71364,96000,
38.33107,-122.71279,101000,
38.34773,-122.71303,105000,
38.36507,-122.71244,112000,
38.37195,-122.71434,107000,
38.38626,-122.71618,111000,
38.41447,-122.71601,124000,
38.42188,-122.71534,146000,
38.43117,-122.71539,120000,
38.44542,-122.72368,124000,
38.4597,-122.72622,113000,
38.4706,-122.72938,89000,
38.47462,-122.73109,88000,
38.4813,-122.73529,94000,
38.49623,-122.75632,80000,
38.5067,-122.76988,84000,
38.51109,-122.77531,79000,
38.52579,-122.79004,65000,
38.54669,-122.80791,51000,
38.59466,-122.85253,49500,
38.60398,-122.86842,34500,
38.60711,-122.87285,39000,
38.62602,-122.87817,30000,
38.65932,-122.87437,29000,
38.6798,-122.88067,28500,
38.6969,-122.89087,25000,
38.7136,-122.91907,25000,
38.75894,-122.9755,24500,
38.76747,-122.99458,24500,
38.78345,-123.00951,18200,
38.80036,-123.0131,14900,
38.82795,-123.01434,13900,
38.85257,-123.03191,13900,
38.85257,-123.03191,14700,
38.95287,-123.09855,14700,
38.97009,-123.11645,14700,
38.97123,-123.11659,14800,
39.08367,-123.18203,14900,
39.09732,-123.18957,15500,
39.10922,-123.19514,17800,
39.136,-123.1957,22000,
39.14487,-123.19636,22600,
39.15161,-123.19684,28500,
39.17076,-123.21081,28500,
39.19128,-123.21057,27300,
39.23415,-123.20828,25500,
39.2399,-123.20749,19800,
39.26185,-123.22283,14700,
39.38772,-123.34527,18000,
39.40411,-123.35164,23200,
39.42006,-123.35489,6900,
39.55521,-123.43022,6600,
39.67959,-123.47596,6600,
39.68779,-123.48311,6000,
39.83464,-123.6316,6000,
39.84855,-123.70765,5900,
39.86815,-123.71356,5900,
39.94421,-123.77933,5900,
39.96597,-123.7951,4400,
40.00178,-123.78333,4400,
40.00178,-123.78333,4400,
40.0029,-123.78319,4600,
40.02332,-123.79404,4600,
40.06517,-123.78585,5600,
40.09871,-123.79677,3700,
40.10403,-123.79562,4700,
40.14087,-123.80853,6400,
40.18198,-123.77608,5600,
40.21775,-123.81855,5000,
40.25095,-123.83185,5100,
40.2664,-123.87026,5300,
40.32176,-123.92128,5300,
40.34492,-123.93148,5300,
40.35308,-123.92782,5400,
40.39749,-123.94773,5750,
40.43496,-123.98803,5650,
40.43988,-124.03186,5900,
40.45894,-124.07315,7300,
40.46822,-124.09552,7500,
40.48825,-124.09836,8000,
40.4992,-124.09909,8500,
40.50556,-124.10934,12700,
40.54864,-124.14536,17600,
40.56296,-124.14784,17600,
40.57471,-124.14901,12800,
40.58803,-124.15538,14800,
40.59895,-124.16747,22500,
40.60489,-124.17807,22000,
40.61227,-124.19105,18200,
40.62113,-124.21002,20400,
40.64186,-124.20934,20700,
40.67203,-124.20177,21600,
40.70522,-124.20974,21800,
40.72467,-124.21503,23200,
40.73605,-124.21052,24700,
40.74507,-124.19969,31500,
40.75805,-124.18953,31000,
40.77422,-124.19061,35000,
40.77927,-124.187,39300,
40.78308,-124.18351,39300,
40.79151,-124.17831,32000,
40.79913,-124.17504,40000,
40.79992,-124.17504,35000,
40.79992,-124.17504,20900,
40.79992,-124.17504,25500,
40.79992,-124.17504,19500,
40.79992,-124.17504,22000,
40.79992,-124.17504,17000,
40.80067,-124.17496,19000,
40.80067,-124.17496,19000,
40.80067,-124.17496,28500,
40.80067,-124.17496,23000,
40.80067,-124.17496,19000,
40.80067,-124.17496,18000,
40.80434,-124.14601,36000,
40.80526,-124.13323,36000,
40.80567,-124.12249,36000,
40.82044,-124.09319,36500,
40.83503,-124.08198,37000,
40.85113,-124.0819,37500,
40.86268,-124.08273,37500,
40.87241,-124.08238,34500,
40.87879,-124.08226,43000,
40.89726,-124.08327,33000,
40.90447,-124.08687,34000,
40.921,-124.09857,18900,
40.93433,-124.115,16400,
40.95636,-124.1161,13300,
40.99389,-124.11352,10800,
41.01352,-124.10796,10700,
41.03208,-124.11008,8700,
41.03582,-124.1123,9000,
41.06204,-124.13906,4800,
41.09846,-124.15333,4600,
41.13611,-124.14677,4200,
41.15567,-124.12744,4100,
41.16537,-124.10596,4100,
41.28469,-124.07041,3750,
41.29449,-124.05549,3600,
41.30174,-124.04776,3600,
41.32001,-124.03965,3300,
41.32123,-124.03919,3000,
41.34879,-124.02691,2800,
41.46469,-124.03749,2800,
41.46469,-124.03749,2800,
41.50874,-124.03075,3300,
41.52304,-124.03412,3700,
41.55425,-124.05524,4400,
41.56153,-124.06263,4300,
41.58394,-124.08592,4100,
41.73547,-124.15269,4400,
41.74009,-124.16245,6200,
41.7522,-124.18552,16700,
41.7529,-124.19166,10500,
41.7529,-124.19166,9700,
41.7529,-124.19166,13100,
41.7529,-124.19166,14100,
41.7529,-124.19166,30000,
41.7529,-124.19166,12000,
41.7529,-124.19166,12800,
41.7529,-124.19166,13400,
41.7529,-124.19166,13000,
41.7529,-124.19166,30000,
41.75994,-124.19786,30000,
41.76334,-124.19684,16000,
41.77275,-124.18739,11000,
41.8033,-124.14854,6100,
41.8079,-124.1475,6300,
41.88158,-124.13671,6600,
41.93013,-124.14616,6700,
41.99847,-124.2083,7100,
33.77069,-118.24031,16900,
33.77156,-118.24042,5100,
33.77904,-118.22961,10900,
33.79001,-118.22494,10900,
38.29105,-121.31237,10500,
38.29173,-121.26437,5200,
38.29186,-121.25195,4500,
38.29626,-121.2434,3600,
38.3068,-121.2244,5800,
38.33598,-121.15984,5400,
38.35079,-121.1144,1700,
38.38645,-121.02727,2300,
38.38645,-121.02727,2300,
38.37929,-120.98614,4150,
38.35954,-120.94004,3600,
38.35416,-120.93581,4250,
38.35271,-120.93345,6900,
38.34973,-120.92876,5400,
38.35976,-120.82122,6400,
38.37842,-120.80241,5100,
33.93142,-118.40491,71000,
33.93143,-118.39622,133000,
33.93117,-118.3833,165000,
33.93007,-118.36847,211000,
33.93362,-118.35283,218000,
33.92519,-118.32684,255000,
33.92869,-118.29146,232000,
33.9287,-118.28058,231000,
33.92806,-118.25429,236000,
33.92834,-118.23931,233000,
33.92521,-118.21064,233000,
33.91278,-118.17982,223000,
33.91192,-118.15983,230000,
33.91308,-118.14062,214000,
33.9132,-118.12539,207000,
33.91403,-118.10487,18500,
33.91432,-118.09929,18500,
33.80506,-118.35108,43500,
33.81595,-118.35108,61000,
33.82558,-118.35143,60000,
33.83154,-118.35258,66000,
33.83756,-118.3536,69000,
33.84857,-118.35372,67000,
33.85838,-118.35347,70000,
33.87282,-118.35249,52000,
33.87422,-118.3525,52000,
33.87422,-118.3525,4650,
33.87422,-118.3525,15600,
33.87422,-118.3525,15600,
37.6457,-120.99376,27000,
37.6705,-120.99406,37000,
37.68891,-120.99433,36000,
37.71149,-120.99495,21000,
37.73277,-120.99172,15600,
37.73266,-120.95868,19600,
37.73797,-120.93913,16300,
37.73708,-120.92308,19000,
37.7547,-120.88167,16600,
37.76026,-120.86208,18900,
37.76665,-120.84704,20200,
37.89121,-120.48831,15200,
37.96517,-120.39396,17500,
37.97642,-120.3578,20800,
37.98011,-120.31659,22300,
37.97798,-120.31508,22300,
37.97917,-120.3108,11000,
37.99653,-120.26735,7900,
38.01973,-120.24673,8000,
38.03921,-120.21768,8100,
38.06649,-120.18997,4450,
38.08946,-120.14144,3950,
38.10102,-120.12317,5100,
38.18714,-120.00839,3750,
38.20023,-120.01464,2050,
38.24288,-119.99586,1850,
38.35528,-119.8777,770,
38.32798,-119.63721,540,
38.32798,-119.63721,520,
38.33341,-119.55339,1320,
38.35058,-119.53348,1560,
38.34847,-119.45237,710,
37.47592,-122.13959,21500,
37.48637,-122.14257,21500,
33.74678,-118.29217,47500,
33.74909,-118.29091,68000,
33.75362,-118.29114,83000,
33.77179,-118.27993,84000,
33.77901,-118.28023,103000,
33.79059,-118.28202,139000,
33.80877,-118.28765,172000,
33.83172,-118.28735,197000,
33.84625,-118.28505,208000,
33.85703,-118.28466,255000,
33.8728,-118.28496,228000,
33.8927,-118.28566,234000,
33.90213,-118.28661,240000,
33.91676,-118.28567,248000,
33.92884,-118.28081,283000,
33.94553,-118.27972,307000,
33.9601,-118.28081,307000,
33.97472,-118.28082,311000,
33.98247,-118.28062,309000,
33.98924,-118.2805,298000,
33.99675,-118.28062,308000,
34.00407,-118.28108,307000,
34.01144,-118.281,277000,
34.01844,-118.27976,268000,
34.0386,-118.27393,266000,
34.04668,-118.26863,272000,
34.04867,-118.26536,265000,
34.05279,-118.25895,279000,
34.05529,-118.25676,269000,
34.06279,-118.24862,157000,
34.06514,-118.24392,167000,
34.06682,-118.24024,186000,
34.06682,-118.24024,183000,
34.08209,-118.22359,123000,
34.0933,-118.20627,117000,
34.10294,-118.19637,105000,
34.10385,-118.19129,98000,
34.10765,-118.18621,98000,
34.11121,-118.18399,80000,
34.1131,-118.17686,78000,
34.1167,-118.17051,77000,
34.11923,-118.1605,56000,
34.1192,-118.15058,40000,
34.12752,-118.14726,40000,
34.12754,-118.14726,40000,
32.66492,-115.49662,24600,
32.66666,-115.49866,24600,
32.66774,-115.49867,28500,
32.67402,-115.49867,28500,
32.67908,-115.49872,31500,
32.69402,-115.49927,35000,
32.73068,-115.5004,30500,
32.75244,-115.50075,30000,
32.77365,-115.50119,19300,
32.79946,-115.5006,16800,
32.82548,-115.5002,13500,
32.84737,-115.50762,11000,
32.91262,-115.50913,11000,
32.97863,-115.50133,5500,
32.99883,-115.52641,5300,
33.00242,-115.52647,5300,
33.01561,-115.52683,4650,
33.04441,-115.52733,5300,
33.11844,-115.51469,5200,
33.12576,-115.51423,4550,
33.12905,-115.51422,5000,
33.17646,-115.51905,3750,
33.23068,-115.51906,2900,
33.23911,-115.51903,3200,
33.24187,-115.51902,2450,
33.25697,-115.54498,2500,
33.35787,-115.73341,1400,
33.42692,-115.83146,1400,
33.51071,-115.918,2700,
33.57026,-116.07904,7700,
33.79084,-116.48647,32000,
33.7933,-116.49492,12500,
33.8008,-116.4951,11700,
33.81587,-116.49298,18000,
33.84493,-116.50581,29000,
33.84489,-116.5194,23000,
33.84486,-116.52818,21000,
33.84488,-116.53689,13800,
33.84491,-116.54125,13800,
33.84489,-116.54559,10500,
33.84489,-116.54663,17500,
33.85833,-116.55741,16000,
33.9222,-116.67848,13200,
37.71632,-122.18689,29000,
37.71904,-122.17659,40000,
37.72393,-122.16138,30000,
37.72583,-122.15688,22900,
38.1836,-121.80619,3750,
38.33698,-121.82325,3100,
38.44061,-121.82251,8200,
38.44552,-121.82252,9000,
38.45574,-121.8224,10900,
38.45574,-121.8224,40000,
38.45574,-121.8224,40000,
38.53099,-121.76863,40000,
38.53099,-121.76863,40000,
38.53681,-121.7684,35000,
38.5464,-121.76803,30000,
38.56089,-121.76777,20900,
38.5902,-121.76709,22500,
38.6193,-121.76666,21500,
38.64101,-121.75987,19400,
38.6627,-121.75146,15600,
38.67725,-121.751,6600,
38.68441,-121.75113,6600,
38.70924,-121.76522,3400,
38.73454,-121.76509,1800,
38.79222,-121.72745,8800,
38.8005,-121.7202,7900,
38.80221,-121.71987,7900,
38.80221,-121.71987,7900,
38.8404,-121.71873,7400,
38.87051,-121.70769,5500,
38.95314,-121.67678,5000,
39.00272,-121.67158,3250,
39.00471,-121.63332,3250,
37.46888,-122.15523,40500,
37.4821,-122.15027,40500,
32.77299,-115.28558,930,
32.81105,-115.33617,1150,
32.81102,-115.37156,2200,
32.81098,-115.37647,5800,
32.81097,-115.38019,5100,
32.80886,-115.38497,5100,
32.80573,-115.40611,2900,
32.97459,-115.44876,1100,
33.04458,-115.44879,1000,
33.10398,-115.44965,960,
33.12551,-115.45203,880,
33.12575,-115.5019,2150,
33.12576,-115.50817,4150,
33.12576,-115.50957,3600,
33.12576,-115.51423,3600,
38.43693,-123.10417,2150,
38.46718,-123.05035,3650,
38.46786,-123.01048,8100,
38.49553,-123.0082,8300,
38.50212,-122.99698,7900,
38.49705,-122.96579,2600,
38.47363,-122.89485,10900,
38.45057,-122.86785,10000,
38.43755,-122.85805,16600,
38.42584,-122.8483,16400,
38.40575,-122.83698,21300,
38.40508,-122.82609,26000,
38.40508,-122.82609,13300,
38.40508,-122.82609,12200,
38.40508,-122.82609,12000,
38.40508,-122.82609,12200,
38.40508,-122.82609,12300,
38.40508,-122.82609,24000,
38.39479,-122.81907,24000,
38.38104,-122.80534,16500,
38.36526,-122.7813,16500,
38.33456,-122.73831,13700,
38.33127,-122.71278,37000,
38.23463,-122.594,18700,
38.21206,-122.54932,3200,
38.23619,-122.52661,16700,
38.25213,-122.48979,14100,
38.25491,-122.47983,15500,
38.2362,-122.46151,15500,
34.28965,-119.15633,38000,
34.28373,-119.1512,37000,
34.27413,-119.13547,25000,
34.25596,-119.10904,15000,
34.26375,-118.99467,18000,
34.27394,-118.93045,20200,
34.27894,-118.88315,33000,
34.27893,-118.87611,79800,
34.29268,-118.85745,85000,
34.29337,-118.84285,82000,
34.28368,-118.79231,94000,
34.28224,-118.77888,105000,
34.28234,-118.76148,114000,
34.28229,-118.74379,115000,
34.28178,-118.71777,115000,
34.28163,-118.69153,117000,
34.28159,-118.67855,117000,
34.27911,-118.66265,116000,
34.26787,-118.63563,115000,
34.26972,-118.63341,115000,
34.26972,-118.63341,115000,
34.27769,-118.60458,126000,
34.27348,-118.59012,147500,
34.27345,-118.5696,167500,
34.27237,-118.55622,187500,
34.27505,-118.53632,209000,
34.27805,-118.51959,209000,
34.27806,-118.50252,216500,
34.27524,-118.49394,230000,
34.26781,-118.48476,225000,
34.26598,-118.47196,216000,
34.26598,-118.47196,149000,
34.27246,-118.42886,136000,
34.28057,-118.41839,106000,
34.28607,-118.40554,106000,
35.13577,-119.44746,4500,
35.14086,-119.44723,5000,
35.14804,-119.44764,5400,
35.16565,-119.45324,7000,
35.26574,-119.31192,13700,
35.26735,-119.25267,7500,
35.26709,-119.22445,7800,
35.26723,-119.12848,8000,
35.26717,-119.10626,9300,
35.2669,-119.03794,11200,
35.26686,-119.0229,11200,
37.78815,-121.30173,79000,
37.78931,-121.2872,66000,
37.78323,-121.252,71000,
37.78338,-121.21574,77000,
37.79752,-121.19128,14800,
37.79755,-121.17975,13900,
37.79765,-121.14316,14100,
37.79808,-121.09205,17700,
37.79682,-120.99556,16200,
37.79423,-120.98363,10700,
37.79357,-120.92327,10500,
37.79357,-120.92327,10700,
37.79049,-120.86728,24300,
37.77666,-120.85296,18000,
37.76715,-120.84582,25700,
37.77644,-120.78194,11100,
37.77644,-120.78194,11600,
37.77644,-120.78194,11600,
37.89125,-120.48822,2700,
37.87487,-120.43518,3750,
37.82921,-120.34529,5000,
37.81479,-120.31176,3900,
37.82326,-120.25875,5800,
37.82457,-120.25666,7800,
37.83829,-120.23162,4950,
37.81711,-120.12965,2350,
37.81359,-120.1206,3800,
37.82281,-120.08943,3800,
37.82281,-120.08943,4200,
37.81378,-120.06607,4200,
37.81806,-120.0557,4200,
37.81806,-120.0557,3700,
37.82455,-120.00737,3500,
37.81467,-119.87504,3500,
37.76325,-119.8425,2250,
37.93094,-119.16578,2450,
37.93969,-119.12336,1330,
37.95042,-119.11309,1330,
37.88692,-119.09099,490,
37.79187,-118.56864,240,
37.8183,-118.47699,400,
38.15096,-122.44943,16000,
38.23659,-122.46024,18800,
38.24271,-122.44859,18200,
38.2461,-122.43729,14400,
38.24716,-122.41276,14400,
38.25345,-122.39357,24800,
38.25069,-122.37906,24800,
38.25069,-122.37906,24800,
38.25582,-122.3458,26000,
38.25536,-122.34246,25500,
38.25605,-122.32756,25500,
38.25757,-122.30275,26500,
38.28196,-122.29406,22800,
38.28176,-122.28952,22700,
38.28055,-122.27468,29000,
38.28822,-122.27521,13300,
38.29942,-122.27583,11600,
38.31068,-122.27644,14900,
38.32518,-122.27407,11300,
38.33739,-122.26134,4600,
38.33866,-122.25992,3300,
38.37683,-122.20238,2000,
38.44557,-122.19646,2000,
37.82679,-122.27848,25500,
37.8409,-122.28309,18900,
37.85184,-122.28661,22000,
37.8691,-122.29217,19300,
37.88052,-122.29587,20700,
37.88671,-122.29785,19700,
37.89067,-122.29912,23200,
37.89842,-122.3016,27500,
37.89842,-122.3016,27500,
37.899,-122.30184,20900,
37.90209,-122.30328,22200,
37.92071,-122.31515,18100,
37.92541,-122.31881,20300,
37.92545,-122.32066,20300,
38.31983,-120.93782,5000,
38.35412,-120.93577,4500,
38.35551,-120.93423,3800,
38.45383,-120.87265,3800,
32.69969,-117.01164,99000,
32.70434,-117.01094,93000,
32.71436,-117.01416,112000,
32.74824,-117.01775,161000,
32.76797,-117.00222,157000,
32.77323,-117.00232,148000,
32.7783,-117.00391,93000,
32.78818,-117.0065,82000,
32.79966,-117.00548,71000,
32.81169,-117.00392,65000,
32.83667,-117.00325,29000,
32.83856,-117.00327,29000,
34.26634,-119.23461,46000,
34.2714,-119.21365,45500,
34.27474,-119.19069,36000,
34.28965,-119.15634,49500,
34.32241,-119.10121,47500,
34.33719,-119.08281,41500,
34.34547,-119.06864,37000,
34.35002,-119.05841,30500,
34.36025,-119.04148,30500,
34.37962,-118.98542,29000,
34.39442,-118.93097,29000,
34.39623,-118.91741,26500,
34.39808,-118.89505,26000,
34.41019,-118.77978,22000,
34.41019,-118.77978,22000,
34.40615,-118.69282,22600,
34.42557,-118.6379,22300,
34.43533,-118.61838,36500,
34.44053,-118.60979,36500,
34.44369,-118.60413,26000,
34.44385,-118.60341,26000,
34.42402,-118.58004,26000,
35.26343,-116.07319,6700,
35.26535,-116.07496,2050,
35.27479,-116.07504,1050,
35.63285,-116.29055,730,
35.79386,-116.34005,730,
35.79386,-116.34005,730,
35.87136,-116.28686,700,
35.97266,-116.27039,790,
35.99392,-116.27357,280,
36.30239,-116.41446,1170,
36.30468,-116.41521,580,
36.40853,-116.42226,560,
39.1975,-123.7466,1600,
39.16112,-123.58276,1900,
39.06731,-123.44709,4000,
39.03127,-123.38718,4300,
39.01665,-123.37355,5400,
39.0121,-123.37179,4800,
38.99914,-123.35838,2100,
38.90015,-123.22026,1650,
38.85222,-123.0775,1650,
38.82815,-123.01437,2250,
38.71453,-122.91751,1950,
38.70653,-122.90416,4100,
38.71551,-122.8926,2650,
38.68722,-122.83942,2550,
38.66655,-122.81973,4050,
38.67162,-122.81324,3650,
38.63904,-122.76947,2100,
38.6324,-122.67407,1900,
38.60251,-122.64472,2550,
38.60251,-122.64472,2550,
38.58874,-122.60705,8500,
38.58023,-122.59441,11000,
38.57526,-122.58051,2500,
38.48741,-122.40607,2850,
38.48845,-122.34944,1600,
38.50374,-122.29622,920,
38.4966,-122.25125,2550,
38.44557,-122.19646,1050,
38.51219,-122.10346,2400,
38.51219,-122.10346,2600,
38.51291,-122.09556,2400,
38.51291,-122.09556,2400,
38.49465,-122.02831,2100,
38.51756,-121.9913,3000,
38.52286,-121.97663,9000,
38.52503,-121.97068,11200,
38.53144,-121.95282,11200,
36.89434,-121.77409,19500,
36.90711,-121.75337,25300,
36.91237,-121.74576,11500,
36.91684,-121.73164,11400,
36.92425,-121.69837,8600,
36.90386,-121.63911,11000,
36.90048,-121.59745,11000,
36.90048,-121.59745,11000,
36.88257,-121.56167,10000,
37.36699,-121.82668,26500,
37.38353,-121.81488,2300,
37.37788,-121.78391,710,
37.34217,-121.72205,255,
37.33346,-121.66768,190,
37.342,-121.64158,190,
37.90276,-122.51558,26000,
37.89918,-122.50468,23000,
37.89799,-122.48796,18500,
37.88397,-122.4719,11400,
37.87331,-122.45511,5200,
37.63909,-121.40211,13200,
37.6386,-121.3977,13000,
37.63778,-121.34307,14100,
37.63801,-121.29526,10900,
37.63829,-121.27369,15200,
37.63829,-121.27369,14500,
37.63789,-121.12215,10400,
37.63823,-121.06733,9700,
37.63868,-121.0304,10200,
37.6392,-121.00687,10400,
37.64159,-121.00369,10400,
37.64159,-121.00369,12000,
37.63741,-120.98978,14100,
37.6382,-120.97197,21700,
37.63818,-120.95725,19200,
37.63817,-120.93889,15900,
37.63821,-120.92091,13300,
37.63826,-120.9031,9300,
37.6383,-120.89855,7600,
37.63873,-120.84767,8300,
37.6382,-120.77369,8700,
37.63828,-120.75958,5000,
37.63934,-120.75555,5500,
37.6398,-120.74046,3250,
37.63897,-120.62005,2350,
37.66315,-120.47165,1900,
37.63736,-120.39288,1300,
37.63736,-120.39288,1300,
37.67688,-120.36481,1550,
37.67688,-120.36481,1550,
37.6793,-120.36133,2050,
37.6831,-120.33128,2050,
37.68842,-120.33068,2350,
37.70624,-120.33402,1650,
37.70692,-120.33396,1650,
37.70692,-120.33396,1650,
37.71036,-120.19692,830,
33.54276,-117.78534,21800,
33.5453,-117.78284,28200,
33.55371,-117.77579,37600,
33.5828,-117.7614,19000,
33.6517,-117.76111,34500,
33.65887,-117.75692,29100,
33.66759,-117.75336,42200,
33.69684,-117.73579,47000,
33.71817,-117.72048,47700,
34.15374,-118.37687,184000,
34.1531,-118.36792,193000,
34.15322,-118.3617,211000,
34.1536,-118.33989,204000,
34.15361,-118.32644,195000,
34.15495,-118.31091,218000,
34.15534,-118.29393,201000,
34.15534,-118.29393,109500,
34.15534,-118.29393,109500,
34.15282,-118.27982,181000,
34.1548,-118.27118,238000,
34.15619,-118.26447,205000,
34.15635,-118.25493,240000,
34.15581,-118.24215,232000,
34.1467,-118.22597,207000,
34.14285,-118.18553,216000,
34.14333,-118.17072,217000,
34.14802,-118.15861,211000,
34.15153,-118.15131,211000,
34.74255,-120.27085,3520,
34.74548,-120.28814,1540,
34.76646,-120.42409,3200,
34.77257,-120.42884,3150,
34.80552,-120.44519,3000,
34.85316,-120.45231,10300,
34.88292,-120.43657,17000,
34.89449,-120.43653,20000,
34.90908,-120.43593,20000,
34.91284,-120.43593,30000,
34.92065,-120.43602,31000,
34.93863,-120.43601,24000,
34.95307,-120.43588,24000,
34.96786,-120.43566,22000,
34.9813,-120.43143,19800,
36.57921,-118.05762,540,
36.43004,-117.82438,430,
36.09798,-119.54571,2600,
36.12065,-119.53633,3300,
36.12065,-119.53633,2700,
36.13765,-119.51079,2800,
36.20335,-119.49301,2000,
36.20338,-119.3843,2650,
36.20362,-119.36681,5700,
36.20365,-119.35785,9000,
36.20421,-119.35393,10500,
36.20526,-119.34683,9200,
36.20565,-119.34416,5000,
36.20584,-119.34292,5600,
36.2085,-119.34299,10500,
36.20891,-119.34024,12400,
36.20937,-119.3372,15000,
36.20976,-119.33072,23500,
36.2106,-119.32845,18700,
36.21121,-119.32188,16300,
36.21128,-119.31314,12500,
36.21095,-119.26034,9900,
36.21073,-119.19883,10600,
36.21081,-119.13619,10600,
36.21081,-119.13619,3200,
34.77449,-118.77364,3600,
34.76493,-118.73299,3400,
34.77455,-118.56261,3050,
34.77602,-118.32576,2750,
34.77695,-118.1706,3800,
34.77695,-118.16912,31000,
34.57951,-118.11654,23500,
34.57956,-118.11184,21700,
34.57975,-118.09411,21100,
34.58022,-118.07633,18500,
34.58019,-118.06724,18200,
34.57988,-118.04694,19600,
34.54273,-118.03037,18100,
34.52129,-118.0043,17200,
34.52117,-117.9581,15000,
34.50645,-117.89667,12800,
34.50606,-117.83541,13100,
34.49848,-117.74453,9200,
34.4517,-117.65982,9500,
34.4517,-117.65982,8600,
34.42625,-117.6192,14700,
34.40287,-117.57904,17500,
34.39081,-117.57626,17000,
34.31184,-117.47472,4100,
34.31237,-117.34631,1500,
34.28812,-117.35515,1500,
34.25826,-117.29132,1600,
34.24703,-117.30051,5300,
34.24326,-117.29434,2700,
34.23835,-117.29124,6500,
34.22819,-117.29025,6800,
40.41549,-120.64892,5800,
40.43281,-120.63552,2050,
40.44452,-120.62665,500,
41.1134,-120.92139,430,
41.1843,-120.94415,450,
41.1843,-120.94415,450,
41.43794,-120.87871,1000,
41.53993,-121.15306,1150,
41.84372,-121.30974,1350,
41.88188,-121.36913,2150,
41.94213,-121.45727,2150,
41.94213,-121.45727,2150,
41.95375,-121.46967,2400,
41.99825,-121.51944,2400,
37.24623,-121.08849,850,
37.24582,-121.03086,1300,
37.24581,-121.01282,4950,
37.253,-121.00743,5600,
37.25632,-120.9983,7200,
37.26013,-120.99974,3600,
37.26036,-120.98635,3100,
37.31316,-120.85123,3350,
37.29979,-120.72411,3000,
37.3021,-120.61485,5800,
37.30225,-120.57771,6400,
37.30265,-120.54105,6000,
37.30273,-120.51404,6000,
37.30271,-120.50452,12700,
37.30306,-120.50063,14700,
37.29522,-120.46643,12200,
37.29517,-120.4516,12300,
37.29511,-120.43901,7400,
37.29538,-120.32485,6500,
37.34201,-120.2204,3900,
37.34201,-120.2204,3900,
37.432,-120.0985,4450,
37.48326,-119.96385,9600,
37.48504,-119.96549,9800,
37.49202,-119.97211,5800,
37.52343,-119.92391,3350,
37.55631,-119.93075,2800,
37.56432,-119.93962,1400,
37.60464,-119.96608,1150,
37.66897,-119.81733,980,
37.67305,-119.78548,1200,
37.67916,-119.75997,1400,
33.9098,-117.85228,14900,
33.91834,-117.84786,15500,
33.92363,-117.8476,21500,
33.92158,-117.82995,21700,
33.92528,-117.80618,18500,
33.94538,-117.78188,13500,
33.94538,-117.78188,13500,
33.98109,-117.74081,28500,
33.98266,-117.71503,36000,
33.98265,-117.7089,37000,
34.42918,-119.67719,3800,
34.44308,-119.67447,3300,
36.29443,-120.26904,2500,
36.40057,-120.13908,2800,
36.42965,-120.10311,4400,
36.45879,-120.10299,4750,
36.48783,-120.09829,4900,
36.53154,-120.09788,5500,
36.53675,-120.09786,4700,
36.58913,-120.06144,1900,
36.6037,-120.06137,2700,
36.66202,-120.06105,5000,
36.71307,-120.0604,6500,
36.7226,-120.06028,10500,
36.72375,-120.06026,11000,
36.73497,-120.06011,8500,
36.74953,-120.05996,9400,
36.80779,-120.0605,6300,
36.82285,-120.05623,6300,
36.82285,-120.05623,6300,
36.92385,-120.05604,6700,
36.93834,-120.05601,11500,
36.94551,-120.05602,15000,
36.95338,-120.05607,13000,
36.95713,-120.05627,13000,
36.96033,-120.05958,14500,
36.96124,-120.0605,17700,
36.9633,-120.05743,16000,
36.96543,-120.05427,13000,
36.9735,-120.04304,8300,
36.9941,-120.00223,6600,
37.01048,-119.7939,5200,
36.41593,-121.27803,270,
36.47238,-121.22325,270,
36.47238,-121.22325,220,
36.51804,-121.13706,325,
40.17197,-121.08058,860,
40.27378,-121.08419,1350,
40.29415,-121.06105,1350,
40.29415,-121.06105,1350,
40.30133,-121.04707,710,
40.3108,-121.04854,710,
40.3108,-121.04854,15700,
39.60601,-121.66998,15700,
34.38378,-119.48462,4800,
34.39602,-119.45371,3050,
34.39602,-119.45371,2750,
34.41829,-119.33666,2700,
34.42956,-119.29303,8000,
34.43003,-119.2882,19400,
34.43225,-119.28015,18800,
34.43551,-119.26372,18800,
34.44229,-119.25894,22500,
34.44783,-119.2451,18300,
34.44893,-119.22747,6500,
34.44844,-119.22015,5300,
34.44609,-119.20459,2800,
34.43473,-119.1861,2800,
34.38305,-119.06947,3650,
34.35401,-119.06002,15300,
34.35004,-119.05819,15300,
40.71563,-122.41602,240,
40.69121,-122.40271,1550,
40.68975,-122.39049,2250,
40.68175,-122.37525,4600,
40.68175,-122.37525,4500,
40.68175,-122.37525,4500,
40.68175,-122.37525,4500,
40.68175,-122.37525,4250,
40.68175,-122.37525,4250,
40.68175,-122.37525,8700,
40.68,-122.35077,12400,
40.67929,-122.34849,12400,
36.92018,-121.79037,27200,
36.91867,-121.78393,29600,
36.91514,-121.76154,22000,
36.91159,-121.7584,23400,
36.91024,-121.75688,8400,
36.91024,-121.75688,7200,
36.91024,-121.75688,8100,
36.91024,-121.75688,10400,
36.91366,-121.7522,10400,
36.91498,-121.75368,10400,
36.91502,-121.75372,14800,
36.91806,-121.74955,16200,
36.93595,-121.74332,13400,
36.95611,-121.72744,6500,
36.9957,-121.71766,5800,
36.9957,-121.71766,5800,
37.01347,-121.65029,5800,
37.01326,-121.59966,18600,
37.01466,-121.57243,19700,
37.01963,-121.57401,22800,
37.00297,-121.55651,24400,
37.01022,-121.51564,22300,
36.9886,-121.4909,23300,
36.96845,-121.38406,33000,
36.98838,-121.3844,32500,
37.06773,-121.21414,32000,
37.06773,-121.21414,32000,
37.05689,-121.01638,24500,
37.05669,-120.96972,27000,
37.05675,-120.8715,28000,
37.05687,-120.86528,30000,
37.05689,-120.84745,33500,
37.05691,-120.83919,29000,
37.05692,-120.83534,33500,
37.05682,-120.81771,19400,
37.0558,-120.78756,18700,
37.05054,-120.63554,16200,
37.08208,-120.49654,14900,
37.08303,-120.49356,15500,
37.08303,-120.49356,15400,
37.0835,-120.2974,12400,
37.08404,-120.21019,15900,
38.79685,-120.88932,2400,
38.79515,-120.88984,110,
34.68798,-120.15833,10100,
34.61055,-120.05525,11800,
34.57325,-119.95764,11100,
34.52269,-119.831,13300,
34.45128,-119.76225,16400,
34.44068,-119.76001,16400,
34.44039,-119.75411,16400,
35.76713,-119.24971,2050,
35.76322,-119.2488,2150,
35.76146,-119.24839,3000,
35.76695,-119.25104,4650,
35.76139,-119.24975,12700,
35.76138,-119.24909,15500,
35.7614,-119.24522,12500,
35.7614,-119.2408,12100,
35.76147,-119.22319,2700,
35.76147,-119.18738,2200,
35.76153,-119.13279,630,
35.76197,-119.05324,160,
35.70417,-118.83604,195,
35.71628,-118.72729,340,
35.72517,-118.69858,340,
35.7362,-118.55488,290,
35.70683,-118.45642,6300,
35.70155,-118.45951,6000,
35.62818,-118.47834,5800,
36.75049,-121.7677,30000,
36.76033,-121.75385,31000,
36.78935,-121.66814,29000,
36.84066,-121.53355,23700,
36.84202,-121.45871,19500,
36.89599,-121.4273,11300,
36.90787,-121.40389,11200,
36.93311,-121.38816,11800,
36.95967,-121.3836,12000,
36.95969,-121.3836,12800,
36.96847,-121.38403,12500,
37.81273,-119.05348,1420,
37.77757,-119.07629,1500,
37.77002,-119.09085,1450,
37.78333,-119.12684,400,
37.89234,-119.092,400,
38.01023,-121.75256,10500,
38.01225,-121.75209,11600,
38.02417,-121.75153,11600,
38.02417,-121.75153,11600,
38.15518,-121.67642,5400,
38.17183,-121.59346,2450,
38.23817,-121.55864,2900,
38.24228,-121.51593,2750,
38.27326,-121.53927,1500,
38.31939,-121.57649,1500,
38.31979,-121.57647,2150,
38.36827,-121.51932,1350,
38.45596,-121.50049,6400,
38.59572,-121.47726,53000,
38.59737,-121.47464,43500,
38.59981,-121.46896,35500,
38.60015,-121.45798,34500,
38.60014,-121.44858,32000,
38.60015,-121.44578,33500,
38.60014,-121.44157,33500,
42.00009,-121.89174,610,
41.99868,-121.55907,1050,
41.99827,-121.51951,1050,
39.55517,-123.43026,810,
39.56506,-123.4017,810,
39.71146,-123.34577,820,
39.75874,-123.24831,920,
39.77995,-123.24819,2000,
39.79484,-123.24811,2400,
39.81703,-123.24629,630,
39.81662,-123.20554,390,
39.82523,-123.19043,390,
39.65648,-122.59142,200,
39.66222,-122.5288,330,
39.61152,-122.5256,640,
39.61293,-122.52145,800,
39.52415,-122.24924,2600,
39.52422,-122.22675,2350,
39.52421,-122.21478,8700,
39.52421,-122.19408,5000,
39.52418,-122.1852,2750,
39.52417,-122.18336,3050,
39.5241,-122.13668,2700,
39.52156,-122.06521,2050,
39.52179,-122.01403,2400,
39.45715,-121.99694,2700,
39.46434,-121.97339,2400,
39.46416,-121.93014,1500,
39.46406,-121.87009,1500,
39.46406,-121.87009,1500,
39.46475,-121.74596,1020,
39.49425,-121.68865,3000,
39.49805,-121.6089,8600,
39.49805,-121.59164,13200,
39.498,-121.57537,30000,
39.49804,-121.57188,28500,
39.50387,-121.55224,30500,
39.50674,-121.5457,29000,
39.50257,-121.53891,20900,
39.50144,-121.53145,12400,
39.50526,-121.4978,11900,
39.50569,-121.4972,11000,
39.5115,-121.48531,7600,
39.51261,-121.48218,5600,
39.50381,-121.46056,4550,
39.51483,-121.44398,1850,
39.51861,-121.43976,1500,
39.59417,-121.44484,1500,
39.59417,-121.44484,27000,
39.59417,-121.44484,27000,
39.59417,-121.44484,27000,
39.59417,-121.44484,26500,
32.72016,-117.15516,54000,
32.72395,-117.15536,110000,
32.73408,-117.15573,108000,
32.73664,-117.15589,105000,
32.74674,-117.15648,96000,
32.75333,-117.15792,161000,
32.76362,-117.16343,151000,
32.77157,-117.16133,174000,
32.79168,-117.15898,158000,
32.80195,-117.15532,145000,
32.80886,-117.15286,132000,
32.82178,-117.14662,137000,
32.83234,-117.14094,138000,
32.84127,-117.13344,141000,
32.85495,-117.11904,127000,
32.85822,-117.114,127000,
32.86391,-117.11037,127000,
34.01698,-118.07886,39000,
34.02853,-118.06798,26000,
34.04131,-118.06427,45500,
34.06271,-118.0654,76000,
34.07225,-118.073,52000,
34.08092,-118.07319,58000,
34.08697,-118.07333,39500,
34.09055,-118.07332,39500,
36.92995,-120.84096,1050,
36.98386,-120.83727,2050,
37.04251,-120.83572,6400,
37.04915,-120.83551,7600,
37.05706,-120.83534,16000,
37.06694,-120.83518,13500,
37.07385,-120.83507,11000,
37.09967,-120.83491,7600,
37.31315,-120.85123,6200,
37.32778,-120.85111,6200,
37.36087,-120.84954,6700,
37.38978,-120.85029,9200,
37.40424,-120.85012,10800,
37.40787,-120.85008,11800,
37.41146,-120.85003,14600,
37.4489,-120.84904,14900,
37.45291,-120.84905,14900,
37.45291,-120.84905,14900,
37.47451,-120.84898,18800,
34.95753,-120.57406,7450,
34.95696,-120.50846,9950,
34.95535,-120.48962,10100,
34.95331,-120.45387,12500,
34.95314,-120.43587,25000,
34.953,-120.41745,2800,
35.00334,-120.3603,3600,
35.02225,-120.20803,3300,
34.94894,-119.69168,2350,
34.94143,-119.65264,2050,
34.93367,-119.59172,3300,
34.93367,-119.59172,3300,
35.05843,-119.40101,2850,
35.05816,-119.34921,2600,
35.05877,-119.1391,2400,
35.05931,-118.99919,1800,
35.05783,-118.96791,1800,
38.0453,-119.16078,200,
38.16053,-118.79769,102,
38.16053,-118.79769,67000,
38.16053,-118.79769,74000,
38.16053,-118.79769,80000,
38.16053,-118.79769,70000,
38.16053,-118.79769,54000,
38.16053,-118.79769,48000,
38.16053,-118.79769,33000,
38.16053,-118.79769,25000,
38.16053,-118.79769,13000,
36.87382,-119.55734,6500,
36.9043,-119.5189,5100,
36.95307,-119.50625,4700,
36.96215,-119.51287,3950,
37.0369,-119.5121,8700,
37.04262,-119.49764,6900,
37.0601,-119.36708,9100,
37.10177,-119.31846,4800,
37.13925,-119.30869,950,
37.15603,-119.29597,880,
37.25452,-119.16047,860,
37.21828,-118.60652,400,
37.25639,-118.57997,550,
37.35906,-118.45843,1210,
37.36137,-118.4313,6250,
37.36142,-118.39528,460,
37.46462,-117.91695,170,
37.46462,-117.91695,170,
37.48676,-117.91201,170,
41.52315,-124.03418,1900,
41.52096,-124.03072,930,
41.51924,-123.99179,930,
41.51157,-123.98639,930,
41.35087,-123.87478,200,
41.21155,-123.75806,320,
41.18663,-123.70465,370,
34.15322,-118.37656,171000,
34.15669,-118.37905,187500,
34.16491,-118.38268,188500,
34.17216,-118.38894,187500,
34.17948,-118.3952,182000,
34.18669,-118.40137,171000,
34.2012,-118.40362,147000,
34.22167,-118.41015,134500,
34.22804,-118.41047,124000,
34.23494,-118.41204,124000,
40.34758,-121.59654,120,
40.32388,-121.52661,90,
40.36194,-121.51184,90,
34.31242,-117.34634,900,
34.33693,-117.25915,120,
34.29623,-117.21111,500,
34.27111,-117.18435,500,
34.25383,-117.17367,4400,
34.24697,-117.18411,8300,
34.24862,-117.18934,4000,
34.23392,-117.1964,5000,
39.09579,-120.94954,14000,
39.09684,-120.95066,4950,
39.10526,-120.95003,6500,
39.11858,-120.95066,5000,
39.13123,-120.95921,5000,
39.17544,-120.97504,8100,
39.19108,-120.99366,10200,
39.19831,-121.01114,13200,
39.20797,-121.04332,8500,
39.21311,-121.05392,13300,
39.21574,-121.05478,7700,
39.2158,-121.05599,7000,
39.2164,-121.06097,7000,
38.97124,-123.11659,5000,
38.97247,-123.1027,4800,
38.97724,-123.09855,3600,
38.97645,-123.0705,1700,
38.98906,-122.98684,1700,
38.98906,-122.98684,1950,
39.0169,-122.9129,750,
38.8223,-122.72041,2800,
38.75927,-122.64101,3100,
38.75239,-122.61524,3100,
33.71049,-115.40026,3700,
33.71313,-115.40032,2100,
33.71434,-115.39996,1550,
33.73444,-115.37587,1200,
34.047,-115.21975,1200,
34.047,-115.21975,1550,
34.047,-115.21975,2000,
34.047,-115.21975,1300,
34.047,-115.21975,2000,
34.047,-115.21975,2000,
34.047,-115.21975,2000,
35.38311,-119.04452,52000,
35.38053,-119.0196,49600,
35.38053,-119.0196,49600,
35.38053,-119.0196,49600,
35.38253,-119.00914,54000,
35.38354,-119.00287,63000,
35.38614,-118.98632,60500,
35.39219,-118.97617,52500,
35.39455,-118.96751,40500,
35.39637,-118.94979,30000,
35.39657,-118.92986,16500,
35.3984,-118.87967,12500,
35.42219,-118.82254,4000,
35.52278,-118.66961,3500,
35.53145,-118.64744,3500,
35.53212,-118.6323,4200,
35.61095,-118.49011,4200,
35.6281,-118.47823,3700,
35.6427,-118.46204,3600,
35.65722,-118.32095,3500,
35.66452,-118.30082,2600,
35.60161,-117.90307,2200,
35.65143,-117.80072,6300,
35.65175,-117.69703,6300,
35.65166,-117.67098,13800,
35.62251,-117.66902,11100,
35.62249,-117.648,2300,
35.62251,-117.6344,2400,
35.62251,-117.6344,2400,
35.647,-117.51056,2300,
35.68131,-117.39209,2300,
35.91121,-116.49215,250,
35.99634,-116.27489,790,
36.16718,-116.10832,780,
36.76041,-120.38626,9500,
36.75527,-120.38023,10500,
36.75438,-120.37916,11000,
36.74935,-120.37334,6500,
36.73136,-120.35901,6800,
36.73456,-120.20508,6500,
36.73471,-120.10553,6900,
36.73475,-120.07824,10400,
36.73492,-120.06016,14100,
36.73496,-120.04235,10700,
36.73502,-119.96996,12900,
36.7353,-119.91656,13000,
36.73549,-119.88057,13200,
36.73586,-119.60995,17000,
36.73605,-119.5563,11500,
36.73383,-119.50205,11000,
36.73343,-119.4958,11700,
36.72014,-119.45734,5800,
36.73039,-119.28675,5400,
36.71972,-119.00017,1100,
36.71779,-118.98341,1100,
36.71779,-118.98341,1100,
36.72136,-118.97044,1500,
36.75596,-118.95934,1500,
36.80182,-118.93525,880,
36.80219,-118.69765,800,
38.25513,-119.2231,1050,
38.34417,-119.2078,280,
38.41764,-119.16155,250,
36.68711,-121.65285,38200,
36.68411,-121.67301,17800,
36.74497,-121.74026,18800,
36.76139,-121.75216,12000,
36.7708,-121.7654,12000,
35.20871,-118.91451,3900,
35.23782,-118.91443,8600,
35.25221,-118.91441,14600,
35.25587,-118.91441,18000,
35.26701,-118.91439,14600,
35.29604,-118.91433,9500,
35.3507,-118.91419,19700,
35.35225,-118.91418,19700,
35.35434,-118.91418,16900,
35.35821,-118.91424,16900,
35.37625,-118.91422,10300,
35.39839,-118.87961,4500,
37.68577,-122.10081,21600,
37.6883,-122.10438,17700,
37.68933,-122.10586,21100,
37.6912,-122.10852,21200,
37.7058,-122.12932,21300,
37.70635,-122.13011,23700,
37.72037,-122.14959,15800,
37.7258,-122.15689,18200,
37.74435,-122.17049,22400,
37.7592,-122.18705,25000,
37.77185,-122.21383,5000,
37.7714,-122.21608,3000,
32.71813,-114.72847,3700,
32.7434,-114.72017,4950,
32.74416,-114.71977,4950,
33.99405,-118.45272,40000,
34.00367,-118.43357,47500,
34.01217,-118.41845,70000,
34.01283,-118.41732,53000,
34.01363,-118.41592,69000,
34.01867,-118.40703,60000,
34.02706,-118.39239,66000,
34.03522,-118.37791,44000,
34.03655,-118.37557,55000,
34.03739,-118.37409,55000,
32.57629,-116.62746,5900,
32.57698,-116.62758,5600,
32.598,-116.64323,5600,
34.22832,-117.25129,3500,
34.22865,-117.25105,3600,
34.23895,-117.2334,4100,
34.23999,-117.21965,6400,
34.23674,-117.21794,7500,
34.2486,-117.18959,4900,
36.05128,-119.31099,4000,
36.05124,-119.14276,5650,
36.05162,-119.03886,24700,
36.05102,-119.01734,17300,
36.05109,-119.00818,13100,
36.05123,-118.98165,11200,
36.04755,-118.9377,6200,
36.05639,-118.91516,6000,
36.08008,-118.89886,6000,
36.10261,-118.85902,4300,
36.12942,-118.8195,3650,
36.12963,-118.81924,3900,
36.139,-118.80771,850,
36.14017,-118.61659,400,
36.12109,-118.54346,400,
36.28219,-118.00612,240,
36.42961,-117.82407,540,
36.60597,-117.14737,900,
36.63925,-117.03565,810,
36.588,-116.94327,920,
36.45563,-116.86493,1050,
36.4484,-116.85275,1000,
36.30463,-116.4152,860,
39.64752,-121.63438,5600,
39.65312,-121.6327,5700,
39.71462,-121.61145,5700,
39.7348,-121.6127,5900,
39.74827,-121.60769,9500,
39.75224,-121.60775,9500,
34.45132,-119.7623,11100,
34.45147,-119.75959,10200,
34.45042,-119.73764,9700,
34.44498,-119.69698,3150,
34.44315,-119.67419,2850,
34.43595,-119.64148,7100,
34.43703,-119.63223,7550,
34.4361,-119.60125,2250,
34.43623,-119.58271,1950,
34.43491,-119.57184,1450,
34.40785,-119.51478,4000,
38.88656,-121.26828,9200,
38.88652,-121.23801,6500,
38.88661,-121.21098,4800,
38.89169,-121.18125,5100,
38.87749,-121.13168,10000,
38.8784,-121.12598,10000,
38.88697,-121.01589,5800,
38.89083,-121.00137,7000,
38.89863,-120.98031,5400,
38.90823,-120.84762,5300,
38.90539,-120.83993,3550,
38.85841,-120.83293,2200,
38.81607,-120.82222,1700,
38.7376,-120.81124,3000,
33.56935,-116.09516,4500,
33.56969,-116.07842,6000,
41.80565,-124.08124,2200,
41.88156,-124.13664,1700,
36.12211,-121.02328,2300,
36.13169,-121.01176,900,
36.18724,-120.82117,1000,
36.16732,-120.66457,1000,
36.16732,-120.66457,1000,
36.08199,-120.48066,850,
36.10576,-120.40283,930,
36.12107,-120.3748,1150,
36.12899,-120.37053,4450,
36.13646,-120.36339,7300,
36.13972,-120.36028,9000,
36.25439,-120.24347,3950,
36.25538,-120.10358,4800,
36.25547,-119.95908,4500,
36.25547,-119.95908,4500,
36.25539,-119.90485,11100,
36.25558,-119.86952,18000,
36.28219,-119.80807,20100,
36.29162,-119.78083,23000,
36.29761,-119.75501,30000,
36.30895,-119.70908,32500,
36.31401,-119.69301,30500,
36.31861,-119.6729,28000,
36.32136,-119.65515,22200,
36.32419,-119.63669,19500,
36.32524,-119.6009,19000,
36.32819,-119.56506,19000,
36.3276,-119.47531,19000,
36.3276,-119.47531,19000,
36.3276,-119.47531,42500,
36.32726,-119.39012,48500,
36.32737,-119.34521,54000,
36.32716,-119.32571,58500,
36.327,-119.31404,58000,
36.3269,-119.29229,46000,
36.32666,-119.27857,36000,
36.32762,-119.26102,26500,
36.32679,-119.20844,21000,
36.3262,-119.13488,14000,
36.32578,-119.11694,7100,
36.3818,-119.02503,5200,
36.39553,-119.02162,3900,
36.39572,-118.98852,4300,
36.41178,-118.93369,3650,
36.42439,-118.91554,4500,
36.43795,-118.90532,5000,
36.45304,-118.89475,3600,
36.46665,-118.85927,1700,
36.48122,-118.83796,1700,
41.80439,-124.14358,4600,
41.80572,-124.08131,4000,
41.79232,-124.06813,4100,
41.84369,-123.96308,3000,
41.99688,-123.72143,3000,
40.921,-124.09858,2500,
40.91603,-124.07965,1900,
40.90891,-124.05586,1800,
36.51793,-119.56123,17600,
36.51792,-119.55896,13300,
36.51791,-119.5563,10700,
36.51791,-119.54845,14300,
36.51792,-119.54787,11100,
36.51787,-119.54106,5700,
36.51791,-119.53723,5700,
36.51791,-119.53723,5700,
36.5179,-119.51216,5700,
36.51791,-119.50599,5500,
36.51688,-119.39488,2250,
36.51578,-119.28672,4300,
36.48627,-119.25006,4200,
36.48538,-119.16979,1500,
36.47169,-119.12239,1500,
35.12597,-118.57409,2400,
35.1315,-118.56797,8850,
35.11275,-118.52162,9200,
35.12427,-118.49486,12750,
35.12434,-118.46779,14100,
35.14138,-118.4674,12000,
37.65396,-119.05784,620,
37.65014,-119.01071,3750,
37.65185,-118.98497,9200,
37.64845,-118.98309,9200,
37.64687,-118.96582,6500,
37.64356,-118.94615,7400,
37.64128,-118.91671,7400,
35.35237,-119.003,43000,
35.35382,-119.00299,33500,
35.36845,-119.00294,32500,
35.37826,-119.00323,12900,
35.37919,-119.00384,12900,
35.38103,-119.00716,12900,
35.38208,-119.00994,26500,
35.38966,-119.02303,36500,
35.40193,-119.04105,36500,
35.4037,-119.0455,25000,
37.74279,-121.56157,115000,
37.7431,-121.55719,115000,
37.7431,-121.55719,115000,
37.74248,-121.53133,106000,
37.74105,-121.49585,83000,
37.76425,-121.41471,111000,
37.76697,-121.33412,97000,
38.48254,-120.01946,750,
38.49216,-120.03458,740,
34.31706,-118.49053,80000,
34.32302,-118.47847,77000,
34.32365,-118.46023,76000,
34.31655,-118.44002,87000,
34.30827,-118.4294,108000,
34.29944,-118.41958,122000,
34.28873,-118.40824,120000,
34.27492,-118.38061,117000,
34.27221,-118.35305,117000,
34.25978,-118.3299,111000,
34.23491,-118.29065,116000,
34.23125,-118.26641,143000,
34.22326,-118.24885,152000,
34.21861,-118.23991,169000,
34.2076,-118.21751,123000,
34.20666,-118.20026,120000,
34.2023,-118.1903,108000,
34.20032,-118.18791,122000,
34.19408,-118.18238,121000,
34.1845,-118.17618,119000,
34.18105,-118.1688,135000,
34.17509,-118.16057,141000,
34.15148,-118.15327,297000,
34.15182,-118.13241,295000,
34.1523,-118.12159,278000,
34.15243,-118.11335,290000,
34.15255,-118.09855,269000,
34.15173,-118.09122,269000,
34.14774,-118.08171,266000,
34.14783,-118.07838,256000,
34.14882,-118.05241,249000,
34.14841,-118.03639,242000,
34.14177,-118.01846,243000,
34.1415,-118.01803,238000,
34.13546,-117.98635,246000,
34.13533,-117.97758,252000,
34.13432,-117.95756,266000,
34.12978,-117.93371,251000,
34.12652,-117.91631,251000,
34.1206,-117.90762,246000,
34.12089,-117.89014,242000,
34.12064,-117.87267,240000,
34.11759,-117.8464,240000,
34.12071,-117.82591,184000,
34.11977,-117.80716,177000,
34.12006,-117.78677,165000,
34.11962,-117.7616,163000,
34.12043,-117.73647,159000,
34.12144,-117.69662,158000,
34.12444,-117.6924,158000,
34.12444,-117.6924,157000,
34.1347,-117.66999,162000,
34.13491,-117.61621,171000,
34.1351,-117.59344,173000,
34.13604,-117.57577,174000,
34.13654,-117.55837,164000,
34.1365,-117.53696,156000,
34.13639,-117.49582,130000,
34.1364,-117.48852,111000,
34.13638,-117.45354,107000,
34.13637,-117.43607,108000,
34.13644,-117.4185,107000,
34.13587,-117.3923,107000,
34.13591,-117.37045,105000,
34.13455,-117.33564,106000,
34.14448,-117.31934,102000,
34.1457,-117.30085,107000,
34.14566,-117.29821,130000,
34.14515,-117.27864,105000,
34.1426,-117.25262,84000,
34.13612,-117.23666,70000,
34.13023,-117.20553,70000,
34.12123,-117.20073,76000,
34.10795,-117.19899,93000,
34.07738,-117.20068,77000,
34.06572,-117.19969,107000,
34.06572,-117.19969,12000,
34.06572,-117.19969,27500,
34.06572,-117.19969,28000,
34.06572,-117.19969,28000,
34.06572,-117.19969,34000,
34.06572,-117.19969,30000,
40.5757,-124.26486,6200,
40.58804,-124.25651,6100,
40.59777,-124.23098,5600,
40.59964,-124.21413,5200,
40.59964,-124.21413,5200,
33.72297,-118.31286,27000,
33.7668,-118.31058,37500,
33.77903,-118.30948,22400,
33.78948,-118.30766,20700,
33.79785,-118.30763,28000,
33.81728,-118.30893,30000,
33.83157,-118.3091,30000,
33.84564,-118.30935,30000,
33.54845,-117.18052,85000,
33.55622,-117.18084,93000,
33.57291,-117.18086,90000,
33.59854,-117.17447,93000,
33.64154,-117.17117,85000,
33.68504,-117.17137,80000,
33.71514,-117.18905,74000,
33.74297,-117.1894,72000,
33.75425,-117.18928,88000,
33.78392,-117.21613,82000,
33.79187,-117.22819,99000,
33.80255,-117.23267,103000,
33.84378,-117.25082,117000,
33.86261,-117.25966,124000,
33.88792,-117.27006,120000,
33.90903,-117.28086,126000,
33.91678,-117.28749,124000,
33.93139,-117.28895,119000,
33.94569,-117.29633,170000,
33.95088,-117.30317,184000,
33.95895,-117.30952,180000,
33.96998,-117.32961,180000,
33.97558,-117.33528,180000,
33.98313,-117.34296,180000,
34.00136,-117.35198,150000,
34.01547,-117.34255,147000,
34.01939,-117.33965,147000,
34.01939,-117.33965,147000,
34.02406,-117.33539,153000,
34.03387,-117.32498,157000,
34.0476,-117.30757,170000,
34.06424,-117.2965,155000,
34.07835,-117.29656,140000,
34.08522,-117.30105,135000,
34.09203,-117.30188,136000,
34.10259,-117.30191,125000,
34.10826,-117.30273,125000,
34.12132,-117.30275,115000,
34.12918,-117.30363,65000,
34.13325,-117.30874,63000,
34.13606,-117.31308,58000,
34.14018,-117.31669,56000,
34.14455,-117.31928,72000,
34.16434,-117.33316,53000,
34.19094,-117.36118,53000,
34.22123,-117.40043,48000,
34.22515,-117.40964,48000,
36.32757,-119.26075,21500,
36.33304,-119.2607,16500,
36.33523,-119.26072,15000,
36.34049,-119.26093,18000,
36.34198,-119.25985,9200,
36.34204,-119.25201,3900,
36.38501,-119.21468,4200,
36.41378,-119.13945,6100,
36.4138,-119.13468,5450,
36.41373,-119.09878,5550,
36.41371,-119.08994,2150,
36.40053,-119.0297,1350,
36.39518,-119.02183,1350,
34.41466,-119.83951,11600,
34.41867,-119.83263,16000,
34.4354,-119.81789,21000,
34.44158,-119.81231,21900,
36.6102,-121.85788,23000,
36.60761,-121.85586,12500,
36.59892,-121.8508,19100,
36.59783,-121.84955,14600,
36.58088,-121.82796,13000,
37.70895,-121.08094,27500,
37.71102,-120.99493,14200,
38.24302,-121.65922,140,
38.23661,-121.60434,240,
38.23651,-121.60325,240,
38.23651,-121.60325,240,
38.23023,-121.60164,930,
38.24139,-122.26916,27000,
38.26308,-122.27083,29000,
38.27832,-122.27381,33000,
38.28049,-122.27412,33000,
39.13627,-123.20213,8000,
39.13311,-123.17717,5000,
39.1332,-123.16611,4600,
35.2091,-119.16527,1400,
35.20886,-119.10998,3750,
35.20871,-119.03923,3850,
35.20853,-119.01028,5900,
35.2086,-119.00323,5900,
35.20871,-118.91442,7050,
35.209,-118.84208,10200,
35.20909,-118.82873,9900,
35.20911,-118.82427,3800,
35.20919,-118.80637,2000,
35.21271,-118.73812,1550,
35.26417,-118.65841,1250,
34.42802,-119.73372,23000,
34.42608,-119.73498,16000,
34.41789,-119.74121,15000,
34.40354,-119.73001,15000,
34.40097,-119.71466,11000,
34.40537,-119.70368,14000,
34.40957,-119.69862,18000,
34.41064,-119.69749,22000,
34.4122,-119.69911,22000,
35.13411,-120.57002,3500,
35.13429,-120.5703,3000,
35.13461,-120.5708,1700,
35.14852,-120.57387,1150,
35.16897,-120.58239,3500,
35.19746,-120.60334,4000,
35.20074,-120.60898,10800,
35.21495,-120.61637,12000,
35.22746,-120.62784,15000,
35.42375,-120.54689,150,
35.53434,-120.52614,2000,
34.22655,-119.17741,40000,
34.23184,-119.17322,22700,
34.25797,-119.15315,14600,
34.27396,-119.13534,14600,
37.08347,-120.29739,3300,
37.11276,-120.27238,10500,
37.11393,-120.27124,11000,
37.12011,-120.2635,11400,
37.12213,-120.26094,12500,
37.12516,-120.25706,11300,
37.12689,-120.25236,11000,
37.12538,-122.1223,6000,
37.14517,-122.15704,2200,
37.16869,-122.21577,400,
37.17191,-122.22213,200,
37.19651,-122.19605,200,
37.38037,-122.073,34500,
37.38424,-122.06815,59000,
37.38572,-122.06457,58000,
37.38609,-122.06046,62000,
37.39247,-122.04988,63000,
37.40066,-122.03561,86000,
37.40313,-122.02653,95000,
37.40678,-122.00973,90000,
37.40922,-121.9987,121000,
37.4157,-121.97755,125000,
37.41917,-121.96003,127000,
37.4204,-121.93931,133000,
37.4204,-121.93931,66000,
37.4204,-121.93931,67000,
37.42569,-121.91649,61000,
37.43132,-121.90728,65000,
37.4347,-121.88851,65000,
37.54067,-121.92457,27500,
37.57267,-121.96801,31000,
37.57651,-121.97163,28500,
37.5791,-121.98298,28500,
37.58065,-121.9904,23700,
37.60235,-122.01573,27500,
37.61867,-122.03427,25000,
37.69003,-122.09794,138000,
37.68911,-122.106,137000,
37.69085,-122.13008,98000,
37.69024,-122.13644,98000,
33.58736,-117.61007,6600,
33.63343,-117.5992,16000,
33.64397,-117.60449,36500,
33.65496,-117.62495,37100,
33.66793,-117.65093,32200,
33.68011,-117.67333,39700,
33.69561,-117.69256,38700,
33.71805,-117.72025,32500,
33.78079,-117.74799,47700,
33.82475,-117.71651,47700,
33.86604,-117.71935,47700,
37.95923,-122.05206,111000,
37.9712,-122.04754,84000,
37.97899,-122.04332,119000,
37.98869,-122.04045,115000,
37.9975,-122.0385,103000,
38.00586,-122.03579,103000,
33.70463,-116.72561,3200,
33.73667,-116.72283,4650,
33.74569,-116.7146,5700,
33.74665,-116.71492,3700,
33.76088,-116.73782,1650,
33.91162,-116.87659,4600,
33.92168,-116.88524,6500,
33.92424,-116.88542,6500,
38.64523,-121.38313,8900,
38.64525,-121.38295,15700,
38.64697,-121.37488,32000,
38.64374,-121.3652,32000,
36.32585,-119.11697,3050,
36.41373,-119.09889,6100,
36.42872,-119.09946,1550,
36.44998,-119.12495,1100,
36.47167,-119.12237,650,
36.5665,-119.13297,150,
36.65737,-119.01442,200,
36.71969,-119.00011,200,
34.63919,-120.4799,3700,
34.63897,-120.45798,8250,
34.62912,-120.27821,8050,
34.6121,-120.19007,24800,
34.59604,-120.14521,19000,
34.59884,-120.128,18000,
34.61043,-120.05512,8050,
34.12345,-116.41406,11000,
34.44354,-116.85817,2200,
34.44203,-116.94703,1800,
34.45843,-116.94578,1750,
34.60184,-116.97957,1950,
34.81944,-117.02802,1700,
34.86227,-117.0175,13000,
34.88598,-117.02289,18000,
38.99914,-123.35839,2100,
39.10923,-123.19527,2700,
40.18609,-123.77127,800,
40.21911,-123.81175,1650,
40.26628,-123.8706,650,
40.30934,-123.91044,600,
40.33257,-123.92995,550,
40.39642,-123.93905,350,
40.43903,-124.03204,350,
40.80391,-124.15361,9600,
40.82591,-124.17643,7100,
40.8483,-124.16576,7000,
40.86213,-124.1571,6900,
40.86501,-124.15055,7400,
40.86565,-124.09086,8500,
40.86496,-124.08756,10100,
40.86462,-124.08648,15300,
40.86267,-124.08275,15300,
34.129,-117.30292,47000,
34.13605,-117.30265,44000,
34.14531,-117.298,44000,
34.14564,-117.29445,36000,
34.14554,-117.29227,36000,
37.78134,-122.27652,26500,
37.78134,-122.27652,27500,
37.78134,-122.27652,27500,
37.78134,-122.27652,26000,
33.71175,-117.80087,83000,
33.71478,-117.79858,37500,
33.72643,-117.77898,35600,
33.74083,-117.76698,32000,
33.78271,-117.74867,32000,
33.7844,-117.74673,27000,
37.4843,-121.93553,62000,
37.49054,-121.92871,63000,
37.49544,-121.92334,72000,
41.74034,-122.63328,1700,
41.76101,-122.62172,770,
41.83233,-122.59103,770,
41.4227,-122.3875,1700,
41.42332,-122.3966,1700,
37.46943,-117.83958,200,
37.48679,-117.91266,140,
37.57418,-117.98297,140,
39.3379,-120.16856,11000,
39.32025,-120.1572,12700,
39.31629,-120.15223,12700,
39.31629,-120.15223,12700,
39.31463,-120.14862,10400,
39.28705,-120.10392,8500,
39.26727,-120.07444,8400,
39.24679,-120.03103,9900,
39.23791,-120.03153,9900,
36.00029,-120.13685,2650,
36.07058,-120.10342,5800,
36.07058,-120.10342,5800,
36.07257,-120.10248,5200,
36.07657,-120.10203,1750,
36.25535,-120.10356,3600,
36.42965,-120.10309,3450,
38.17536,-119.1947,450,
38.19206,-119.05307,450,
39.83469,-123.63159,100,
39.83331,-123.67863,450,
39.84851,-123.70766,630,
39.95627,-123.77593,80,
39.96595,-123.79515,170,
40.00178,-123.78591,130,
40.42861,-122.28404,8500,
40.43856,-122.29128,11100,
40.44818,-122.2981,10800,
40.45045,-122.30141,10400,
40.45959,-122.31478,10800,
40.46455,-122.32202,12100,
40.46781,-122.3268,12100,
40.4707,-122.33101,10600,
40.49451,-122.36588,10900,
40.5055,-122.37906,17800,
40.51667,-122.38134,24000,
40.523,-122.38245,21900,
40.52892,-122.38349,15300,
40.55049,-122.3873,19000,
40.55457,-122.38802,15600,
40.57556,-122.38715,10000,
40.57556,-122.38715,11200,
40.57556,-122.38715,10600,
40.57556,-122.38715,10800,
40.57556,-122.38715,10800,
40.57556,-122.38715,6900,
40.57556,-122.38715,8300,
40.57556,-122.38715,8100,
40.57556,-122.38715,8200,
40.57556,-122.38715,7300,
40.57556,-122.38715,7000,
40.57556,-122.38715,5000,
40.57556,-122.38715,5000,
40.5877,-122.39225,17200,
40.5944,-122.38933,18900,
40.59944,-122.38409,21000,
40.60944,-122.3766,12900,
40.61364,-122.37531,12100,
40.6254,-122.37093,7800,
40.63388,-122.36776,7800,
38.57766,-121.52535,9300,
38.5805,-121.50809,9300,
38.5805,-121.50809,16500,
37.33967,-121.85196,153000,
37.33642,-121.85728,239000,
37.32853,-121.87112,216000,
37.32621,-121.88315,237000,
37.32389,-121.89223,193000,
37.32241,-121.8981,238000,
37.31474,-121.91096,166000,
37.31681,-121.92685,203000,
37.31731,-121.9403,181000,
37.31679,-121.95014,206000,
37.31721,-121.97495,178000,
37.32064,-121.99527,140000,
37.32305,-121.99987,159000,
37.33054,-122.01431,151000,
37.33438,-122.03233,136000,
37.33243,-122.05572,137000,
37.33436,-122.06806,116000,
37.3528,-122.1072,117000,
37.36103,-122.12002,109000,
37.38957,-122.16315,102000,
37.40888,-122.19398,94000,
37.40894,-122.19417,94000,
37.40894,-122.19417,94000,
37.41884,-122.21855,94000,
37.41899,-122.21939,103000,
37.43512,-122.243,101000,
37.44375,-122.26344,102000,
37.45985,-122.29036,102000,
37.46826,-122.29216,105000,
37.50734,-122.33913,100000,
37.52311,-122.35602,105000,
37.54722,-122.37225,102000,
37.58061,-122.40369,108000,
37.58906,-122.41239,101000,
37.59595,-122.41919,112000,
37.60432,-122.42777,97000,
37.61739,-122.42433,109000,
37.62424,-122.42837,99000,
37.62754,-122.4312,173000,
37.63039,-122.43495,192000,
37.63937,-122.44177,168000,
37.64515,-122.44923,182000,
37.66337,-122.46567,174000,
37.66972,-122.46612,209000,
37.67782,-122.47137,205000,
37.68892,-122.4706,221000,
37.68892,-122.4706,135000,
37.68892,-122.4706,135000,
37.70828,-122.46876,135000,
37.71064,-122.4568,176000,
37.72293,-122.44782,180000,
37.73125,-122.43557,165000,
37.73146,-122.42515,168000,
37.73146,-122.42515,72000,
37.73146,-122.42515,60000,
37.75439,-122.3918,113000,
37.75439,-122.3918,53000,
37.75439,-122.3918,113000,
37.75567,-122.39219,114000,
37.7635,-122.39273,104000,
37.76886,-122.39724,59000,
37.7748,-122.40099,59000,
38.96676,-122.73778,3900,
38.95446,-122.72737,6200,
38.92969,-122.74149,6200,
38.92969,-122.74149,15800,
38.92969,-122.74149,14200,
38.92969,-122.74149,15800,
38.92969,-122.74149,13300,
38.92969,-122.74149,24200,
38.92969,-122.74149,24200,
38.92969,-122.74149,16400,
38.92969,-122.74149,15700,
38.92969,-122.74149,14700,
38.92969,-122.74149,14200,
38.92969,-122.74149,14200,
40.48827,-124.09847,2150,
40.49281,-124.1012,2150,
39.79766,-120.13961,580,
39.89275,-120.19106,320,
40.89726,-124.08329,12900,
40.9042,-124.07354,11700,
40.91008,-124.05807,13100,
40.90687,-124.0383,11400,
40.89828,-124.02093,10100,
40.88808,-123.99788,3300,
40.88765,-123.98269,3500,
40.88742,-123.97518,3500,
40.88399,-123.96741,3400,
40.92769,-123.84418,3200,
40.93937,-123.63144,4500,
40.9391,-123.63034,4600,
40.90165,-123.61005,3400,
40.88896,-123.60103,3400,
40.88896,-123.60103,3000,
40.89273,-123.58154,2700,
40.80912,-123.47458,1600,
40.77813,-123.33212,1600,
40.77038,-123.30713,1600,
40.73733,-123.20403,1950,
40.73628,-122.94863,2650,
40.72745,-122.93623,8800,
40.72067,-122.92838,6200,
40.65129,-122.9393,3800,
40.67267,-122.86281,3200,
40.66361,-122.79723,3400,
40.63512,-122.73384,3400,
40.63512,-122.73384,3400,
40.66546,-122.63683,4000,
40.61508,-122.5194,5000,
40.6043,-122.50168,9700,
40.58254,-122.43732,9700,
40.58372,-122.42682,12000,
40.58639,-122.39733,20000,
40.58765,-122.39229,20000,
40.61229,-122.36324,20000,
40.62078,-122.31866,9100,
40.63843,-122.24254,4350,
40.79439,-121.94193,3300,
40.86559,-121.90739,2600,
40.87282,-121.69723,2750,
40.87978,-121.67434,8600,
40.88198,-121.66641,8600,
40.89246,-121.65054,5800,
40.92186,-121.62322,4350,
40.93813,-121.60664,2700,
41.00118,-121.44663,2800,
41.00383,-121.43917,3300,
41.04983,-121.40315,3000,
41.05853,-121.37693,1950,
41.07287,-121.33154,1250,
41.07287,-121.33154,1250,
41.08436,-121.19544,1250,
41.13225,-121.13148,900,
41.18429,-120.95035,950,
41.18429,-120.95035,950,
41.18682,-120.9457,1300,
41.43794,-120.87868,1400,
41.44443,-120.86891,1400,
41.49453,-120.54936,2600,
41.4945,-120.54259,950,
41.52957,-120.172,450,
41.55758,-119.99915,240,
34.12923,-117.20416,9000,
34.20487,-117.10416,10000,
33.4416,-116.86173,6200,
33.48478,-116.83443,7400,
33.54342,-116.73569,7200,
33.55512,-116.67456,6950,
33.56956,-116.59144,3750,
37.6277,-122.43139,139000,
37.63298,-122.41908,159000,
37.63603,-122.40379,184000,
37.63859,-122.39772,184000,
34.40005,-117.40156,23000,
34.42671,-117.40003,23000,
34.47026,-117.39949,22500,
34.49314,-117.39951,21500,
34.50668,-117.39954,18500,
34.57209,-117.40962,15000,
34.60089,-117.41949,9500,
34.99234,-117.54158,4000,
35.36668,-117.61963,4000,
35.37151,-117.63154,4000,
35.37151,-117.63154,3900,
35.3803,-117.64762,4200,
35.55101,-117.71368,2950,
35.6519,-117.80115,2750,
35.69344,-117.86581,5650,
35.7981,-117.87273,5700,
35.7981,-117.87273,5700,
36.28241,-118.00626,5500,
36.57927,-118.05762,6500,
36.6049,-118.063,6500,
36.62011,-118.06882,6000,
36.80254,-118.19966,6300,
36.8082,-118.20327,6300,
37.1737,-118.29056,7700,
37.35863,-118.39522,12400,
37.36126,-118.39528,14900,
37.3746,-118.39591,13100,
37.37586,-118.41349,13100,
37.38091,-118.47755,7300,
37.41935,-118.55526,6550,
37.46293,-118.57832,6550,
37.46293,-118.57832,6550,
37.58769,-118.78404,6900,
37.6398,-118.914,4300,
37.81272,-119.05355,4200,
37.95036,-119.11288,4500,
37.96085,-119.12238,3600,
38.0453,-119.16078,3100,
38.25513,-119.2231,3600,
38.27626,-119.28926,2800,
38.34847,-119.45225,2900,
38.51333,-119.47136,3550,
38.64266,-119.52759,3500,
38.68774,-119.54857,3500,
38.68774,-119.54857,7800,
38.68774,-119.54857,7800,
39.70874,-120.03493,7800,
39.77508,-120.03866,5300,
40.09092,-120.17213,4350,
40.28413,-120.49064,4900,
40.31315,-120.53724,7300,
40.38055,-120.59187,3650,
40.36518,-120.42278,1400,
40.38174,-120.38433,1050,
40.37729,-120.31584,850,
40.79862,-120.36598,840,
41.05429,-120.47398,830,
41.18422,-120.50469,830,
41.18422,-120.50469,830,
41.2306,-120.50391,1100,
41.47942,-120.54239,1900,
41.48408,-120.54244,6100,
41.49412,-120.54258,5200,
41.49651,-120.53859,2750,
41.54018,-120.45992,880,
41.99287,-120.29807,790,
33.64321,-117.73412,190500,
33.64808,-117.7471,212600,
33.65173,-117.76111,249200,
33.6577,-117.77795,255500,
33.6634,-117.79488,243600,
33.66948,-117.82276,268700,
33.67678,-117.84356,278000,
33.68274,-117.85699,279500,
33.68735,-117.87226,239500,
33.68739,-117.88557,229700,
33.68762,-117.89902,292500,
33.68907,-117.9191,312600,
33.69562,-117.93499,291700,
33.70529,-117.95436,269500,
33.71596,-117.96709,251500,
33.73269,-117.98932,265200,
33.74461,-118.00482,262100,
33.75902,-118.02197,245500,
33.77449,-118.04234,377000,
33.77438,-118.07499,369100,
33.78441,-118.09177,254100,
33.78589,-118.09312,254100,
33.78848,-118.09661,261000,
33.79025,-118.09898,261000,
33.79667,-118.10758,255000,
33.80173,-118.11448,260000,
33.80273,-118.12371,268000,
33.80575,-118.14262,279000,
33.81351,-118.16764,290000,
33.81432,-118.17634,290000,
33.81535,-118.18504,178000,
33.81717,-118.18892,285000,
33.82646,-118.20746,279000,
33.82551,-118.22796,268000,
33.82583,-118.24135,252000,
33.83146,-118.25566,248000,
33.83916,-118.26319,267000,
33.85692,-118.28471,256000,
33.85907,-118.28942,266000,
33.85982,-118.29887,257000,
33.85984,-118.30887,248000,
33.86449,-118.32617,242000,
33.87283,-118.34217,243000,
33.88464,-118.35255,256000,
33.89077,-118.36107,271000,
33.90157,-118.37041,299000,
33.91625,-118.37021,240000,
33.93005,-118.36839,314000,
33.94503,-118.36836,324000,
33.96162,-118.3694,290000,
33.97182,-118.37796,314000,
33.98772,-118.39909,311000,
34.00295,-118.41112,316000,
34.01223,-118.41846,314000,
34.03128,-118.43356,295000,
34.0389,-118.43976,317000,
34.04687,-118.44659,298000,
34.05552,-118.45193,278000,
34.06701,-118.4616,270000,
34.07286,-118.46665,274000,
34.07633,-118.46933,278000,
34.09628,-118.47686,279000,
34.12634,-118.47551,278000,
34.16001,-118.46948,211000,
34.17212,-118.46765,211000,
34.1864,-118.47411,211000,
34.20093,-118.47352,216000,
34.22113,-118.47319,216000,
34.23534,-118.47305,214000,
34.266,-118.47216,144000,
34.27164,-118.47207,136000,
34.27886,-118.46981,135000,
34.29141,-118.46817,135000,
38.37276,-121.95445,31500,
38.39399,-121.9498,26500,
38.41729,-121.94432,22600,
38.45338,-121.94184,21900,
38.52566,-121.95294,21500,
38.52566,-121.95294,21500,
38.53139,-121.95296,17200,
38.58401,-121.95319,17000,
38.62039,-121.95336,16700,
38.67962,-121.95203,10600,
38.71995,-121.95877,9900,
38.77727,-121.94572,8900,
38.81581,-121.93891,8900,
38.85295,-121.94505,8900,
37.59738,-121.34196,21000,
37.63879,-121.40206,30000,
37.67223,-121.45723,29000,
37.67223,-121.45723,31000,
37.67223,-121.45723,35000,
37.67223,-121.45723,14300,
37.74046,-121.5857,143000,
37.74046,-121.5857,143000,
37.71797,-121.70035,142000,
37.70904,-121.7238,166000,
37.7026,-121.74033,165000,
37.70085,-121.77384,173000,
37.69964,-121.78547,182000,
37.70098,-121.81649,183000,
37.70121,-121.84882,186000,
37.70145,-121.87208,197000,
37.70159,-121.88802,214000,
37.70174,-121.90695,184000,
37.701,-121.9226,176000,
37.69834,-121.93503,176000,
37.70117,-122.02174,175000,
37.69275,-122.06244,173000,
37.69076,-122.07352,191000,
37.69063,-122.08903,179000,
37.69037,-122.09697,138000,
37.69993,-122.10838,138000,
37.70846,-122.12263,125000,
37.70974,-122.12431,150000,
37.71505,-122.1315,152000,
37.72192,-122.13544,146000,
37.72946,-122.13843,149000,
37.73845,-122.14168,148000,
37.74484,-122.14853,158000,
37.75369,-122.1513,160000,
37.77196,-122.15639,162000,
37.77632,-122.16403,176000,
37.78093,-122.17342,169000,
37.78366,-122.17829,136000,
37.78533,-122.19268,132000,
37.78651,-122.19536,149000,
37.79219,-122.20337,174000,
37.79662,-122.21079,154000,
37.79795,-122.21561,183000,
37.80092,-122.2286,160000,
37.80428,-122.23344,193000,
37.80954,-122.24579,171000,
37.81126,-122.24981,194000,
37.82449,-122.26908,227000,
37.82715,-122.28449,233000,
37.82645,-122.2888,117000,
37.82645,-122.2888,117000,
37.82645,-122.2888,233000,
37.82645,-122.2888,117000,
37.82645,-122.2888,233000,
37.88845,-122.30894,87000,
37.89746,-122.31192,87000,
37.89746,-122.31192,87000,
37.90034,-122.31423,88000,
37.91216,-122.32394,90000,
37.92087,-122.33468,88000,
37.92183,-122.34817,77000,
37.92364,-122.36018,71000,
37.92717,-122.37823,57000,
37.93114,-122.39142,69000,
37.93204,-122.40128,68000,
37.93229,-122.40335,68000,
37.93438,-122.4338,68000,
37.93438,-122.4338,68000,
37.94253,-122.47739,68000,
37.94331,-122.48007,71000,
37.94488,-122.48787,45000,
37.96089,-122.50688,58000,
37.96312,-122.51136,58000,
33.77862,-118.09115,44100,
33.78412,-118.0916,161500,
33.80282,-118.08187,166000,
33.80628,-118.08142,173500,
33.80628,-118.08142,174000,
33.81044,-118.08146,190000,
33.83116,-118.08392,208000,
33.84592,-118.0924,219000,
33.85839,-118.09618,237000,
33.87638,-118.10248,291000,
33.88731,-118.1044,291000,
33.91439,-118.10477,292000,
33.94119,-118.0966,265000,
33.94947,-118.09208,250000,
33.96696,-118.08345,238000,
33.97373,-118.08011,257000,
33.99344,-118.06923,258000,
34.0044,-118.06379,256000,
34.01794,-118.05277,259000,
34.02727,-118.03761,252000,
34.03399,-118.02716,217000,
34.05407,-118.00439,214000,
34.06513,-118.00016,183000,
34.07765,-117.99806,175000,
34.09191,-117.99152,158000,
34.10912,-117.98102,133000,
34.11497,-117.97776,147000,
34.13427,-117.95738,147000,
37.33967,-121.85195,148000,
37.34309,-121.84675,205000,
37.3522,-121.83794,183000,
37.35563,-121.83867,154000,
37.35999,-121.8413,177000,
37.3683,-121.84649,165000,
37.38456,-121.86303,164000,
37.3954,-121.87408,142000,
37.39898,-121.87563,145000,
37.4144,-121.8804,138000,
37.4347,-121.88855,130000,
37.44723,-121.8913,122000,
37.46451,-121.90412,122000,
37.46451,-121.90412,122000,
37.46602,-121.90533,123000,
37.49552,-121.92321,140000,
37.51464,-121.93974,140000,
37.53162,-121.94066,139000,
37.54064,-121.92454,140000,
37.55515,-121.91613,140000,
37.56214,-121.90536,138000,
37.57447,-121.88531,139000,
37.58888,-121.87084,140000,
37.59285,-121.87062,113000,
37.60071,-121.87248,118000,
37.63986,-121.88458,115000,
37.65673,-121.90151,132000,
37.69048,-121.9186,142000,
37.70096,-121.92272,167000,
37.72338,-121.9401,167000,
37.72338,-121.9401,167000,
37.7235,-121.94019,165000,
37.76006,-121.96545,156000,
37.77714,-121.97523,163000,
37.81139,-121.99289,178000,
37.82343,-121.99387,176000,
37.82968,-122.00093,178000,
37.83482,-122.00895,181000,
37.85146,-122.02885,182000,
37.86348,-122.03565,184000,
37.87923,-122.04915,181000,
37.88612,-122.05567,182000,
37.89381,-122.06688,163000,
37.89845,-122.07104,233000,
37.90531,-122.06957,233000,
37.91593,-122.06552,256000,
37.92645,-122.06064,235000,
37.93386,-122.06023,253000,
37.93996,-122.06025,233000,
37.94579,-122.058,230000,
37.95927,-122.0526,133000,
37.96609,-122.05614,131000,
37.97565,-122.06388,129000,
37.99457,-122.06986,112000,
38.00802,-122.08533,98000,
38.01105,-122.08857,100000,
38.02441,-122.10947,102000,
38.0263,-122.11386,102000,
38.0263,-122.11386,102000,
38.05335,-122.12784,63000,
38.06481,-122.13069,57000,
38.0703,-122.12615,59000,
38.0858,-122.11193,57000,
38.18185,-122.13382,64000,
38.21669,-122.13789,60000,
33.76916,-118.20723,57500,
33.77798,-118.2071,115000,
33.78267,-118.20765,131000,
33.7899,-118.20787,150000,
33.80439,-118.20747,160000,
33.82647,-118.20747,180000,
33.84657,-118.20551,186000,
33.8626,-118.19931,195000,
33.87547,-118.19315,223000,
33.88904,-118.1889,230000,
33.91282,-118.18004,229000,
33.93085,-118.17878,209000,
33.94974,-118.17039,198000,
33.96812,-118.16774,187000,
33.99747,-118.17676,210000,
34.00447,-118.17302,210000,
34.01652,-118.17297,178000,
34.02353,-118.17262,185000,
34.03562,-118.17003,125000,
34.06119,-118.16514,43500,
34.12407,-118.15431,43500,
34.12407,-118.15431,24000,
34.13065,-118.15477,14900,
34.13066,-118.15477,13600,
34.13155,-118.15482,16600,
34.13156,-118.15482,16200,
34.13571,-118.15483,28000,
34.14034,-118.15487,46800,
34.1407,-118.15491,66000,
34.14965,-118.15553,66000,
38.05013,-122.13941,52000,
38.05859,-122.15019,55000,
38.06472,-122.16459,55000,
38.06883,-122.18272,57000,
38.07859,-122.19125,49000,
38.0857,-122.2101,56000,
38.08901,-122.2213,56000,
38.0915,-122.23043,24700,
38.09275,-122.2348,24700,
32.54926,-117.03977,41500,
32.55147,-117.04099,55000,
32.5682,-117.04061,100000,
32.58377,-117.03708,136000,
32.59473,-117.03628,138000,
32.6058,-117.03628,152000,
32.62864,-117.04361,192000,
32.64054,-117.05532,207000,
32.64775,-117.06068,262000,
32.65831,-117.07452,206000,
32.67706,-117.08453,198000,
32.68666,-117.09195,209000,
32.70428,-117.09504,227000,
32.71135,-117.10055,219000,
32.71904,-117.10283,220000,
32.72566,-117.10339,216000,
32.73198,-117.11152,166000,
32.74868,-117.12238,172000,
32.75529,-117.12492,176000,
32.76319,-117.1274,194000,
32.77181,-117.13183,193000,
32.78544,-117.1453,189000,
32.80375,-117.15081,167000,
32.80881,-117.15286,187000,
32.8217,-117.16244,185000,
32.83343,-117.16957,179000,
32.84752,-117.17818,198000,
32.85764,-117.18429,194000,
32.86971,-117.19488,174000,
32.8752,-117.19936,173000,
32.89036,-117.20603,153000,
32.90508,-117.22448,153000,
32.90508,-117.22448,44500,
32.90508,-117.22448,44500,
32.90508,-117.22448,44500,
32.90508,-117.22448,44500,
37.3173,-121.94026,155000,
37.33416,-121.93673,153000,
37.34262,-121.92593,153000,
37.34881,-121.91819,147000,
37.35817,-121.90731,156000,
37.36418,-121.9018,167000,
37.3669,-121.9011,165000,
37.3819,-121.90434,158000,
37.40169,-121.90902,168000,
37.41551,-121.91301,163000,
37.42562,-121.91648,205000,
37.45353,-121.92282,197000,
37.45488,-121.92307,197000,
37.45488,-121.92307,197000,
37.48318,-121.93651,178000,
37.49255,-121.94834,167000,
37.50735,-121.96743,184000,
37.52248,-121.98762,186000,
37.5298,-122.00224,196000,
37.5467,-122.02288,199000,
37.56354,-122.03849,195000,
37.57865,-122.04825,194000,
37.59875,-122.06096,196000,
37.60678,-122.06668,194000,
37.61753,-122.07436,209000,
37.63152,-122.08434,219000,
37.64478,-122.09383,241000,
37.65643,-122.10149,254000,
37.6663,-122.10758,244000,
37.68516,-122.12993,223000,
37.68997,-122.13693,206000,
37.7105,-122.16663,201000,
37.71903,-122.17662,202000,
37.73201,-122.18892,192000,
37.7407,-122.19653,200000,
37.75392,-122.20809,205000,
37.76964,-122.22116,202000,
37.77506,-122.23341,203000,
37.77722,-122.23671,211000,
37.7867,-122.24623,221000,
37.78956,-122.25586,216000,
37.79522,-122.26656,193000,
37.79613,-122.26888,195000,
37.79909,-122.27641,117000,
32.56406,-117.07707,24200,
32.56406,-117.07707,24200,
32.56406,-117.07707,9100,
32.56406,-117.07707,26500,
32.56755,-117.06781,26500,
32.56835,-117.06333,58000,
32.56828,-117.05334,58000,
32.5682,-117.04059,57000,
32.56629,-117.01442,50000,
32.56427,-116.97982,46000,
32.5642,-116.96315,36500,
32.55543,-116.93986,27500,
32.55024,-116.93861,2200,
37.79897,-122.27624,73000,
37.80696,-122.27791,59000];
/*This is needed to sort nearest routes numberically instead of alphebetically*/
function sortNumber(a,b) {
    return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
}
/*Find the nearest traffic volume count points to a specified location*/
function findRoutes(lat, lng){
	var count = 10;
	var nearest = [];
	for(var i = 0; i < count; i++){
		nearest.push([9999,0,0,0]);
	}
	for(var i = 0; i < data.length; i+=3){
		distance = Math.sqrt(Math.pow(data[i]-lat,2)+Math.pow(data[i+1]-lng,2))*50;
		if (distance < nearest[nearest.length-1][0]){
			distance = Math.round(distance*1000)/1000;
			nearest[nearest.length-1] = [distance, data[i], data[i+1], data[i+2]];
			nearest.sort(sortNumber);
		}
	}
	return nearest;
}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//




/*Add event listenter to the rating button*/

if(document.getElementsByClassName('get-rating')[0]){
	document.getElementsByClassName('get-rating')[0].addEventListener('click', getRating, false);
}
/*Add factual component of prediction equation after the data has been updated */
var factualData = document.getElementById('factual-data').innerHTML;
document.getElementById('factual-data').onLoad(getCompetitionRating());
/*Store the rating in the browser to it is available after page changes*/
if (typeof window.localStorage != "undefined") {
    document.getElementsByClassName('rating')[0].innerHTML = localStorage.getItem('rating');
}
;
