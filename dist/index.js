Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
// \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll = (all, flags) => {
	let target = Object.setPrototypeOf({}, null);
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!(flags & 1)) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return flags & 2 ? target : Object.preventExtensions(target);
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
let node_stream = require("node:stream");
node_stream = __toESM(node_stream, 1);
// \0@oxc-project+runtime@0.159.0/helpers/esm/checkPrivateRedeclaration.js
function _checkPrivateRedeclaration(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
// \0@oxc-project+runtime@0.159.0/helpers/esm/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}
// \0@oxc-project+runtime@0.159.0/helpers/esm/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
// \0@oxc-project+runtime@0.159.0/helpers/esm/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
// \0@oxc-project+runtime@0.159.0/helpers/esm/classPrivateFieldSet2.js
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}
// node_modules/iconv-lite/dist/lib/bom-handling.js
const BOMChar = "﻿";
const BOM_BYTES = Symbol("bomBytes");
var PrependBOM = class {
	constructor(encoder) {
		this.encoder = encoder;
		this.addBOM = true;
	}
	write(str) {
		const res = this.addBOM && this.encoder.writeWithBOM ? this.encoder.writeWithBOM(str) : this.encoder.write(this.addBOM ? BOMChar + str : str);
		if (res !== null) this.addBOM = false;
		return res;
	}
	end() {
		return this.encoder.end();
	}
};
var _bomOffset = /* @__PURE__ */ new WeakMap();
var StripBOM = class {
	constructor(decoder, options) {
		_classPrivateFieldInitSpec(this, _bomOffset, 0);
		this.decoder = decoder;
		this.pass = false;
		this.options = options || {};
	}
	write(buf) {
		let res = this.decoder.write(buf);
		if (this.pass) return res;
		const bom = this.decoder[BOM_BYTES];
		if (bom) for (let i = 0; i < buf.length && _classPrivateFieldGet2(_bomOffset, this) < bom.length; i++) {
			var _this$bomOffset;
			if (buf[i] !== bom[_classPrivateFieldGet2(_bomOffset, this)]) {
				this.pass = true;
				return res;
			}
			_classPrivateFieldSet2(_bomOffset, this, (_this$bomOffset = _classPrivateFieldGet2(_bomOffset, this), _this$bomOffset++, _this$bomOffset));
		}
		if (!res) return res;
		if (res[0] === BOMChar) {
			res = res.slice(1);
			if (typeof this.options.stripBOM === "function") this.options.stripBOM();
		}
		this.pass = true;
		return res;
	}
	end() {
		return this.decoder.end();
	}
};
// \0@oxc-project+runtime@0.159.0/helpers/esm/classPrivateMethodInitSpec.js
function _classPrivateMethodInitSpec(e, a) {
	_checkPrivateRedeclaration(e, a), a.add(e);
}
// node_modules/iconv-lite/dist/lib/web-streams.js
var _codec$1 = /* @__PURE__ */ new WeakMap();
var _encoding$1 = /* @__PURE__ */ new WeakMap();
var _CodecTransformer_brand = /* @__PURE__ */ new WeakSet();
var CodecTransformer = class {
	constructor(codec, encoding) {
		_classPrivateMethodInitSpec(this, _CodecTransformer_brand);
		_classPrivateFieldInitSpec(this, _codec$1, void 0);
		_classPrivateFieldInitSpec(this, _encoding$1, void 0);
		_classPrivateFieldSet2(_codec$1, this, codec);
		_classPrivateFieldSet2(_encoding$1, this, encoding);
	}
	transform(chunk, controller) {
		if (_classPrivateFieldGet2(_encoding$1, this)) {
			if (typeof chunk !== "string") throw new TypeError("Iconv encoding stream needs strings as its input.");
		} else if (!(chunk instanceof Uint8Array)) throw new TypeError("Iconv decoding stream needs Uint8Array-s or Buffers as its input.");
		_assertClassBrand(_CodecTransformer_brand, this, _enqueue).call(this, _classPrivateFieldGet2(_codec$1, this).write(chunk), controller);
	}
	flush(controller) {
		_assertClassBrand(_CodecTransformer_brand, this, _enqueue).call(this, _classPrivateFieldGet2(_codec$1, this).end(), controller);
	}
};
function _enqueue(result, controller) {
	if (result === null || result === void 0 ? void 0 : result.length) controller.enqueue(result);
}
function createEncodeWebStream(encoder) {
	return new TransformStream(new CodecTransformer(encoder, true));
}
function createDecodeWebStream(decoder) {
	return new TransformStream(new CodecTransformer(decoder, false));
}
function getDefaultCharByte(options) {
	const byte = options === null || options === void 0 ? void 0 : options.defaultCharByte;
	if (byte === void 0) return 63;
	if (!Number.isInteger(byte) || byte < 0 || byte > 255) throw new TypeError("defaultCharByte must be an integer between 0 and 255");
	return byte;
}
var _callback = /* @__PURE__ */ new WeakMap();
var _encoding = /* @__PURE__ */ new WeakMap();
var _pending$2 = /* @__PURE__ */ new WeakMap();
var EncodingHandler = class {
	constructor(callback, encoding) {
		_classPrivateFieldInitSpec(this, _callback, void 0);
		_classPrivateFieldInitSpec(this, _encoding, void 0);
		_classPrivateFieldInitSpec(this, _pending$2, null);
		_classPrivateFieldSet2(_callback, this, callback);
		_classPrivateFieldSet2(_encoding, this, encoding);
	}
	get hasPending() {
		return _classPrivateFieldGet2(_pending$2, this) !== null;
	}
	clear() {
		_classPrivateFieldSet2(_pending$2, this, null);
	}
	*read(str, final = false) {
		if (str.length === 0 && !final) return;
		const pending = _classPrivateFieldGet2(_pending$2, this);
		_classPrivateFieldSet2(_pending$2, this, null);
		if (pending) str = pending.char + str;
		let index = 0;
		for (let offset = 0; offset < str.length;) {
			const previous = pending !== null && offset === 0;
			const position = previous ? pending.index : index;
			const code = str.codePointAt(offset);
			const char = String.fromCodePoint(code);
			if (!final && code >= 55296 && code <= 56319 && offset + 1 === str.length) {
				_classPrivateFieldSet2(_pending$2, this, {
					char,
					index: position
				});
				return;
			}
			yield {
				char,
				index: position
			};
			offset += char.length;
			if (!previous || char.length === 2) index++;
		}
	}
	resolve(char, index) {
		const result = _classPrivateFieldGet2(_callback, this).call(this, char, index);
		if (result === true) return null;
		if (result === void 0 || result === false) return void 0;
		if (typeof result === "string") return result;
		throw new TypeError("invalidCharHandler must return a string, boolean, or undefined");
	}
	replacementError(char, index) {
		return /* @__PURE__ */ new TypeError("Replacement " + JSON.stringify(char) + " cannot be encoded in " + _classPrivateFieldGet2(_encoding, this) + " at index " + index);
	}
};
var _backend$1 = /* @__PURE__ */ new WeakMap();
var _bytes = /* @__PURE__ */ new WeakMap();
var _length = /* @__PURE__ */ new WeakMap();
var EncodingBuffer = class {
	constructor(backend, capacity = 32) {
		_classPrivateFieldInitSpec(this, _backend$1, void 0);
		_classPrivateFieldInitSpec(this, _bytes, void 0);
		_classPrivateFieldInitSpec(this, _length, 0);
		_classPrivateFieldSet2(_backend$1, this, backend);
		_classPrivateFieldSet2(_bytes, this, backend.allocBytes(Math.max(32, capacity)));
	}
	writeByte(byte) {
		var _this$length, _this$length2;
		if (_classPrivateFieldGet2(_length, this) === _classPrivateFieldGet2(_bytes, this).length) {
			const grown = _classPrivateFieldGet2(_backend$1, this).allocBytes(_classPrivateFieldGet2(_bytes, this).length * 2);
			grown.set(_classPrivateFieldGet2(_bytes, this));
			_classPrivateFieldSet2(_bytes, this, grown);
		}
		_classPrivateFieldGet2(_bytes, this)[_classPrivateFieldSet2(_length, this, (_this$length = _classPrivateFieldGet2(_length, this), _this$length2 = _this$length++, _this$length)), _this$length2] = byte;
	}
	writeCode(code) {
		if (code > 0xffffff) this.writeByte(code >>> 24);
		if (code > 65535) this.writeByte(code >>> 16);
		if (code > 255) this.writeByte(code >>> 8);
		this.writeByte(code);
	}
	finish() {
		return _classPrivateFieldGet2(_backend$1, this).bytesToResult(_classPrivateFieldGet2(_bytes, this), _classPrivateFieldGet2(_length, this));
	}
};
var _encoder = /* @__PURE__ */ new WeakMap();
var _backend2 = /* @__PURE__ */ new WeakMap();
var _handler$2 = /* @__PURE__ */ new WeakMap();
var _representable = /* @__PURE__ */ new WeakMap();
var _fallback = /* @__PURE__ */ new WeakMap();
var _TextEncoderWithHandler_brand = /* @__PURE__ */ new WeakSet();
var TextEncoderWithHandler = class {
	constructor(encoder, backend, callback, encoding, representable, fallback) {
		_classPrivateMethodInitSpec(this, _TextEncoderWithHandler_brand);
		_classPrivateFieldInitSpec(this, _encoder, void 0);
		_classPrivateFieldInitSpec(this, _backend2, void 0);
		_classPrivateFieldInitSpec(this, _handler$2, void 0);
		_classPrivateFieldInitSpec(this, _representable, void 0);
		_classPrivateFieldInitSpec(this, _fallback, void 0);
		_classPrivateFieldSet2(_encoder, this, encoder);
		_classPrivateFieldSet2(_backend2, this, backend);
		_classPrivateFieldSet2(_handler$2, this, new EncodingHandler(callback, encoding));
		_classPrivateFieldSet2(_representable, this, representable);
		_classPrivateFieldSet2(_fallback, this, fallback);
	}
	write(str) {
		const prepared = _assertClassBrand(_TextEncoderWithHandler_brand, this, _prepare).call(this, str, false);
		return prepared === null ? null : _classPrivateFieldGet2(_encoder, this).write(prepared);
	}
	writeWithBOM(str) {
		const prepared = _assertClassBrand(_TextEncoderWithHandler_brand, this, _prepare).call(this, str, false);
		return prepared === null ? null : _classPrivateFieldGet2(_encoder, this).write("﻿" + prepared);
	}
	end() {
		const prepared = _assertClassBrand(_TextEncoderWithHandler_brand, this, _prepare).call(this, "", true);
		if (prepared === null) return null;
		const head = prepared.length ? _classPrivateFieldGet2(_encoder, this).write(prepared) : void 0;
		const tail = _classPrivateFieldGet2(_encoder, this).end();
		if ((head === null || head === void 0 ? void 0 : head.length) && (tail === null || tail === void 0 ? void 0 : tail.length)) return _classPrivateFieldGet2(_backend2, this).concatByteResults([head, tail]);
		return (head === null || head === void 0 ? void 0 : head.length) ? head : tail;
	}
};
function _prepare(str, final) {
	const pieces = [];
	try {
		for (const { char, index } of _classPrivateFieldGet2(_handler$2, this).read(str, final)) {
			if (_classPrivateFieldGet2(_representable, this).call(this, char)) {
				pieces.push(char);
				continue;
			}
			const replacement = _classPrivateFieldGet2(_handler$2, this).resolve(char, index);
			if (replacement === null) {
				_classPrivateFieldGet2(_handler$2, this).clear();
				return null;
			}
			if (replacement === void 0) {
				var _this$fallback;
				pieces.push((_this$fallback = _classPrivateFieldGet2(_fallback, this)) !== null && _this$fallback !== void 0 ? _this$fallback : char);
			} else {
				for (const replacementChar of replacement) if (!_classPrivateFieldGet2(_representable, this).call(this, replacementChar)) throw _classPrivateFieldGet2(_handler$2, this).replacementError(replacementChar, index);
				pieces.push(replacement);
			}
		}
		return pieces.join("");
	} catch (error) {
		_classPrivateFieldGet2(_handler$2, this).clear();
		throw error;
	}
}
function isUnicodeScalar(char) {
	const code = char.codePointAt(0);
	return code < 55296 || code > 57343;
}
function isBinaryCharacter(char) {
	return char.length === 1 && char.charCodeAt(0) <= 255;
}
// node_modules/iconv-lite/dist/lib/decoding.js
function getDefaultCharUnicode(options) {
	const replacement = options === null || options === void 0 ? void 0 : options.defaultCharUnicode;
	if (replacement === void 0) return "�";
	if (typeof replacement !== "string") throw new TypeError("defaultCharUnicode must be a string");
	return replacement;
}
function replaceDecodeErrors(text, errors, replacement) {
	if (!(errors === null || errors === void 0 ? void 0 : errors.length)) return text;
	const parts = [];
	let start = 0;
	for (const index of errors) {
		parts.push(text.slice(start, index), replacement);
		start = index + 1;
	}
	parts.push(text.slice(start));
	return parts.join("");
}
// node_modules/iconv-lite/dist/encodings/internal.js
var InternalCodec = class {
	constructor(codecOptions) {
		this.enc = codecOptions.encodingName;
		this.bomAware = codecOptions.bomAware;
	}
	createEncoder(options, iconv) {
		if ((this.enc === "hex" || this.enc === "base64") && (options === null || options === void 0 ? void 0 : options.invalidCharHandler) !== void 0) throw new TypeError("invalidCharHandler is not supported for " + this.enc);
		if (this.enc === "base64") return new InternalEncoderBase64(iconv.backend);
		else if (this.enc === "utf8") {
			const encoder = new InternalEncoderUtf8(iconv.backend);
			return typeof (options === null || options === void 0 ? void 0 : options.invalidCharHandler) === "function" ? new TextEncoderWithHandler(encoder, iconv.backend, options.invalidCharHandler, this.enc, isUnicodeScalar, "�") : encoder;
		} else if (this.enc === "cesu8") return new InternalEncoderCesu8(iconv.backend);
		const encoder = new InternalEncoder(iconv.backend, this.enc);
		return this.enc === "binary" && typeof (options === null || options === void 0 ? void 0 : options.invalidCharHandler) === "function" ? new TextEncoderWithHandler(encoder, iconv.backend, options.invalidCharHandler, this.enc, isBinaryCharacter) : encoder;
	}
	createDecoder(options, iconv) {
		if (this.enc === "utf8") return new InternalDecoder(options);
		else if (this.enc === "cesu8") return new InternalDecoderCesu8(getDefaultCharUnicode(options));
		else if (this.enc === "base64") return new InternalDecoderBase64(iconv.backend);
		return new InternalDecoderBytes(iconv.backend, this.enc);
	}
};
var InternalDecoder = class {
	constructor(options) {
		this.decoder = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: !!(options === null || options === void 0 ? void 0 : options.fatal)
		});
	}
	write(buf) {
		return this.decoder.decode(buf, { stream: true });
	}
	end() {
		return this.decoder.decode();
	}
};
var InternalDecoderBytes = class {
	constructor(backend, encoding) {
		this.backend = backend;
		this.enc = encoding;
	}
	decode(buf) {
		return this.backend.decodeBytes(buf, this.enc);
	}
	write(buf) {
		return this.decode(buf);
	}
	end() {
		return "";
	}
};
var _pending$1 = /* @__PURE__ */ new WeakMap();
var _pendingLength = /* @__PURE__ */ new WeakMap();
var InternalDecoderBase64 = class extends InternalDecoderBytes {
	constructor(backend) {
		super(backend, "base64");
		_classPrivateFieldInitSpec(this, _pending$1, /* @__PURE__ */ new Uint8Array(3));
		_classPrivateFieldInitSpec(this, _pendingLength, 0);
	}
	write(buf) {
		let result = "";
		if (_classPrivateFieldGet2(_pendingLength, this) > 0) {
			const length = Math.min(3 - _classPrivateFieldGet2(_pendingLength, this), buf.length);
			_classPrivateFieldGet2(_pending$1, this).set(buf.subarray(0, length), _classPrivateFieldGet2(_pendingLength, this));
			_classPrivateFieldSet2(_pendingLength, this, _classPrivateFieldGet2(_pendingLength, this) + length);
			if (_classPrivateFieldGet2(_pendingLength, this) < 3) return "";
			result = this.decode(_classPrivateFieldGet2(_pending$1, this));
			_classPrivateFieldSet2(_pendingLength, this, 0);
			buf = buf.subarray(length);
		}
		const completeLength = buf.length - buf.length % 3;
		if (completeLength > 0) result += this.decode(buf.subarray(0, completeLength));
		_classPrivateFieldGet2(_pending$1, this).set(buf.subarray(completeLength));
		_classPrivateFieldSet2(_pendingLength, this, buf.length - completeLength);
		return result;
	}
	end() {
		const result = this.decode(_classPrivateFieldGet2(_pending$1, this).subarray(0, _classPrivateFieldGet2(_pendingLength, this)));
		_classPrivateFieldSet2(_pendingLength, this, 0);
		return result;
	}
};
var InternalEncoder = class {
	constructor(backend, encoding) {
		this.backend = backend;
		this.enc = encoding;
	}
	write(str) {
		return this.backend.encodeString(str, this.enc);
	}
	end() {}
};
var InternalEncoderBase64 = class {
	constructor(backend) {
		this.backend = backend;
		this.prevStr = "";
	}
	write(str) {
		str = this.prevStr + str;
		const completeQuads = str.length - str.length % 4;
		this.prevStr = str.slice(completeQuads);
		str = str.slice(0, completeQuads);
		return this.backend.encodeString(str, "base64");
	}
	end() {
		return this.backend.encodeString(this.prevStr, "base64");
	}
};
var InternalEncoderCesu8 = class {
	constructor(backend) {
		this.backend = backend;
	}
	write(str) {
		const buf = new Uint8Array(str.length * 3);
		let bufIdx = 0;
		for (let i = 0; i < str.length; i++) {
			const charCode = str.charCodeAt(i);
			if (charCode < 128) buf[bufIdx++] = charCode;
			else if (charCode < 2048) {
				buf[bufIdx++] = 192 + (charCode >>> 6);
				buf[bufIdx++] = 128 + (charCode & 63);
			} else {
				buf[bufIdx++] = 224 + (charCode >>> 12);
				buf[bufIdx++] = 128 + (charCode >>> 6 & 63);
				buf[bufIdx++] = 128 + (charCode & 63);
			}
		}
		return this.backend.bytesToResult(buf, bufIdx);
	}
	end() {}
};
const CESU8_BOM = [
	239,
	187,
	191
];
var _defaultCharUnicode$3 = /* @__PURE__ */ new WeakMap();
var InternalDecoderCesu8 = class {
	get [BOM_BYTES]() {
		return CESU8_BOM;
	}
	constructor(defaultCharUnicode) {
		_classPrivateFieldInitSpec(this, _defaultCharUnicode$3, void 0);
		this.acc = 0;
		this.contBytes = 0;
		this.accBytes = 0;
		_classPrivateFieldSet2(_defaultCharUnicode$3, this, defaultCharUnicode);
	}
	write(buf) {
		let acc = this.acc;
		let contBytes = this.contBytes;
		let accBytes = this.accBytes;
		let res = "";
		for (let i = 0; i < buf.length; i++) {
			const curByte = buf[i];
			if ((curByte & 192) !== 128) {
				if (contBytes > 0) {
					res += _classPrivateFieldGet2(_defaultCharUnicode$3, this);
					contBytes = 0;
				}
				if (curByte < 128) res += String.fromCharCode(curByte);
				else if (curByte < 224) {
					acc = curByte & 31;
					contBytes = 1;
					accBytes = 1;
				} else if (curByte < 240) {
					acc = curByte & 15;
					contBytes = 2;
					accBytes = 1;
				} else res += _classPrivateFieldGet2(_defaultCharUnicode$3, this);
			} else if (contBytes > 0) {
				acc = acc << 6 | curByte & 63;
				contBytes--;
				accBytes++;
				if (contBytes === 0) {
					if (accBytes === 2 && acc < 128 && acc > 0) res += _classPrivateFieldGet2(_defaultCharUnicode$3, this);
					else if (accBytes === 3 && acc < 2048) res += _classPrivateFieldGet2(_defaultCharUnicode$3, this);
					else res += String.fromCharCode(acc);
				}
			} else res += _classPrivateFieldGet2(_defaultCharUnicode$3, this);
		}
		this.acc = acc;
		this.contBytes = contBytes;
		this.accBytes = accBytes;
		return res;
	}
	end() {
		if (this.contBytes > 0) {
			this.contBytes = 0;
			return _classPrivateFieldGet2(_defaultCharUnicode$3, this);
		}
	}
};
var InternalEncoderUtf8 = class {
	constructor(backend) {
		this.backend = backend;
		this.highSurrogate = "";
	}
	write(str) {
		if (this.highSurrogate) {
			str = this.highSurrogate + str;
			this.highSurrogate = "";
		}
		if (str.length > 0) {
			const charCode = str.charCodeAt(str.length - 1);
			if (charCode >= 55296 && charCode < 56320) {
				this.highSurrogate = str[str.length - 1];
				str = str.slice(0, str.length - 1);
			}
		}
		return this.backend.encodeString(str, "utf8");
	}
	end() {
		if (this.highSurrogate) {
			const str = this.highSurrogate;
			this.highSurrogate = "";
			return this.backend.encodeString(str, "utf8");
		}
	}
};
var internal_default = {
	utf8: {
		type: "_internal",
		bomAware: true
	},
	cesu8: {
		type: "_internal",
		bomAware: true
	},
	unicode11utf8: "utf8",
	binary: { type: "_internal" },
	base64: { type: "_internal" },
	hex: { type: "_internal" },
	_internal: InternalCodec
};
// node_modules/iconv-lite/dist/encodings/utf32.js
var utf32_exports = /* @__PURE__ */ __exportAll({
	ucs4: () => ucs4,
	ucs4be: () => ucs4be,
	ucs4le: () => ucs4le,
	utf32: () => utf32,
	utf32be: () => utf32be,
	utf32le: () => utf32le
});
function createEncoder(options, iconv, isLE) {
	const encoder = new Utf32Encoder(iconv.backend, isLE);
	return typeof (options === null || options === void 0 ? void 0 : options.invalidCharHandler) === "function" ? new TextEncoderWithHandler(encoder, iconv.backend, options.invalidCharHandler, isLE ? "utf32le" : "utf32be", isUnicodeScalar, "�") : encoder;
}
const REPLACEMENT = 65533;
const UTF32LE_BOM = [
	255,
	254,
	0,
	0
];
const UTF32BE_BOM = [
	0,
	0,
	254,
	255
];
const CHARS_CHUNK$1 = 8192;
const TEXT_DECODER_MIN_UNITS$1 = 64;
const utf16leDecoder$1 = new TextDecoder("utf-16le", { ignoreBOM: true });
var Utf32LECodec = class {
	createEncoder(options, iconv) {
		return createEncoder(options, iconv, true);
	}
	createDecoder(options, iconv) {
		return new Utf32Decoder(true, options);
	}
	get bomAware() {
		return true;
	}
};
var Utf32BECodec = class {
	createEncoder(options, iconv) {
		return createEncoder(options, iconv, false);
	}
	createDecoder(options, iconv) {
		return new Utf32Decoder(false, options);
	}
	get bomAware() {
		return true;
	}
};
var Utf32Encoder = class {
	constructor(backend, isLE) {
		this.backend = backend;
		this.isLE = isLE;
		this.highSurrogate = 0;
	}
	write(str) {
		const length = str.length;
		const out = new Uint8Array(length * 4 + 4);
		const codepoints = new Uint32Array(out.buffer);
		let pos = 0;
		for (let index = 0; index < length; index++) {
			const code = str.charCodeAt(index);
			if (this.highSurrogate !== 0) {
				if (code >= 56320 && code <= 57343) {
					codepoints[pos++] = (this.highSurrogate - 55296 << 10 | code - 56320) + 65536;
					this.highSurrogate = 0;
					continue;
				}
				codepoints[pos++] = REPLACEMENT;
				this.highSurrogate = 0;
			}
			if (code >= 55296 && code <= 56319) this.highSurrogate = code;
			else if (code >= 56320 && code <= 57343) codepoints[pos++] = REPLACEMENT;
			else codepoints[pos++] = code;
		}
		const byteLength = pos * 4;
		if (!this.isLE) swap32(out, byteLength);
		return this.backend.bytesToResult(out, byteLength);
	}
	end() {
		if (this.highSurrogate === 0) return;
		const out = /* @__PURE__ */ new Uint8Array(4);
		new Uint32Array(out.buffer)[0] = REPLACEMENT;
		if (!this.isLE) swap32(out, 4);
		this.highSurrogate = 0;
		return this.backend.bytesToResult(out, 4);
	}
};
var _defaultCharUnicode$2 = /* @__PURE__ */ new WeakMap();
var Utf32Decoder = class {
	get [BOM_BYTES]() {
		return this.isLE ? UTF32LE_BOM : UTF32BE_BOM;
	}
	constructor(isLE, options) {
		_classPrivateFieldInitSpec(this, _defaultCharUnicode$2, void 0);
		this.isLE = isLE;
		_classPrivateFieldSet2(_defaultCharUnicode$2, this, getDefaultCharUnicode(options));
		this.fatal = !!(options === null || options === void 0 ? void 0 : options.fatal);
		this.overflow = [];
		this.units = /* @__PURE__ */ new Uint16Array(0);
	}
	write(src) {
		if (src.length === 0) return "";
		const isLE = this.isLE;
		const overflow = this.overflow;
		const errors = _classPrivateFieldGet2(_defaultCharUnicode$2, this) === "�" ? void 0 : [];
		const fatal = this.fatal;
		const maxUnits = ((overflow.length + src.length >> 2) + 1) * 2;
		if (this.units.length < maxUnits) this.units = new Uint16Array(maxUnits);
		const units = this.units;
		let pos = 0;
		let i = 0;
		if (overflow.length > 0) {
			for (; i < src.length && overflow.length < 4; i++) overflow.push(src[i]);
			if (overflow.length === 4) {
				pos = pushCodepoint(units, pos, readCodepoint(overflow, 0, isLE), fatal, errors);
				overflow.length = 0;
			}
		}
		const count = src.length - i >> 2;
		if (isLE && count > 0 && (src.byteOffset + i) % 4 === 0) {
			const codepoints = new Uint32Array(src.buffer, src.byteOffset + i, count);
			for (let k = 0; k < count; k++) pos = pushCodepoint(units, pos, codepoints[k], fatal, errors);
			i += count * 4;
		} else for (; i < src.length - 3; i += 4) pos = pushCodepoint(units, pos, readCodepoint(src, i, isLE), fatal, errors);
		for (; i < src.length; i++) overflow.push(src[i]);
		return replaceDecodeErrors(stringFromUnits(units, pos), errors, _classPrivateFieldGet2(_defaultCharUnicode$2, this));
	}
	end() {
		if (this.overflow.length === 0) return;
		this.overflow.length = 0;
		if (this.fatal) throw new TypeError("Truncated UTF-32 code unit at end of input");
		return _classPrivateFieldGet2(_defaultCharUnicode$2, this);
	}
};
function swap32(out, byteLength) {
	for (let pos = 0; pos < byteLength; pos += 4) {
		const b0 = out[pos];
		const b1 = out[pos + 1];
		out[pos] = out[pos + 3];
		out[pos + 1] = out[pos + 2];
		out[pos + 2] = b1;
		out[pos + 3] = b0;
	}
}
function readCodepoint(src, pos, isLE) {
	if (isLE) return (src[pos] | src[pos + 1] << 8 | src[pos + 2] << 16) + src[pos + 3] * 16777216;
	return (src[pos + 3] | src[pos + 2] << 8 | src[pos + 1] << 16) + src[pos] * 16777216;
}
function pushCodepoint(units, pos, codepoint, fatal, errors) {
	if (codepoint < 55296) {
		units[pos++] = codepoint;
		return pos;
	}
	if (codepoint > 1114111 || codepoint <= 57343) {
		if (fatal) throw new TypeError("Invalid UTF-32 code unit: 0x" + codepoint.toString(16));
		errors === null || errors === void 0 || errors.push(pos);
		units[pos++] = REPLACEMENT;
		return pos;
	}
	if (codepoint > 65535) {
		const offset = codepoint - 65536;
		units[pos++] = 55296 | offset >> 10;
		units[pos++] = 56320 | offset & 1023;
	} else units[pos++] = codepoint;
	return pos;
}
function stringFromUnits(units, length) {
	if (length >= TEXT_DECODER_MIN_UNITS$1) return utf16leDecoder$1.decode(new Uint8Array(units.buffer, units.byteOffset, length * 2));
	let result = "";
	for (let offset = 0; offset < length; offset += CHARS_CHUNK$1) result += String.fromCharCode.apply(null, units.subarray(offset, Math.min(offset + CHARS_CHUNK$1, length)));
	return result;
}
var Utf32Codec = class {
	createEncoder(options, iconv) {
		const { addBOM = true, defaultEncoding } = options || {};
		return iconv.getEncoder(defaultEncoding || "utf-32le", {
			...options,
			addBOM,
			defaultEncoding
		});
	}
	createDecoder(options, iconv) {
		return new Utf32AutoDecoder(options, iconv);
	}
};
var Utf32AutoDecoder = class {
	constructor(options, iconv) {
		this.decoder = null;
		this.initialBufs = [];
		this.initialBufsLen = 0;
		this.options = {
			...options,
			defaultCharUnicode: getDefaultCharUnicode(options)
		};
		this.iconv = iconv;
	}
	write(buf) {
		if (!this.decoder) {
			if (buf.length === 0) return "";
			this.initialBufsLen += buf.length;
			this.initialBufs.push(this.initialBufsLen < 32 ? new Uint8Array(buf) : buf);
			if (this.initialBufsLen < 32) return "";
			return this._chooseDecoder();
		}
		return this.decoder.write(buf);
	}
	end() {
		if (this.decoder) return this.decoder.end();
		const res = this._chooseDecoder();
		const trail = this.decoder.end();
		return trail ? res + trail : res;
	}
	_chooseDecoder() {
		const encoding = detectEncoding$1(this.initialBufs, this.options.defaultEncoding);
		this.decoder = this.iconv.getDecoder(encoding, this.options);
		const res = this.initialBufs.reduce((acc, buf) => acc + this.decoder.write(buf), "");
		this.initialBufs.length = this.initialBufsLen = 0;
		return res;
	}
};
function detectEncoding$1(bufs, defaultEncoding) {
	const b = [];
	let charsProcessed = 0;
	let invalidLE = 0;
	let invalidBE = 0;
	let bmpCharsLE = 0;
	let bmpCharsBE = 0;
	for (let i = 0; i < bufs.length && charsProcessed < 100; i++) {
		const buf = bufs[i];
		for (let j = 0; j < buf.length && charsProcessed < 100; j++) {
			b.push(buf[j]);
			if (b.length === 4) {
				if (charsProcessed === 0) {
					if (b[0] === 255 && b[1] === 254 && b[2] === 0 && b[3] === 0) return "utf-32le";
					if (b[0] === 0 && b[1] === 0 && b[2] === 254 && b[3] === 255) return "utf-32be";
				}
				if (b[0] !== 0 || b[1] > 16) invalidBE++;
				if (b[3] !== 0 || b[2] > 16) invalidLE++;
				if (b[0] === 0 && b[1] === 0 && (b[2] !== 0 || b[3] !== 0)) bmpCharsBE++;
				if ((b[0] !== 0 || b[1] !== 0) && b[2] === 0 && b[3] === 0) bmpCharsLE++;
				b.length = 0;
				charsProcessed++;
			}
		}
	}
	if (bmpCharsBE - invalidBE > bmpCharsLE - invalidLE) return "utf-32be";
	if (bmpCharsBE - invalidBE < bmpCharsLE - invalidLE) return "utf-32le";
	return defaultEncoding || "utf-32le";
}
const utf32le = Utf32LECodec;
const utf32be = Utf32BECodec;
const ucs4le = "utf32le";
const ucs4be = "utf32be";
const utf32 = Utf32Codec;
const ucs4 = "utf32";
// node_modules/iconv-lite/dist/encodings/utf16.js
var utf16_exports = /* @__PURE__ */ __exportAll({
	csunicode: () => csunicode,
	iso10646ucs2: () => iso10646ucs2,
	ucs2: () => ucs2,
	unicode: () => unicode,
	unicodefeff: () => unicodefeff,
	unicodefffe: () => unicodefffe,
	utf16: () => utf16,
	utf16be: () => utf16be,
	utf16le: () => utf16le
});
var Utf16LECodec = class {
	createEncoder(options, iconv) {
		return new Utf16LEEncoder(iconv.backend);
	}
	createDecoder(options, iconv) {
		return new Utf16EndianDecoder("utf-16le", options);
	}
	get bomAware() {
		return true;
	}
};
var Utf16BECodec = class {
	createEncoder(options, iconv) {
		return new Utf16BEEncoder(iconv.backend);
	}
	createDecoder(options, iconv) {
		return new Utf16EndianDecoder("utf-16be", options);
	}
	get bomAware() {
		return true;
	}
};
var Utf16LEEncoder = class {
	constructor(backend) {
		this.backend = backend;
	}
	write(str) {
		const bytes = new Uint8Array(str.length * 2);
		const chars = new Uint16Array(bytes.buffer, 0, str.length);
		for (let i = 0; i < str.length; i++) chars[i] = str.charCodeAt(i);
		return this.backend.bytesToResult(bytes, bytes.length);
	}
	end() {}
};
var Utf16BEEncoder = class {
	constructor(backend) {
		this.backend = backend;
	}
	write(str) {
		const bytes = new Uint8Array(str.length * 2);
		let pos = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			bytes[pos++] = char >> 8;
			bytes[pos++] = char & 255;
		}
		return this.backend.bytesToResult(bytes, pos);
	}
	end() {}
};
var Utf16EndianDecoder = class {
	constructor(label, options) {
		this.decoder = new TextDecoder(label, {
			ignoreBOM: true,
			fatal: !!(options && options.fatal)
		});
	}
	write(buf) {
		return this.decoder.decode(buf, { stream: true });
	}
	end() {
		const res = this.decoder.decode();
		return res.length > 0 ? res : void 0;
	}
};
var Utf16Codec = class {
	createEncoder(options, iconv) {
		const { addBOM = true } = options || {};
		return iconv.getEncoder("utf-16le", {
			...options,
			addBOM
		});
	}
	createDecoder(options, iconv) {
		return new Utf16Decoder(options, iconv);
	}
};
var Utf16Decoder = class {
	constructor(options, iconv) {
		this.decoder = null;
		this.initialBufs = [];
		this.initialBufsLen = 0;
		this.options = options || {};
		this.iconv = iconv;
	}
	write(buf) {
		if (!this.decoder) {
			if (buf.length === 0) return "";
			this.initialBufsLen += buf.length;
			this.initialBufs.push(this.initialBufsLen < 16 ? new Uint8Array(buf) : buf);
			if (this.initialBufsLen < 16) return "";
			return this._detectEndiannessAndSetDecoder();
		}
		return this.decoder.write(buf);
	}
	end() {
		if (!this.decoder) return this._detectEndiannessAndSetDecoder() + (this.decoder.end() || "");
		return this.decoder.end();
	}
	_detectEndiannessAndSetDecoder() {
		const encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
		this.decoder = this.iconv.getDecoder(encoding, this.options);
		const resStr = this.initialBufs.reduce((a, b) => a + this.decoder.write(b), "");
		this.initialBufs.length = this.initialBufsLen = 0;
		return resStr;
	}
};
function detectEncoding(bufs, defaultEncoding) {
	const b = [];
	let charsProcessed = 0;
	let asciiCharsLE = 0;
	let asciiCharsBE = 0;
	for (let i = 0; i < bufs.length && charsProcessed < 100; i++) {
		const buf = bufs[i];
		for (let j = 0; j < buf.length && charsProcessed < 100; j++) {
			b.push(buf[j]);
			if (b.length === 2) {
				if (charsProcessed === 0) {
					if (b[0] === 255 && b[1] === 254) return "utf-16le";
					if (b[0] === 254 && b[1] === 255) return "utf-16be";
				}
				if (b[0] === 0 && b[1] !== 0) asciiCharsBE++;
				if (b[0] !== 0 && b[1] === 0) asciiCharsLE++;
				b.length = 0;
				charsProcessed++;
			}
		}
	}
	if (asciiCharsBE > asciiCharsLE) return "utf-16be";
	if (asciiCharsBE < asciiCharsLE) return "utf-16le";
	return defaultEncoding || "utf-16le";
}
const utf16le = Utf16LECodec;
const ucs2 = "utf16le";
const unicode = "utf16le";
const csunicode = "utf16le";
const iso10646ucs2 = "utf16le";
const unicodefeff = "utf16le";
const utf16be = Utf16BECodec;
const unicodefffe = "utf16be";
const utf16 = Utf16Codec;
// node_modules/iconv-lite/dist/encodings/utf7.js
var utf7_exports = /* @__PURE__ */ __exportAll({
	unicode11utf7: () => unicode11utf7,
	utf7: () => utf7,
	utf7imap: () => utf7imap
});
const PLUS = 43;
const MINUS = 45;
const AMP = 38;
const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const BASE64_IMAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+,";
function buildBytes(alphabet) {
	const bytes = /* @__PURE__ */ new Uint8Array(64);
	for (let value = 0; value < 64; value++) bytes[value] = alphabet.charCodeAt(value);
	return bytes;
}
function buildInv(alphabet) {
	const inv = (/* @__PURE__ */ new Int8Array(256)).fill(-1);
	for (let value = 0; value < alphabet.length; value++) inv[alphabet.charCodeAt(value)] = value;
	return inv;
}
const BASE64_BYTES = buildBytes(BASE64);
const BASE64_IMAP_BYTES = buildBytes(BASE64_IMAP);
const INV = buildInv(BASE64);
const INV_IMAP = buildInv(BASE64_IMAP);
INV_IMAP["/".charCodeAt(0)] = 63;
const UTF7_DIRECT = /* @__PURE__ */ new Uint8Array(128);
const UTF7_DIRECT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'(),-./:?!\"#$%&*;<=>@[]^_`{|} 	\n\r";
for (let index = 0; index < 95; index++) UTF7_DIRECT[UTF7_DIRECT_CHARS.charCodeAt(index)] = 1;
function utf7IsDirect(code) {
	return code < 128 && UTF7_DIRECT[code] === 1;
}
const UTF7_NONDIRECT = new RegExp("[^" + UTF7_DIRECT_CHARS.replace(/[\]\\^-]/g, "\\$&") + "]", "g");
const latin1Decoder = new TextDecoder("latin1");
const utf16leDecoder = new TextDecoder("utf-16le", { ignoreBOM: true });
const TEXT_DECODER_MIN_UNITS = 64;
const utf16beDecoder = new TextDecoder("utf-16be", { ignoreBOM: true });
const HAS_FROM_BASE64 = typeof Uint8Array.fromBase64 === "function";
const FROM_BASE64_MIN_UNITS = 128;
const SMALL_RUN_MAX_UNITS = 40;
const NON_ASCII = /[\u0080-\uffff]/g;
const CHARS_CHUNK = 8192;
function charsFromUnits(units, length) {
	let result = "";
	for (let offset = 0; offset < length; offset += CHARS_CHUNK) result += String.fromCharCode.apply(null, units.subarray(offset, Math.min(offset + CHARS_CHUNK, length)));
	return result;
}
const asciiEncoder = new TextEncoder();
const DIRECT_BULK_MIN = 16;
const HAS_TO_BASE64 = typeof Uint8Array.prototype.toBase64 === "function";
const TO_BASE64_MIN_UNITS = 64;
let base64Scratch = /* @__PURE__ */ new Uint8Array(0);
function flushBase64Tail(out, pos, bits, nbits, bytes) {
	if (nbits > 0) out[pos++] = bytes[bits << 6 - nbits & 63];
	return pos;
}
function copyDirectRun(str, from, to, out, pos) {
	if (to - from >= DIRECT_BULK_MIN) {
		const source = from === 0 && to === str.length ? str : str.slice(from, to);
		return pos + asciiEncoder.encodeInto(source, out.subarray(pos)).written;
	}
	for (let index = from; index < to; index++) out[pos++] = str.charCodeAt(index);
	return pos;
}
function encodeBase64Run(str, from, to, out, pos, bytes) {
	if (HAS_TO_BASE64 && to - from >= TO_BASE64_MIN_UNITS) {
		const byteCount = (to - from) * 2;
		if (base64Scratch.length < byteCount) base64Scratch = new Uint8Array(byteCount);
		let bytePos = 0;
		for (let index = from; index < to; index++) {
			const code = str.charCodeAt(index);
			base64Scratch[bytePos++] = code >> 8;
			base64Scratch[bytePos++] = code & 255;
		}
		out[pos++] = PLUS;
		const view = byteCount === base64Scratch.length ? base64Scratch : base64Scratch.subarray(0, byteCount);
		pos += asciiEncoder.encodeInto(view.toBase64({ omitPadding: true }), out.subarray(pos)).written;
		out[pos++] = MINUS;
		return pos;
	}
	out[pos++] = PLUS;
	let bits = 0;
	let nbits = 0;
	for (let index = from; index < to; index++) {
		bits = bits << 16 | str.charCodeAt(index);
		nbits += 16;
		while (nbits >= 6) {
			nbits -= 6;
			out[pos++] = bytes[bits >> nbits & 63];
			bits &= (1 << nbits) - 1;
		}
	}
	pos = flushBase64Tail(out, pos, bits, nbits, bytes);
	out[pos++] = MINUS;
	return pos;
}
var Utf7Codec = class {
	createEncoder(options, iconv) {
		return new Utf7Encoder(iconv.backend);
	}
	createDecoder(options, iconv) {
		return new Utf7Decoder(PLUS, "+", INV, false);
	}
	get bomAware() {
		return true;
	}
};
var Utf7IMAPCodec = class {
	createEncoder(options, iconv) {
		return new Utf7IMAPEncoder(iconv.backend);
	}
	createDecoder(options, iconv) {
		return new Utf7Decoder(AMP, "&", INV_IMAP, true);
	}
	get bomAware() {
		return true;
	}
};
var Utf7Encoder = class {
	constructor(backend) {
		this.backend = backend;
	}
	write(str) {
		const length = str.length;
		const out = new Uint8Array(length * 5 + 10);
		let pos = 0;
		let cursor = 0;
		while (cursor < length) {
			const directStart = cursor;
			UTF7_NONDIRECT.lastIndex = cursor;
			const match = UTF7_NONDIRECT.exec(str);
			cursor = match ? match.index : length;
			pos = copyDirectRun(str, directStart, cursor, out, pos);
			if (cursor >= length) break;
			if (str.charCodeAt(cursor) === PLUS && (cursor + 1 >= length || utf7IsDirect(str.charCodeAt(cursor + 1)))) {
				out[pos++] = PLUS;
				out[pos++] = MINUS;
				cursor++;
				continue;
			}
			let runEnd = cursor + 1;
			while (runEnd < length && !utf7IsDirect(str.charCodeAt(runEnd))) runEnd++;
			pos = encodeBase64Run(str, cursor, runEnd, out, pos, BASE64_BYTES);
			cursor = runEnd;
		}
		return this.backend.bytesToResult(out, pos);
	}
	end() {}
};
var Utf7IMAPEncoder = class {
	constructor(backend) {
		this.backend = backend;
		this.inBase64 = false;
		this.bits = 0;
		this.nbits = 0;
	}
	_closeBase64(out, pos) {
		pos = flushBase64Tail(out, pos, this.bits, this.nbits, BASE64_IMAP_BYTES);
		out[pos++] = MINUS;
		this.inBase64 = false;
		this.bits = 0;
		this.nbits = 0;
		return pos;
	}
	write(str) {
		const out = new Uint8Array(str.length * 5 + 10);
		let pos = 0;
		for (let cursor = 0; cursor < str.length; cursor++) {
			const code = str.charCodeAt(cursor);
			if (code >= 32 && code <= 126) {
				if (this.inBase64) pos = this._closeBase64(out, pos);
				out[pos++] = code;
				if (code === AMP) out[pos++] = MINUS;
			} else {
				if (!this.inBase64) {
					out[pos++] = AMP;
					this.inBase64 = true;
				}
				this.bits = this.bits << 16 | code;
				this.nbits += 16;
				while (this.nbits >= 6) {
					this.nbits -= 6;
					out[pos++] = BASE64_IMAP_BYTES[this.bits >> this.nbits & 63];
					this.bits &= (1 << this.nbits) - 1;
				}
			}
		}
		return this.backend.bytesToResult(out, pos);
	}
	end() {
		const out = /* @__PURE__ */ new Uint8Array(2);
		const pos = this.inBase64 ? this._closeBase64(out, 0) : 0;
		return this.backend.bytesToResult(out, pos);
	}
};
var Utf7Decoder = class {
	constructor(shiftIn, literal, inv, imap) {
		this.shiftIn = shiftIn;
		this.literal = literal;
		this.inv = inv;
		this.imap = imap;
		this.inBase64 = false;
		this.pending = "";
		this.sawBase64 = false;
		this.units = /* @__PURE__ */ new Uint16Array(0);
	}
	_decodeBase64(base64) {
		const length = base64.length;
		if (length * 3 >> 3 < SMALL_RUN_MAX_UNITS) {
			if ((length & 3) === 1) return "";
			const inv = this.inv;
			let bits = 0;
			let nbits = 0;
			let result = "";
			for (let pos = 0; pos < length; pos++) {
				bits = bits << 6 | inv[base64.charCodeAt(pos)];
				nbits += 6;
				if (nbits >= 16) {
					nbits -= 16;
					result += String.fromCharCode(bits >> nbits & 65535);
					bits &= (1 << nbits) - 1;
				}
			}
			return result;
		}
		const std = this.imap ? base64.replace(/,/g, "/") : base64;
		if (HAS_FROM_BASE64 && std.length * 3 >> 3 >= FROM_BASE64_MIN_UNITS) {
			let bytes;
			try {
				bytes = Uint8Array.fromBase64(std, { lastChunkHandling: "loose" });
			} catch (_unused) {
				return "";
			}
			const unitCount = bytes.length >> 1;
			let hasSurrogate = false;
			for (let bytePos = 0; bytePos < unitCount * 2; bytePos += 2) if (bytes[bytePos] >= 216 && bytes[bytePos] <= 223) {
				hasSurrogate = true;
				break;
			}
			if (!hasSurrogate) return utf16beDecoder.decode(bytes.subarray(0, unitCount * 2));
			if (this.units.length < unitCount) this.units = new Uint16Array(unitCount);
			const units = this.units;
			for (let unitPos = 0, bytePos = 0; unitPos < unitCount; unitPos++, bytePos += 2) units[unitPos] = bytes[bytePos] << 8 | bytes[bytePos + 1];
			return charsFromUnits(units, unitCount);
		}
		let bytes;
		try {
			bytes = atob(std);
		} catch (_unused2) {
			return "";
		}
		const unitCount = bytes.length >> 1;
		if (this.units.length < unitCount) this.units = new Uint16Array(unitCount);
		const units = this.units;
		let hasSurrogate = false;
		for (let unitPos = 0, bytePos = 0; unitPos < unitCount; unitPos++, bytePos += 2) {
			const unit = bytes.charCodeAt(bytePos) << 8 | bytes.charCodeAt(bytePos + 1);
			if (unit >= 55296 && unit <= 57343) hasSurrogate = true;
			units[unitPos] = unit;
		}
		if (!hasSurrogate && unitCount >= TEXT_DECODER_MIN_UNITS) return utf16leDecoder.decode(new Uint8Array(units.buffer, units.byteOffset, unitCount * 2));
		return charsFromUnits(units, unitCount);
	}
	_decodeRun(base64) {
		const length = base64.length;
		if (length === 0) return "";
		const leftover = 6 * length % 16;
		let bad = leftover > 4;
		if (!bad && leftover > 0 && (this.inv[base64.charCodeAt(length - 1)] & (1 << leftover) - 1) !== 0) bad = true;
		const decoded = this._decodeBase64(base64);
		return bad ? decoded + "�" : decoded;
	}
	write(buf) {
		const chars = latin1Decoder.decode(buf);
		const length = chars.length;
		let result = "";
		let cursor = 0;
		let hasNonAscii = -1;
		while (cursor < length) if (!this.inBase64) {
			const shift = buf.indexOf(this.shiftIn, cursor);
			const directEnd = shift === -1 ? length : shift;
			if (directEnd > cursor) {
				if (hasNonAscii === -1) hasNonAscii = chars.search(NON_ASCII) !== -1 ? 1 : 0;
				const segment = chars.slice(cursor, directEnd);
				result += hasNonAscii === 0 ? segment : segment.replace(NON_ASCII, "�");
			}
			if (shift === -1) break;
			this.inBase64 = true;
			this.sawBase64 = false;
			cursor = shift + 1;
		} else {
			let runEnd = cursor;
			while (runEnd < length && this.inv[buf[runEnd]] !== -1) runEnd++;
			if (runEnd > cursor) this.sawBase64 = true;
			if (runEnd === length) {
				const accumulated = this.pending + chars.slice(cursor);
				const aligned = accumulated.length - accumulated.length % 8;
				result += this._decodeBase64(accumulated.slice(0, aligned));
				this.pending = accumulated.slice(aligned);
				return result;
			}
			const runChars = this.pending + chars.slice(cursor, runEnd);
			this.pending = "";
			const terminator = buf[runEnd];
			if (!this.sawBase64) result += terminator === MINUS ? this.literal : "�";
			else result += this._decodeRun(runChars);
			cursor = terminator === MINUS ? runEnd + 1 : runEnd;
			this.inBase64 = false;
			this.sawBase64 = false;
		}
		return result;
	}
	end() {
		const result = this.inBase64 ? this._decodeRun(this.pending) : "";
		this.inBase64 = false;
		this.pending = "";
		this.sawBase64 = false;
		return result.length > 0 ? result : void 0;
	}
};
const utf7 = Utf7Codec;
const unicode11utf7 = "utf7";
const utf7imap = Utf7IMAPCodec;
// node_modules/iconv-lite/dist/encodings/iso2022jp.js
var iso2022jp_exports = /* @__PURE__ */ __exportAll({
	csiso2022jp: () => csiso2022jp,
	iso2022jp: () => iso2022jp
});
const ESC = 27;
const ASCII = 0;
const ROMAN = 1;
const KATAKANA = 2;
const LEAD = 3;
const TRAIL = 4;
const ESCAPE_START = 5;
const ESCAPE = 6;
const JIS0208_SIZE = 8836;
const DBCS_NODE_START = -1e3;
const KATAKANA_INDEX = "。「」、・ヲァィゥェォャュョッーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜";
function remapCodePoint(code) {
	if (code === 8722) return 65293;
	return code >= 65377 && code <= 65439 ? KATAKANA_INDEX.charCodeAt(code - 65377) : code;
}
var Iso2022JpCodec = class {
	constructor(codecOptions, iconv) {
		this.decodeTable = new Uint16Array(JIS0208_SIZE);
		this.encodeTable = /* @__PURE__ */ new Uint16Array(65536);
		const eucjp = iconv.getCodec("eucjp");
		const root = eucjp.decodeTables[0];
		for (let row = 0; row < 94; row++) {
			const ref = root[161 + row];
			if (ref > DBCS_NODE_START) continue;
			const node = eucjp.decodeTables[DBCS_NODE_START - ref];
			for (let cell = 0; cell < 94; cell++) {
				const codePoint = node[161 + cell];
				if (codePoint <= 0 || codePoint > 65535) continue;
				const pointer = row * 94 + cell;
				this.decodeTable[pointer] = codePoint;
				if (this.encodeTable[codePoint] === 0) this.encodeTable[codePoint] = pointer + 1;
			}
		}
	}
	createEncoder(options, iconv) {
		const encoder = new Iso2022JpEncoder(this, iconv.backend, options);
		return (options === null || options === void 0 ? void 0 : options.invalidCharHandler) ? new TextEncoderWithHandler(encoder, iconv.backend, options.invalidCharHandler, "iso-2022-jp", (char) => {
			const code = remapCodePoint(char.codePointAt(0));
			return code < 128 && code !== 14 && code !== 15 && code !== ESC || code === 165 || code === 8254 || code <= 65535 && this.encodeTable[code] !== 0;
		}, "�") : encoder;
	}
	createDecoder(options, iconv) {
		return new Iso2022JpDecoder(this, iconv.backend, options);
	}
	get bomAware() {
		return false;
	}
};
var _defaultByte = /* @__PURE__ */ new WeakMap();
var Iso2022JpEncoder = class {
	constructor(codec, backend, options) {
		_classPrivateFieldInitSpec(this, _defaultByte, void 0);
		this.encodeTable = codec.encodeTable;
		this.backend = backend;
		const defaultByte = getDefaultCharByte(options);
		if (defaultByte >= 128 || defaultByte === 14 || defaultByte === 15 || defaultByte === ESC) throw new TypeError("ISO-2022-JP defaultCharByte must be an ASCII byte other than ESC, SO or SI");
		_classPrivateFieldSet2(_defaultByte, this, defaultByte);
		this.state = ASCII;
		this.leadSurrogate = -1;
	}
	_shift(out, pos, state) {
		out[pos++] = ESC;
		if (state === LEAD) {
			out[pos++] = 36;
			out[pos++] = 66;
		} else {
			out[pos++] = 40;
			out[pos++] = state === ROMAN ? 74 : 66;
		}
		this.state = state;
		return pos;
	}
	_unmappable(out, pos) {
		return this._encodeChar(_classPrivateFieldGet2(_defaultByte, this), out, pos);
	}
	_encodeChar(code, out, pos) {
		if (code < 128) {
			if (code === 14 || code === 15 || code === ESC) return this._unmappable(out, pos);
			if (this.state !== ASCII && !(this.state === ROMAN && code !== 92 && code !== 126)) pos = this._shift(out, pos, ASCII);
			out[pos++] = code;
			return pos;
		}
		if (code === 165 || code === 8254) {
			if (this.state !== ROMAN) pos = this._shift(out, pos, ROMAN);
			out[pos++] = code === 165 ? 92 : 126;
			return pos;
		}
		code = remapCodePoint(code);
		const pointer = this.encodeTable[code] - 1;
		if (pointer < 0) return this._unmappable(out, pos);
		if (this.state !== LEAD) pos = this._shift(out, pos, LEAD);
		out[pos++] = 33 + (pointer / 94 | 0);
		out[pos++] = 33 + pointer % 94;
		return pos;
	}
	write(str) {
		const out = new Uint8Array(str.length * 5 + 4);
		let pos = 0;
		for (let index = 0; index < str.length; index++) {
			const code = str.charCodeAt(index);
			if (this.leadSurrogate !== -1) {
				this.leadSurrogate = -1;
				pos = this._unmappable(out, pos);
				if (code >= 56320 && code <= 57343) continue;
			}
			if (code >= 55296 && code <= 56319) {
				this.leadSurrogate = code;
				continue;
			}
			pos = this._encodeChar(code, out, pos);
		}
		return this.backend.bytesToResult(out, pos);
	}
	end() {
		const out = /* @__PURE__ */ new Uint8Array(4);
		let pos = 0;
		if (this.leadSurrogate !== -1) {
			this.leadSurrogate = -1;
			pos = this._unmappable(out, pos);
		}
		if (this.state !== ASCII) pos = this._shift(out, pos, ASCII);
		return pos > 0 ? this.backend.bytesToResult(out, pos) : void 0;
	}
};
var _replacement = /* @__PURE__ */ new WeakMap();
var _fatal$1 = /* @__PURE__ */ new WeakMap();
var _errors = /* @__PURE__ */ new WeakMap();
var Iso2022JpDecoder = class {
	constructor(codec, backend, options) {
		_classPrivateFieldInitSpec(this, _replacement, void 0);
		_classPrivateFieldInitSpec(this, _fatal$1, void 0);
		_classPrivateFieldInitSpec(this, _errors, void 0);
		this.decodeTable = codec.decodeTable;
		this.backend = backend;
		_classPrivateFieldSet2(_replacement, this, getDefaultCharUnicode(options));
		_classPrivateFieldSet2(_fatal$1, this, !!(options === null || options === void 0 ? void 0 : options.fatal));
		this._reset();
	}
	_error(out, pos) {
		var _classPrivateFieldGet2$3;
		if (_classPrivateFieldGet2(_fatal$1, this)) {
			this.reprocess = false;
			throw new TypeError("Invalid ISO-2022-JP sequence");
		}
		(_classPrivateFieldGet2$3 = _classPrivateFieldGet2(_errors, this)) === null || _classPrivateFieldGet2$3 === void 0 || _classPrivateFieldGet2$3.push(pos);
		out[pos] = 65533;
		return pos + 1;
	}
	_reset() {
		this.state = ASCII;
		this.outputState = ASCII;
		this.lead = 0;
		this.output = false;
		this.reprocess = false;
	}
	_decodeByte(byte, out, pos) {
		switch (this.state) {
			case ASCII:
			case ROMAN:
				if (byte === ESC) {
					this.state = ESCAPE_START;
					return pos;
				}
				this.output = false;
				if (byte >= 128 || byte === 14 || byte === 15) pos = this._error(out, pos);
				else if (this.state === ROMAN && byte === 92) out[pos++] = 165;
				else if (this.state === ROMAN && byte === 126) out[pos++] = 8254;
				else out[pos++] = byte;
				return pos;
			case KATAKANA:
				if (byte === ESC) {
					this.state = ESCAPE_START;
					return pos;
				}
				this.output = false;
				if (byte >= 33 && byte <= 95) out[pos++] = 65344 + byte;
				else pos = this._error(out, pos);
				return pos;
			case LEAD:
				if (byte === ESC) {
					this.state = ESCAPE_START;
					return pos;
				}
				this.output = false;
				if (byte >= 33 && byte <= 126) {
					this.lead = byte;
					this.state = TRAIL;
				} else pos = this._error(out, pos);
				return pos;
			case TRAIL:
				if (byte === ESC) {
					this.state = ESCAPE_START;
					pos = this._error(out, pos);
					return pos;
				}
				this.state = LEAD;
				if (byte >= 33 && byte <= 126) {
					const codePoint = this.decodeTable[(this.lead - 33) * 94 + byte - 33];
					if (codePoint !== 0) out[pos++] = codePoint;
					else pos = this._error(out, pos);
				} else pos = this._error(out, pos);
				return pos;
			case ESCAPE_START:
				if (byte === 36 || byte === 40) {
					this.lead = byte;
					this.state = ESCAPE;
					return pos;
				}
				this.reprocess = true;
				this.output = false;
				this.state = this.outputState;
				pos = this._error(out, pos);
				return pos;
			default: {
				const lead = this.lead;
				this.lead = 0;
				let state = -1;
				if (lead === 40 && byte === 66) state = ASCII;
				else if (lead === 40 && byte === 74) state = ROMAN;
				else if (lead === 40 && byte === 73) state = KATAKANA;
				else if (lead === 36 && (byte === 64 || byte === 66)) state = LEAD;
				if (state !== -1) {
					this.state = this.outputState = state;
					const output = this.output;
					this.output = true;
					if (output) pos = this._error(out, pos);
					return pos;
				}
				this.output = false;
				this.state = this.outputState;
				pos = this._error(out, pos);
				pos = this._decodeByte(lead, out, pos);
				this.reprocess = true;
				return pos;
			}
		}
	}
	write(buf) {
		_classPrivateFieldSet2(_errors, this, _classPrivateFieldGet2(_replacement, this) === "�" ? void 0 : []);
		const out = new Uint16Array(buf.length + 2);
		let pos = 0;
		for (let index = 0; index < buf.length; index++) {
			pos = this._decodeByte(buf[index], out, pos);
			if (this.reprocess) {
				this.reprocess = false;
				index--;
			}
		}
		return replaceDecodeErrors(this.backend.rawCharsToResult(out, pos), _classPrivateFieldGet2(_errors, this), _classPrivateFieldGet2(_replacement, this));
	}
	end() {
		_classPrivateFieldSet2(_errors, this, _classPrivateFieldGet2(_replacement, this) === "�" ? void 0 : []);
		const out = /* @__PURE__ */ new Uint16Array(4);
		let pos = 0;
		try {
			for (;;) if (this.state === TRAIL) {
				this.state = LEAD;
				pos = this._error(out, pos);
			} else if (this.state === ESCAPE_START) {
				this.output = false;
				this.state = this.outputState;
				pos = this._error(out, pos);
			} else if (this.state === ESCAPE) {
				const lead = this.lead;
				this.lead = 0;
				this.output = false;
				this.state = this.outputState;
				pos = this._error(out, pos);
				pos = this._decodeByte(lead, out, pos);
			} else break;
			return pos > 0 ? replaceDecodeErrors(this.backend.rawCharsToResult(out, pos), _classPrivateFieldGet2(_errors, this), _classPrivateFieldGet2(_replacement, this)) : void 0;
		} finally {
			this._reset();
		}
	}
};
const iso2022jp = Iso2022JpCodec;
const csiso2022jp = "iso2022jp";
// node_modules/iconv-lite/dist/encodings/sbcs-codec.js
var sbcs_codec_exports = /* @__PURE__ */ __exportAll({ _sbcs: () => _sbcs });
var SBCSCodec = class {
	constructor(codecOptions, iconv) {
		if (!codecOptions) throw new Error("SBCS codec is called without the data.");
		if (!codecOptions.chars || codecOptions.chars.length !== 128 && codecOptions.chars.length !== 256) throw new Error("Encoding '" + codecOptions.type + "' has incorrect 'chars' (must be of len 128 or 256)");
		if (codecOptions.chars.length === 128) {
			let asciiString = "";
			for (let i = 0; i < 128; i++) asciiString += String.fromCharCode(i);
			codecOptions.chars = asciiString + codecOptions.chars;
		}
		const decodeBuf = new Uint16Array(codecOptions.chars.length);
		for (let i = 0; i < codecOptions.chars.length; i++) decodeBuf[i] = codecOptions.chars.charCodeAt(i);
		this.decodeBuf = decodeBuf;
		this.encodingName = codecOptions.encodingName;
		const encodeBuf = iconv.backend.allocBytes(65536, 63);
		for (let i = 0; i < decodeBuf.length; i++) {
			const code = decodeBuf[i];
			if (code !== 65533) encodeBuf[code] = i;
		}
		this.encodeBuf = encodeBuf;
	}
	get encoder() {
		return SBCSEncoder;
	}
	get decoder() {
		return SBCSDecoder;
	}
	createEncoder(options, iconv) {
		return new SBCSEncoder(options, this, iconv.backend);
	}
	createDecoder(options, iconv) {
		return new SBCSDecoder(options, this, iconv.backend);
	}
};
var _defaultCharByte$1 = /* @__PURE__ */ new WeakMap();
var _handler$1 = /* @__PURE__ */ new WeakMap();
var _pendingSurrogate = /* @__PURE__ */ new WeakMap();
var _SBCSEncoder_brand = /* @__PURE__ */ new WeakSet();
var SBCSEncoder = class {
	constructor(opts, codec, backend) {
		_classPrivateMethodInitSpec(this, _SBCSEncoder_brand);
		_classPrivateFieldInitSpec(this, _defaultCharByte$1, void 0);
		_classPrivateFieldInitSpec(this, _handler$1, void 0);
		_classPrivateFieldInitSpec(this, _pendingSurrogate, false);
		this.backend = backend;
		this.encodeBuf = codec.encodeBuf;
		this.decodeBuf = codec.decodeBuf;
		_classPrivateFieldSet2(_defaultCharByte$1, this, getDefaultCharByte(opts));
		if (typeof (opts === null || opts === void 0 ? void 0 : opts.invalidCharHandler) === "function") _classPrivateFieldSet2(_handler$1, this, new EncodingHandler(opts.invalidCharHandler, codec.encodingName));
	}
	write(str) {
		if (!_classPrivateFieldGet2(_handler$1, this)) {
			const bytes = this.backend.allocBytes(str.length + Number(_classPrivateFieldGet2(_pendingSurrogate, this)));
			const encodeBuf = this.encodeBuf;
			let offset = 0;
			let length = 0;
			if (_classPrivateFieldGet2(_pendingSurrogate, this) && str.length > 0) {
				_classPrivateFieldSet2(_pendingSurrogate, this, false);
				bytes[length++] = _classPrivateFieldGet2(_defaultCharByte$1, this);
				if ((str.charCodeAt(0) & 64512) === 56320) offset++;
			}
			for (; offset < str.length; offset++) {
				const code = str.charCodeAt(offset);
				if ((code & 64512) === 55296) {
					if (offset + 1 === str.length) {
						_classPrivateFieldSet2(_pendingSurrogate, this, true);
						break;
					}
					if ((str.charCodeAt(offset + 1) & 64512) === 56320) offset++;
					bytes[length++] = _classPrivateFieldGet2(_defaultCharByte$1, this);
					continue;
				}
				const byte = encodeBuf[code];
				bytes[length++] = byte !== 63 || code !== 65533 && code === this.decodeBuf[63] ? byte : _classPrivateFieldGet2(_defaultCharByte$1, this);
			}
			return this.backend.bytesToResult(bytes, length);
		}
		return _assertClassBrand(_SBCSEncoder_brand, this, _writeWithHandler).call(this, str, false);
	}
	end() {
		var _classPrivateFieldGet2$2;
		if ((_classPrivateFieldGet2$2 = _classPrivateFieldGet2(_handler$1, this)) === null || _classPrivateFieldGet2$2 === void 0 ? void 0 : _classPrivateFieldGet2$2.hasPending) return _assertClassBrand(_SBCSEncoder_brand, this, _writeWithHandler).call(this, "", true);
		if (_classPrivateFieldGet2(_pendingSurrogate, this)) {
			_classPrivateFieldSet2(_pendingSurrogate, this, false);
			return this.backend.bytesToResult(this.backend.allocBytes(1, _classPrivateFieldGet2(_defaultCharByte$1, this)), 1);
		}
	}
};
function _isRepresentable(char) {
	const code = char.charCodeAt(0);
	return char.length === 1 && code !== 65533 && (this.encodeBuf[code] !== 63 || code === this.decodeBuf[63]);
}
function _writeWithHandler(str, final) {
	const output = new EncodingBuffer(this.backend, str.length);
	try {
		for (const { char, index } of _classPrivateFieldGet2(_handler$1, this).read(str, final)) {
			if (_assertClassBrand(_SBCSEncoder_brand, this, _isRepresentable).call(this, char)) {
				output.writeByte(this.encodeBuf[char.charCodeAt(0)]);
				continue;
			}
			const replacement = _classPrivateFieldGet2(_handler$1, this).resolve(char, index);
			if (replacement === null) {
				_classPrivateFieldGet2(_handler$1, this).clear();
				return null;
			}
			if (replacement === void 0) output.writeByte(_classPrivateFieldGet2(_defaultCharByte$1, this));
			else for (const replacementChar of replacement) {
				if (!_assertClassBrand(_SBCSEncoder_brand, this, _isRepresentable).call(this, replacementChar)) throw _classPrivateFieldGet2(_handler$1, this).replacementError(replacementChar, index);
				output.writeByte(this.encodeBuf[replacementChar.charCodeAt(0)]);
			}
		}
		return output.finish();
	} catch (error) {
		_classPrivateFieldGet2(_handler$1, this).clear();
		throw error;
	}
}
var _defaultCharUnicode$1 = /* @__PURE__ */ new WeakMap();
var SBCSDecoder = class {
	constructor(opts, codec, backend) {
		_classPrivateFieldInitSpec(this, _defaultCharUnicode$1, void 0);
		this.decodeBuf = codec.decodeBuf;
		this.backend = backend;
		this.fatal = !!(opts === null || opts === void 0 ? void 0 : opts.fatal);
		this.encodingName = codec.encodingName;
		_classPrivateFieldSet2(_defaultCharUnicode$1, this, getDefaultCharUnicode(opts));
	}
	write(buf) {
		const decodeBuf = this.decodeBuf;
		const chars = this.backend.allocRawChars(buf.length);
		if (this.fatal) for (let i = 0; i < buf.length; i++) {
			const code = decodeBuf[buf[i]];
			if (code === 65533) throw new TypeError("Invalid byte in " + this.encodingName);
			chars[i] = code;
		}
		else for (let i = 0; i < buf.length; i++) chars[i] = decodeBuf[buf[i]];
		const result = this.backend.rawCharsToResult(chars, chars.length);
		return this.fatal || _classPrivateFieldGet2(_defaultCharUnicode$1, this) === "�" ? result : result.replace(/\uFFFD/g, () => _classPrivateFieldGet2(_defaultCharUnicode$1, this));
	}
	end() {}
};
const _sbcs = SBCSCodec;
// node_modules/iconv-lite/dist/encodings/sbcs-data.js
var sbcs_data_default = {
	xuserdefined: {
		type: "_sbcs",
		chars: Array.from({ length: 128 }, (_, i) => String.fromCharCode(63360 + i)).join("")
	},
	10029: "maccenteuro",
	maccenteuro: {
		type: "_sbcs",
		chars: "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»…\xA0ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
	},
	808: "cp808",
	ibm808: "cp808",
	cp808: {
		type: "_sbcs",
		chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■\xA0"
	},
	mik: {
		type: "_sbcs",
		chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0"
	},
	cp720: {
		type: "_sbcs",
		chars: "éâàçêëèïîّْô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡ًٌٍَُِ≈°∙·√ⁿ²■\xA0"
	},
	ascii8bit: "ascii",
	usascii: "ascii",
	ansix34: "ascii",
	ansix341968: "ascii",
	ansix341986: "ascii",
	csascii: "ascii",
	cp367: "ascii",
	ibm367: "ascii",
	isoir6: "ascii",
	iso646us: "ascii",
	iso646irv: "ascii",
	us: "ascii",
	latin1: "iso88591",
	latin2: "iso88592",
	latin3: "iso88593",
	latin4: "iso88594",
	latin5: "iso88599",
	latin6: "iso885910",
	latin7: "iso885913",
	latin8: "iso885914",
	latin9: "iso885915",
	latin10: "iso885916",
	csisolatin1: "iso88591",
	csisolatin2: "iso88592",
	csisolatin3: "iso88593",
	csisolatin4: "iso88594",
	csisolatincyrillic: "iso88595",
	csisolatinarabic: "iso88596",
	csisolatingreek: "iso88597",
	csisolatinhebrew: "iso88598",
	csisolatin5: "iso88599",
	csisolatin6: "iso885910",
	l1: "iso88591",
	l2: "iso88592",
	l3: "iso88593",
	l4: "iso88594",
	l5: "iso88599",
	l6: "iso885910",
	l7: "iso885913",
	l8: "iso885914",
	l9: "iso885915",
	l10: "iso885916",
	isoir14: "iso646jp",
	isoir57: "iso646cn",
	isoir100: "iso88591",
	isoir101: "iso88592",
	isoir109: "iso88593",
	isoir110: "iso88594",
	isoir144: "iso88595",
	isoir127: "iso88596",
	isoir126: "iso88597",
	isoir138: "iso88598",
	isoir148: "iso88599",
	isoir157: "iso885910",
	isoir166: "tis620",
	isoir179: "iso885913",
	isoir199: "iso885914",
	isoir203: "iso885915",
	isoir226: "iso885916",
	cp819: "iso88591",
	ibm819: "iso88591",
	cyrillic: "iso88595",
	arabic: "iso88596",
	arabic8: "iso88596",
	ecma114: "iso88596",
	asmo708: "iso88596",
	greek: "iso88597",
	greek8: "iso88597",
	ecma118: "iso88597",
	elot928: "iso88597",
	hebrew: "iso88598",
	hebrew8: "iso88598",
	turkish: "iso88599",
	turkish8: "iso88599",
	thai: "iso885911",
	thai8: "iso885911",
	celtic: "iso885914",
	celtic8: "iso885914",
	isoceltic: "iso885914",
	tis6200: "tis620",
	tis62025291: "tis620",
	tis62025330: "tis620",
	1e4: "macroman",
	10006: "macgreek",
	10007: "maccyrillic",
	10079: "maciceland",
	10081: "macturkish",
	cspc8codepage437: "cp437",
	cspc775baltic: "cp775",
	cspc850multilingual: "cp850",
	cspcp852: "cp852",
	cspc862latinhebrew: "cp862",
	cpgr: "cp869",
	msee: "cp1250",
	mscyrl: "cp1251",
	msansi: "cp1252",
	msgreek: "cp1253",
	msturk: "cp1254",
	mshebr: "cp1255",
	msarab: "cp1256",
	winbaltrim: "cp1257",
	cp20866: "koi8r",
	20866: "koi8r",
	ibm878: "koi8r",
	cskoi8r: "koi8r",
	cp21866: "koi8u",
	21866: "koi8u",
	ibm1168: "koi8u",
	strk10482002: "rk1048",
	tcvn5712: "tcvn",
	tcvn57121: "tcvn",
	gb198880: "iso646cn",
	cn: "iso646cn",
	csiso14jisc6220ro: "iso646jp",
	jisc62201969ro: "iso646jp",
	jp: "iso646jp",
	cshproman8: "hproman8",
	r8: "hproman8",
	roman8: "hproman8",
	xroman8: "hproman8",
	ibm1051: "hproman8",
	mac: "macintosh",
	csmacintosh: "macintosh"
};
// node_modules/iconv-lite/dist/encodings/sbcs-data-generated.js
var sbcs_data_generated_default = {
	"437": "cp437",
	"737": "cp737",
	"775": "cp775",
	"850": "cp850",
	"852": "cp852",
	"855": "cp855",
	"856": "cp856",
	"857": "cp857",
	"858": "cp858",
	"860": "cp860",
	"861": "cp861",
	"862": "cp862",
	"863": "cp863",
	"864": "cp864",
	"865": "cp865",
	"866": "cp866",
	"869": "cp869",
	"874": "windows874",
	"922": "cp922",
	"1046": "cp1046",
	"1124": "cp1124",
	"1125": "cp1125",
	"1129": "cp1129",
	"1133": "cp1133",
	"1161": "cp1161",
	"1162": "cp1162",
	"1163": "cp1163",
	"1250": "windows1250",
	"1251": "windows1251",
	"1252": "windows1252",
	"1253": "windows1253",
	"1254": "windows1254",
	"1255": "windows1255",
	"1256": "windows1256",
	"1257": "windows1257",
	"1258": "windows1258",
	"28591": "iso88591",
	"28592": "iso88592",
	"28593": "iso88593",
	"28594": "iso88594",
	"28595": "iso88595",
	"28596": "iso88596",
	"28597": "iso88597",
	"28598": "iso88598",
	"28599": "iso88599",
	"28600": "iso885910",
	"28601": "iso885911",
	"28603": "iso885913",
	"28604": "iso885914",
	"28605": "iso885915",
	"28606": "iso885916",
	"windows874": {
		"type": "_sbcs",
		"chars": "€…‘’“”•–—\xA0กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	},
	"win874": "windows874",
	"cp874": "windows874",
	"windows1250": {
		"type": "_sbcs",
		"chars": "€‚„…†‡‰Š‹ŚŤŽŹ‘’“”•–—™š›śťžź\xA0ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
	},
	"win1250": "windows1250",
	"cp1250": "windows1250",
	"windows1251": {
		"type": "_sbcs",
		"chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—™љ›њќћџ\xA0ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
	},
	"win1251": "windows1251",
	"cp1251": "windows1251",
	"windows1252": {
		"type": "_sbcs",
		"chars": "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ\xA0¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	},
	"win1252": "windows1252",
	"cp1252": "windows1252",
	"windows1253": {
		"type": "_sbcs",
		"chars": "€‚ƒ„…†‡‰‹‘’“”•–—™›\xA0΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
	},
	"win1253": "windows1253",
	"cp1253": "windows1253",
	"windows1254": {
		"type": "_sbcs",
		"chars": "€‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ\xA0¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
	},
	"win1254": "windows1254",
	"cp1254": "windows1254",
	"windows1255": {
		"type": "_sbcs",
		"chars": "€‚ƒ„…†‡ˆ‰‹‘’“”•–—˜™›\xA0¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
	},
	"win1255": "windows1255",
	"cp1255": "windows1255",
	"windows1256": {
		"type": "_sbcs",
		"chars": "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں\xA0،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
	},
	"win1256": "windows1256",
	"cp1256": "windows1256",
	"windows1257": {
		"type": "_sbcs",
		"chars": "€‚„…†‡‰‹¨ˇ¸‘’“”•–—™›¯˛\xA0�¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
	},
	"win1257": "windows1257",
	"cp1257": "windows1257",
	"windows1258": {
		"type": "_sbcs",
		"chars": "€‚ƒ„…†‡ˆ‰‹Œ‘’“”•–—˜™›œŸ\xA0¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
	},
	"win1258": "windows1258",
	"cp1258": "windows1258",
	"iso88591": {
		"type": "_sbcs",
		"chars": "\xA0¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	},
	"cp28591": "iso88591",
	"iso88592": {
		"type": "_sbcs",
		"chars": "\xA0Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
	},
	"cp28592": "iso88592",
	"iso88593": {
		"type": "_sbcs",
		"chars": "\xA0Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
	},
	"cp28593": "iso88593",
	"iso88594": {
		"type": "_sbcs",
		"chars": "\xA0ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
	},
	"cp28594": "iso88594",
	"iso88595": {
		"type": "_sbcs",
		"chars": "\xA0ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
	},
	"cp28595": "iso88595",
	"iso88596": {
		"type": "_sbcs",
		"chars": "\xA0���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
	},
	"cp28596": "iso88596",
	"iso88597": {
		"type": "_sbcs",
		"chars": "\xA0‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
	},
	"cp28597": "iso88597",
	"iso88598": {
		"type": "_sbcs",
		"chars": "\xA0�¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
	},
	"cp28598": "iso88598",
	"iso88599": {
		"type": "_sbcs",
		"chars": "\xA0¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
	},
	"cp28599": "iso88599",
	"iso885910": {
		"type": "_sbcs",
		"chars": "\xA0ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
	},
	"cp28600": "iso885910",
	"iso885911": {
		"type": "_sbcs",
		"chars": "\xA0กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	},
	"cp28601": "iso885911",
	"iso885913": {
		"type": "_sbcs",
		"chars": "\xA0”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
	},
	"cp28603": "iso885913",
	"iso885914": {
		"type": "_sbcs",
		"chars": "\xA0Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
	},
	"cp28604": "iso885914",
	"iso885915": {
		"type": "_sbcs",
		"chars": "\xA0¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	},
	"cp28605": "iso885915",
	"iso885916": {
		"type": "_sbcs",
		"chars": "\xA0ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
	},
	"cp28606": "iso885916",
	"cp437": {
		"type": "_sbcs",
		"chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0"
	},
	"ibm437": "cp437",
	"csibm437": "cp437",
	"cp737": {
		"type": "_sbcs",
		"chars": "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■\xA0"
	},
	"ibm737": "cp737",
	"csibm737": "cp737",
	"cp775": {
		"type": "_sbcs",
		"chars": "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■\xA0"
	},
	"ibm775": "cp775",
	"csibm775": "cp775",
	"cp850": {
		"type": "_sbcs",
		"chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■\xA0"
	},
	"ibm850": "cp850",
	"csibm850": "cp850",
	"cp852": {
		"type": "_sbcs",
		"chars": "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■\xA0"
	},
	"ibm852": "cp852",
	"csibm852": "cp852",
	"cp855": {
		"type": "_sbcs",
		"chars": "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■\xA0"
	},
	"ibm855": "cp855",
	"csibm855": "cp855",
	"cp856": {
		"type": "_sbcs",
		"chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■\xA0"
	},
	"ibm856": "cp856",
	"csibm856": "cp856",
	"cp857": {
		"type": "_sbcs",
		"chars": "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■\xA0"
	},
	"ibm857": "cp857",
	"csibm857": "cp857",
	"cp858": {
		"type": "_sbcs",
		"chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■\xA0"
	},
	"ibm858": "cp858",
	"csibm858": "cp858",
	"cp860": {
		"type": "_sbcs",
		"chars": "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0"
	},
	"ibm860": "cp860",
	"csibm860": "cp860",
	"cp861": {
		"type": "_sbcs",
		"chars": "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0"
	},
	"ibm861": "cp861",
	"csibm861": "cp861",
	"cp862": {
		"type": "_sbcs",
		"chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0"
	},
	"ibm862": "cp862",
	"csibm862": "cp862",
	"cp863": {
		"type": "_sbcs",
		"chars": "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0"
	},
	"ibm863": "cp863",
	"csibm863": "cp863",
	"cp864": {
		"type": "_sbcs",
		"chars": "\0\x07\b	\n\v\f\r\x1B !\"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ�\xA0­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�"
	},
	"ibm864": "cp864",
	"csibm864": "cp864",
	"cp865": {
		"type": "_sbcs",
		"chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0"
	},
	"ibm865": "cp865",
	"csibm865": "cp865",
	"cp866": {
		"type": "_sbcs",
		"chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■\xA0"
	},
	"ibm866": "cp866",
	"csibm866": "cp866",
	"cp869": {
		"type": "_sbcs",
		"chars": "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■\xA0"
	},
	"ibm869": "cp869",
	"csibm869": "cp869",
	"cp922": {
		"type": "_sbcs",
		"chars": "\xA0¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
	},
	"ibm922": "cp922",
	"csibm922": "cp922",
	"cp1046": {
		"type": "_sbcs",
		"chars": "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ\xA0¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
	},
	"ibm1046": "cp1046",
	"csibm1046": "cp1046",
	"cp1124": {
		"type": "_sbcs",
		"chars": "\xA0ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
	},
	"ibm1124": "cp1124",
	"csibm1124": "cp1124",
	"cp1125": {
		"type": "_sbcs",
		"chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■\xA0"
	},
	"ibm1125": "cp1125",
	"csibm1125": "cp1125",
	"cp1129": {
		"type": "_sbcs",
		"chars": "\xA0¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
	},
	"ibm1129": "cp1129",
	"csibm1129": "cp1129",
	"cp1133": {
		"type": "_sbcs",
		"chars": "\xA0ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
	},
	"ibm1133": "cp1133",
	"csibm1133": "cp1133",
	"cp1161": {
		"type": "_sbcs",
		"chars": "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦\xA0"
	},
	"ibm1161": "cp1161",
	"csibm1161": "cp1161",
	"cp1162": {
		"type": "_sbcs",
		"chars": "€…‘’“”•–—\xA0กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	},
	"ibm1162": "cp1162",
	"csibm1162": "cp1162",
	"cp1163": {
		"type": "_sbcs",
		"chars": "\xA0¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
	},
	"ibm1163": "cp1163",
	"csibm1163": "cp1163",
	"maccroatian": {
		"type": "_sbcs",
		"chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č…\xA0ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
	},
	"maccyrillic": {
		"type": "_sbcs",
		"chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»…\xA0ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
	},
	"macgreek": {
		"type": "_sbcs",
		"chars": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»…\xA0ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
	},
	"maciceland": {
		"type": "_sbcs",
		"chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	},
	"macroman": {
		"type": "_sbcs",
		"chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	},
	"macromania": {
		"type": "_sbcs",
		"chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	},
	"macthai": {
		"type": "_sbcs",
		"chars": "«»…“”�•‘’�\xA0กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู﻿​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
	},
	"macturkish": {
		"type": "_sbcs",
		"chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
	},
	"macukraine": {
		"type": "_sbcs",
		"chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»…\xA0ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
	},
	"koi8r": {
		"type": "_sbcs",
		"chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥\xA0⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	},
	"koi8u": {
		"type": "_sbcs",
		"chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥\xA0⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	},
	"koi8ru": {
		"type": "_sbcs",
		"chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥\xA0⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	},
	"koi8t": {
		"type": "_sbcs",
		"chars": "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
	},
	"armscii8": {
		"type": "_sbcs",
		"chars": "\xA0�և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
	},
	"rk1048": {
		"type": "_sbcs",
		"chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ\xA0ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
	},
	"tcvn": {
		"type": "_sbcs",
		"chars": "\0ÚỤỪỬỮ\x07\b	\n\v\f\rỨỰỲỶỸÝỴ\x1B !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ\xA0ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ"
	},
	"georgianacademy": {
		"type": "_sbcs",
		"chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ\xA0¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	},
	"georgianps": {
		"type": "_sbcs",
		"chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ\xA0¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
	},
	"pt154": {
		"type": "_sbcs",
		"chars": "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ\xA0ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
	},
	"viscii": {
		"type": "_sbcs",
		"chars": "\0ẲẴẪ\x07\b	\n\v\f\rỶỸ\x1BỴ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ"
	},
	"iso646cn": {
		"type": "_sbcs",
		"chars": "\0\x07\b	\n\v\f\r\x1B !\"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
	},
	"iso646jp": {
		"type": "_sbcs",
		"chars": "\0\x07\b	\n\v\f\r\x1B !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
	},
	"hproman8": {
		"type": "_sbcs",
		"chars": "\xA0ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
	},
	"macintosh": {
		"type": "_sbcs",
		"chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	},
	"ascii": {
		"type": "_sbcs",
		"chars": "��������������������������������������������������������������������������������������������������������������������������������"
	},
	"tis620": {
		"type": "_sbcs",
		"chars": "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
	},
	"xmaccyrillic": {
		"type": "_sbcs",
		"chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»…\xA0ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю€"
	}
};
// node_modules/iconv-lite/dist/encodings/vlq-runs.js
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const B64_VALUE = (() => {
	const table = (/* @__PURE__ */ new Uint8Array(128)).fill(255);
	for (let i = 0; i < 64; i++) table[B64.charCodeAt(i)] = i;
	return table;
})();
function decodeVlqStream(stream) {
	const values = [];
	let i = 0;
	while (i < stream.length) {
		let value = 0;
		let multiplier = 1;
		let digit;
		do {
			digit = B64_VALUE[stream.charCodeAt(i++)];
			value += (digit & 31) * multiplier;
			multiplier *= 32;
		} while ((digit & 32) !== 0);
		const magnitude = Math.floor(value / 2);
		values.push((value & 1) === 1 ? -magnitude : magnitude);
	}
	return values;
}
function forEachVlqRun(payload, addRun) {
	const [firstUCode, firstDbcs, uCodeGaps, lengths, dbcsGaps] = payload.split(".");
	const runUCodeGaps = decodeVlqStream(uCodeGaps);
	const runLengths = decodeVlqStream(lengths);
	const runDbcsGaps = decodeVlqStream(dbcsGaps);
	let uCode = decodeVlqStream(firstUCode)[0];
	let dbcs = decodeVlqStream(firstDbcs)[0];
	for (let i = 0; i < runLengths.length; i++) {
		addRun(dbcs, uCode, runLengths[i]);
		uCode += runLengths[i] + runUCodeGaps[i];
		dbcs += runLengths[i] + runDbcsGaps[i];
	}
}
// node_modules/iconv-lite/dist/encodings/dbcs-codec.js
var dbcs_codec_exports = /* @__PURE__ */ __exportAll({ _dbcs: () => _dbcs });
const UNASSIGNED = -1;
const GB18030_CODE = -2;
const SEQ_START = -10;
const NODE_START = -1e3;
const UNASSIGNED_NODE = new Array(256);
const DEF_CHAR = -1;
const GB18030_GAP_START = 39420;
const GB18030_SUPPLEMENTARY_START = 189e3;
const GB18030_MAX_POINTER = 1237575;
for (let i = 0; i < 256; i++) UNASSIGNED_NODE[i] = UNASSIGNED;
var DBCSCodec = class {
	constructor(codecOptions, iconv) {
		this.encodingName = codecOptions.encodingName;
		if (!codecOptions) throw new Error("DBCS codec is called without the data.");
		if (!codecOptions.table) throw new Error("Encoding '" + this.encodingName + "' has no data.");
		const mappingTable = codecOptions.table();
		this.decodeTables = [];
		this.decodeTables[0] = UNASSIGNED_NODE.slice(0);
		this.decodeTableSeq = [];
		this._addMappingTable(mappingTable);
		for (const [from, to] of codecOptions.leadBytes || []) for (let lead = from; lead <= to; lead++) this._getDecodeTrieNode(lead << 8);
		this.eucjp = !!codecOptions.eucjp;
		if (this.eucjp) for (let lead = 161; lead <= 254; lead++) this._getDecodeTrieNode(9371648 | lead << 8);
		if (typeof codecOptions.gb18030 === "function") {
			this.gb18030 = codecOptions.gb18030();
			this.gb18030EncoderTable = codecOptions.gb18030EncoderTable;
		}
		this.gb18030Decode = typeof codecOptions.gb18030Decode === "function" ? codecOptions.gb18030Decode() : this.gb18030;
		if (this.gb18030Decode) {
			const commonThirdByteNodeIdx = this.decodeTables.length;
			this.decodeTables.push(UNASSIGNED_NODE.slice(0));
			const commonFourthByteNodeIdx = this.decodeTables.length;
			this.decodeTables.push(UNASSIGNED_NODE.slice(0));
			const firstByteNode = this.decodeTables[0];
			for (let i = 129; i <= 254; i++) {
				const secondByteNode = this.decodeTables[NODE_START - firstByteNode[i]];
				for (let j = 48; j <= 57; j++) {
					if (secondByteNode[j] === UNASSIGNED) secondByteNode[j] = NODE_START - commonThirdByteNodeIdx;
					else if (secondByteNode[j] > NODE_START) throw new Error("gb18030 decode tables conflict at byte 2");
					const thirdByteNode = this.decodeTables[NODE_START - secondByteNode[j]];
					for (let k = 129; k <= 254; k++) {
						if (thirdByteNode[k] === UNASSIGNED) thirdByteNode[k] = NODE_START - commonFourthByteNodeIdx;
						else if (thirdByteNode[k] === NODE_START - commonFourthByteNodeIdx) continue;
						else if (thirdByteNode[k] > NODE_START) throw new Error("gb18030 decode tables conflict at byte 3");
						const fourthByteNode = this.decodeTables[NODE_START - thirdByteNode[k]];
						for (let l = 48; l <= 57; l++) if (fourthByteNode[l] === UNASSIGNED) fourthByteNode[l] = GB18030_CODE;
					}
				}
			}
		}
		this.encodeTable = [];
		this.encodeTableSeq = [];
		const skipEncodeChars = {};
		if (codecOptions.encodeSkipVals) for (let i = 0; i < codecOptions.encodeSkipVals.length; i++) {
			const val = codecOptions.encodeSkipVals[i];
			if (typeof val === "number") skipEncodeChars[val] = true;
			else for (let j = val.from; j <= val.to; j++) skipEncodeChars[j] = true;
		}
		this._fillEncodeTable(0, 0, skipEncodeChars);
		if (codecOptions.encodeAdd) {
			for (const uChar in codecOptions.encodeAdd) if (Object.prototype.hasOwnProperty.call(codecOptions.encodeAdd, uChar)) this._setEncodeChar(uChar.charCodeAt(0), codecOptions.encodeAdd[uChar]);
		}
	}
	createEncoder(options, iconv) {
		const defaultCharByte = getDefaultCharByte(options);
		return typeof (options === null || options === void 0 ? void 0 : options.invalidCharHandler) === "function" ? new DBCSHandlerEncoder(this, iconv.backend, options.invalidCharHandler, defaultCharByte) : new DBCSEncoder(this, iconv.backend, defaultCharByte);
	}
	createDecoder(options, iconv) {
		return new DBCSDecoder(this, iconv.backend, options);
	}
	_getDecodeTrieNode(addr) {
		const bytes = [];
		for (; addr > 0; addr >>>= 8) bytes.push(addr & 255);
		if (bytes.length === 0) bytes.push(0);
		let node = this.decodeTables[0];
		for (let i = bytes.length - 1; i > 0; i--) {
			const val = node[bytes[i]];
			if (val === UNASSIGNED) {
				node[bytes[i]] = NODE_START - this.decodeTables.length;
				this.decodeTables.push(node = UNASSIGNED_NODE.slice(0));
			} else if (val <= NODE_START) node = this.decodeTables[NODE_START - val];
			else throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + addr.toString(16));
		}
		return node;
	}
	_addMappingTable(table) {
		if (typeof table === "string") forEachVlqRun(table, this._addVlqRun.bind(this));
		else if (typeof table[0] === "string" && /^[0-9a-f]+$/i.test(table[0])) this._addDecodeChunk(table);
		else for (const part of table) this._addMappingTable(part);
	}
	_addVlqRun(dbcs, uCode, length) {
		while (length > 0) {
			if ((dbcs & -256) !== this._vlqRunBlockAddr) {
				this._vlqRunNode = this._getDecodeTrieNode(dbcs);
				this._vlqRunBlockAddr = dbcs & -256;
			}
			const node = this._vlqRunNode;
			const offset = dbcs & 255;
			const count = Math.min(length, 256 - offset);
			for (let i = 0; i < count; i++) node[offset + i] = uCode + i;
			dbcs += count;
			uCode += count;
			length -= count;
		}
	}
	_addDecodeChunk(chunk) {
		let curAddr = parseInt(chunk[0], 16);
		const writeTable = this._getDecodeTrieNode(curAddr);
		curAddr = curAddr & 255;
		for (let k = 1; k < chunk.length; k++) {
			const part = chunk[k];
			if (typeof part === "string") for (let l = 0; l < part.length;) {
				const code = part.charCodeAt(l++);
				if (code >= 55296 && code < 56320) {
					const codeTrail = part.charCodeAt(l++);
					if (codeTrail >= 56320 && codeTrail < 57344) writeTable[curAddr++] = 65536 + (code - 55296) * 1024 + (codeTrail - 56320);
					else throw new Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + chunk[0]);
				} else if (code > 4080 && code <= 4095) {
					const len = 4095 - code + 2;
					const seq = [];
					for (let m = 0; m < len; m++) seq.push(part.charCodeAt(l++));
					writeTable[curAddr++] = SEQ_START - this.decodeTableSeq.length;
					this.decodeTableSeq.push(seq);
				} else writeTable[curAddr++] = code;
			}
			else if (typeof part === "number") {
				let charCode = writeTable[curAddr - 1] + 1;
				for (let l = 0; l < part; l++) writeTable[curAddr++] = charCode++;
			} else throw new Error("Incorrect type '" + typeof part + "' given in " + this.encodingName + " at chunk " + chunk[0]);
		}
		if (curAddr > 255) throw new Error("Incorrect chunk in " + this.encodingName + " at addr " + chunk[0] + ": too long" + curAddr);
	}
	_getEncodeBucket(uCode) {
		const high = uCode >> 8;
		if (this.encodeTable[high] === void 0) this.encodeTable[high] = UNASSIGNED_NODE.slice(0);
		return this.encodeTable[high];
	}
	_setEncodeChar(uCode, dbcsCode) {
		const bucket = this._getEncodeBucket(uCode);
		const low = uCode & 255;
		if (bucket[low] <= SEQ_START) this.encodeTableSeq[SEQ_START - bucket[low]][DEF_CHAR] = dbcsCode;
		else if (bucket[low] === UNASSIGNED) bucket[low] = dbcsCode;
	}
	_setEncodeSequence(seq, dbcsCode) {
		let uCode = seq[0];
		const bucket = this._getEncodeBucket(uCode);
		const low = uCode & 255;
		let node;
		if (bucket[low] <= SEQ_START) node = this.encodeTableSeq[SEQ_START - bucket[low]];
		else {
			node = {};
			if (bucket[low] !== UNASSIGNED) node[DEF_CHAR] = bucket[low];
			bucket[low] = SEQ_START - this.encodeTableSeq.length;
			this.encodeTableSeq.push(node);
		}
		for (let j = 1; j < seq.length - 1; j++) {
			const oldVal = node[uCode];
			if (typeof oldVal === "object") node = oldVal;
			else {
				node = node[uCode] = {};
				if (oldVal !== void 0) node[DEF_CHAR] = oldVal;
			}
		}
		uCode = seq[seq.length - 1];
		node[uCode] = dbcsCode;
	}
	_fillEncodeTable(nodeIdx, prefix, skipEncodeChars) {
		const node = this.decodeTables[nodeIdx];
		let hasValues = false;
		const subNodeEmpty = {};
		for (let i = 0; i < 256; i++) {
			const uCode = node[i];
			const mbCode = prefix + i;
			if (skipEncodeChars[mbCode]) continue;
			if (uCode >= 0) {
				this._setEncodeChar(uCode, mbCode);
				hasValues = true;
			} else if (uCode <= NODE_START) {
				const subNodeIdx = NODE_START - uCode;
				if (!subNodeEmpty[subNodeIdx]) {
					const newPrefix = mbCode << 8 >>> 0;
					if (this._fillEncodeTable(subNodeIdx, newPrefix, skipEncodeChars)) hasValues = true;
					else subNodeEmpty[subNodeIdx] = true;
				}
			} else if (uCode <= SEQ_START) {
				this._setEncodeSequence(this.decodeTableSeq[SEQ_START - uCode], mbCode);
				hasValues = true;
			}
		}
		return hasValues;
	}
};
var _defaultCharByte = /* @__PURE__ */ new WeakMap();
var DBCSEncoder = class {
	constructor(codec, backend, defaultCharByte) {
		_classPrivateFieldInitSpec(this, _defaultCharByte, void 0);
		this.backend = backend;
		this.leadSurrogate = -1;
		this.seqObj = void 0;
		this.encodeTable = codec.encodeTable;
		this.encodeTableSeq = codec.encodeTableSeq;
		_classPrivateFieldSet2(_defaultCharByte, this, defaultCharByte);
		this.gb18030 = codec.gb18030;
		this.gb18030EncoderTable = codec.gb18030EncoderTable;
	}
	write(str) {
		const pendingChars = (this.leadSurrogate === -1 ? 0 : 1) + (this.seqObj === void 0 ? 0 : 1);
		const newBuf = this.backend.allocBytes((str.length + pendingChars) * (this.gb18030 ? 4 : 3));
		let leadSurrogate = this.leadSurrogate;
		let seqObj = this.seqObj;
		let nextChar = -1;
		let i = 0;
		let j = 0;
		while (true) {
			let uCode;
			if (nextChar === -1) {
				if (i === str.length) break;
				uCode = str.charCodeAt(i++);
			} else {
				uCode = nextChar;
				nextChar = -1;
			}
			if (uCode >= 55296 && uCode < 57344) {
				if (uCode < 56320) {
					if (leadSurrogate === -1) {
						leadSurrogate = uCode;
						continue;
					} else {
						leadSurrogate = uCode;
						uCode = UNASSIGNED;
					}
				} else if (leadSurrogate !== -1) {
					uCode = 65536 + (leadSurrogate - 55296) * 1024 + (uCode - 56320);
					leadSurrogate = -1;
				} else uCode = UNASSIGNED;
			} else if (leadSurrogate !== -1) {
				nextChar = uCode;
				uCode = UNASSIGNED;
				leadSurrogate = -1;
			}
			let dbcsCode = UNASSIGNED;
			let writeReplacement = false;
			if (seqObj !== void 0) {
				let resCode = uCode === UNASSIGNED ? void 0 : seqObj[uCode];
				if (typeof resCode === "object") {
					seqObj = resCode;
					continue;
				} else if (typeof resCode === "number") dbcsCode = resCode;
				else if (resCode == null) {
					resCode = seqObj[DEF_CHAR];
					if (resCode !== void 0) {
						dbcsCode = resCode;
						if (uCode === UNASSIGNED) writeReplacement = true;
						else nextChar = uCode;
					}
				}
				seqObj = void 0;
			} else if (uCode >= 0) {
				const subtable = this.encodeTable[uCode >> 8];
				if (subtable !== void 0) dbcsCode = subtable[uCode & 255];
				if (dbcsCode <= SEQ_START) {
					seqObj = this.encodeTableSeq[SEQ_START - dbcsCode];
					continue;
				}
				if (dbcsCode === UNASSIGNED && this.gb18030) {
					var _this$gb18030EncoderT;
					const tableCode = (_this$gb18030EncoderT = this.gb18030EncoderTable) === null || _this$gb18030EncoderT === void 0 ? void 0 : _this$gb18030EncoderT[uCode];
					if (tableCode !== void 0) dbcsCode = tableCode !== null && tableCode !== void 0 ? tableCode : UNASSIGNED;
					else {
						const idx = findIdx(this.gb18030.uChars, uCode);
						if (idx !== -1) {
							dbcsCode = this.gb18030.gbChars[idx] + (uCode - this.gb18030.uChars[idx]);
							newBuf[j++] = 129 + Math.floor(dbcsCode / 12600);
							dbcsCode = dbcsCode % 12600;
							newBuf[j++] = 48 + Math.floor(dbcsCode / 1260);
							dbcsCode = dbcsCode % 1260;
							newBuf[j++] = 129 + Math.floor(dbcsCode / 10);
							dbcsCode = dbcsCode % 10;
							newBuf[j++] = 48 + dbcsCode;
							continue;
						}
					}
				}
			}
			if (dbcsCode === UNASSIGNED) dbcsCode = _classPrivateFieldGet2(_defaultCharByte, this);
			if (dbcsCode < 256) newBuf[j++] = dbcsCode;
			else if (dbcsCode < 65536) {
				newBuf[j++] = dbcsCode >> 8;
				newBuf[j++] = dbcsCode & 255;
			} else if (dbcsCode < 16777216) {
				newBuf[j++] = dbcsCode >> 16;
				newBuf[j++] = dbcsCode >> 8 & 255;
				newBuf[j++] = dbcsCode & 255;
			} else {
				newBuf[j++] = dbcsCode >>> 24;
				newBuf[j++] = dbcsCode >>> 16 & 255;
				newBuf[j++] = dbcsCode >>> 8 & 255;
				newBuf[j++] = dbcsCode & 255;
			}
			if (writeReplacement) newBuf[j++] = _classPrivateFieldGet2(_defaultCharByte, this);
		}
		this.seqObj = seqObj;
		this.leadSurrogate = leadSurrogate;
		return this.backend.bytesToResult(newBuf, j);
	}
	end() {
		if (this.leadSurrogate === -1 && this.seqObj === void 0) return;
		const newBuf = this.backend.allocBytes(10);
		let j = 0;
		if (this.seqObj) {
			const dbcsCode = this.seqObj[DEF_CHAR];
			if (dbcsCode !== void 0) {
				if (dbcsCode < 256) newBuf[j++] = dbcsCode;
				else {
					newBuf[j++] = dbcsCode >> 8;
					newBuf[j++] = dbcsCode & 255;
				}
			}
			this.seqObj = void 0;
		}
		if (this.leadSurrogate !== -1) {
			newBuf[j++] = _classPrivateFieldGet2(_defaultCharByte, this);
			this.leadSurrogate = -1;
		}
		return this.backend.bytesToResult(newBuf, j);
	}
	findIdx(table, val) {
		return findIdx(table, val);
	}
};
var _codec = /* @__PURE__ */ new WeakMap();
var _backend = /* @__PURE__ */ new WeakMap();
var _handler = /* @__PURE__ */ new WeakMap();
var _defaultCharByte2 = /* @__PURE__ */ new WeakMap();
var _sequence = /* @__PURE__ */ new WeakMap();
var _node = /* @__PURE__ */ new WeakMap();
var _DBCSHandlerEncoder_brand = /* @__PURE__ */ new WeakSet();
var DBCSHandlerEncoder = class {
	constructor(codec, backend, callback, defaultCharByte) {
		_classPrivateMethodInitSpec(this, _DBCSHandlerEncoder_brand);
		_classPrivateFieldInitSpec(this, _codec, void 0);
		_classPrivateFieldInitSpec(this, _backend, void 0);
		_classPrivateFieldInitSpec(this, _handler, void 0);
		_classPrivateFieldInitSpec(this, _defaultCharByte2, void 0);
		_classPrivateFieldInitSpec(this, _sequence, []);
		_classPrivateFieldInitSpec(this, _node, null);
		_classPrivateFieldSet2(_codec, this, codec);
		_classPrivateFieldSet2(_backend, this, backend);
		_classPrivateFieldSet2(_handler, this, new EncodingHandler(callback, codec.encodingName));
		_classPrivateFieldSet2(_defaultCharByte2, this, defaultCharByte);
	}
	write(str) {
		return _assertClassBrand(_DBCSHandlerEncoder_brand, this, _write).call(this, str, false);
	}
	end() {
		if (_classPrivateFieldGet2(_handler, this).hasPending || _classPrivateFieldGet2(_node, this)) return _assertClassBrand(_DBCSHandlerEncoder_brand, this, _write).call(this, "", true);
	}
};
function _mapping(char) {
	var _this$codec$encodeTab, _classPrivateFieldGet2$1, _classPrivateFieldGet3;
	const code = char.codePointAt(0);
	if (code >= 55296 && code <= 57343) return UNASSIGNED;
	const mapped = (_this$codec$encodeTab = (_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_codec, this).encodeTable[code >> 8]) === null || _classPrivateFieldGet2$1 === void 0 ? void 0 : _classPrivateFieldGet2$1[code & 255]) !== null && _this$codec$encodeTab !== void 0 ? _this$codec$encodeTab : UNASSIGNED;
	if (mapped !== UNASSIGNED || !_classPrivateFieldGet2(_codec, this).gb18030) return mapped;
	const tableCode = (_classPrivateFieldGet3 = _classPrivateFieldGet2(_codec, this).gb18030EncoderTable) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3[code];
	if (tableCode !== void 0) return tableCode !== null && tableCode !== void 0 ? tableCode : UNASSIGNED;
	const ranges = _classPrivateFieldGet2(_codec, this).gb18030;
	const index = findIdx(ranges.uChars, code);
	if (index === -1) return UNASSIGNED;
	const pointer = ranges.gbChars[index] + code - ranges.uChars[index];
	return (129 + Math.floor(pointer / 12600)) * 16777216 + (48 + Math.floor(pointer / 1260) % 10) * 65536 + (129 + Math.floor(pointer / 10) % 126) * 256 + 48 + pointer % 10;
}
function _invalid(token, output) {
	if (token.replacement) throw _classPrivateFieldGet2(_handler, this).replacementError(token.char, token.index);
	const replacement = _classPrivateFieldGet2(_handler, this).resolve(token.char, token.index);
	if (replacement === null) return false;
	if (replacement === void 0) {
		if (!_assertClassBrand(_DBCSHandlerEncoder_brand, this, _flushSequence).call(this, output)) return false;
		output.writeByte(_classPrivateFieldGet2(_defaultCharByte2, this));
	} else for (const char of replacement) if (!_assertClassBrand(_DBCSHandlerEncoder_brand, this, _emit).call(this, {
		char,
		index: token.index,
		replacement: true
	}, output)) return false;
	return true;
}
function _flushSequence(output) {
	if (!_classPrivateFieldGet2(_node, this)) return true;
	const code = _classPrivateFieldGet2(_node, this)[DEF_CHAR];
	const sequence = _classPrivateFieldGet2(_sequence, this);
	_classPrivateFieldSet2(_node, this, null);
	_classPrivateFieldSet2(_sequence, this, []);
	if (code !== void 0) {
		output.writeCode(code);
		return true;
	}
	if (!_assertClassBrand(_DBCSHandlerEncoder_brand, this, _invalid).call(this, sequence[0], output)) return false;
	for (const token of sequence.slice(1)) if (!_assertClassBrand(_DBCSHandlerEncoder_brand, this, _emit).call(this, token, output)) return false;
	return true;
}
function _emit(token, output) {
	const mapped = _assertClassBrand(_DBCSHandlerEncoder_brand, this, _mapping).call(this, token.char);
	if (_classPrivateFieldGet2(_node, this)) {
		const next = _classPrivateFieldGet2(_node, this)[token.char.codePointAt(0)];
		if (typeof next === "object") {
			_classPrivateFieldGet2(_sequence, this).push(token);
			_classPrivateFieldSet2(_node, this, next);
			return true;
		}
		if (typeof next === "number") {
			output.writeCode(next);
			_classPrivateFieldSet2(_node, this, null);
			_classPrivateFieldSet2(_sequence, this, []);
			return true;
		}
		if (mapped === UNASSIGNED) return _assertClassBrand(_DBCSHandlerEncoder_brand, this, _invalid).call(this, token, output);
		if (!_assertClassBrand(_DBCSHandlerEncoder_brand, this, _flushSequence).call(this, output)) return false;
		return _assertClassBrand(_DBCSHandlerEncoder_brand, this, _emit).call(this, token, output);
	}
	if (mapped === UNASSIGNED) return _assertClassBrand(_DBCSHandlerEncoder_brand, this, _invalid).call(this, token, output);
	if (mapped <= SEQ_START) {
		_classPrivateFieldSet2(_node, this, _classPrivateFieldGet2(_codec, this).encodeTableSeq[SEQ_START - mapped]);
		_classPrivateFieldSet2(_sequence, this, [token]);
	} else output.writeCode(mapped);
	return true;
}
function _reset() {
	_classPrivateFieldGet2(_handler, this).clear();
	_classPrivateFieldSet2(_node, this, null);
	_classPrivateFieldSet2(_sequence, this, []);
}
function _write(str, final) {
	const output = new EncodingBuffer(_classPrivateFieldGet2(_backend, this), str.length * 3);
	try {
		for (const token of _classPrivateFieldGet2(_handler, this).read(str, final)) if (!_assertClassBrand(_DBCSHandlerEncoder_brand, this, _emit).call(this, token, output)) {
			_assertClassBrand(_DBCSHandlerEncoder_brand, this, _reset).call(this);
			return null;
		}
		if (final) {
			while (_classPrivateFieldGet2(_node, this)) if (!_assertClassBrand(_DBCSHandlerEncoder_brand, this, _flushSequence).call(this, output)) {
				_assertClassBrand(_DBCSHandlerEncoder_brand, this, _reset).call(this);
				return null;
			}
		}
		return output.finish();
	} catch (error) {
		_assertClassBrand(_DBCSHandlerEncoder_brand, this, _reset).call(this);
		throw error;
	}
}
var _defaultCharUnicode = /* @__PURE__ */ new WeakMap();
var _fatal = /* @__PURE__ */ new WeakMap();
var _pending = /* @__PURE__ */ new WeakMap();
var _DBCSDecoder_brand = /* @__PURE__ */ new WeakSet();
var DBCSDecoder = class {
	constructor(codec, backend, options) {
		_classPrivateMethodInitSpec(this, _DBCSDecoder_brand);
		_classPrivateFieldInitSpec(this, _defaultCharUnicode, void 0);
		_classPrivateFieldInitSpec(this, _fatal, void 0);
		_classPrivateFieldInitSpec(this, _pending, void 0);
		this.backend = backend;
		this.nodeIdx = 0;
		this.prevBytes = [];
		this.decodeTables = codec.decodeTables;
		this.decodeTableSeq = codec.decodeTableSeq;
		_classPrivateFieldSet2(_defaultCharUnicode, this, getDefaultCharUnicode(options));
		_classPrivateFieldSet2(_fatal, this, !!(options === null || options === void 0 ? void 0 : options.fatal));
		this.gb18030 = codec.gb18030Decode;
		this.eucjp = codec.eucjp;
	}
	write(buf) {
		if (_classPrivateFieldGet2(_pending, this)) {
			const input = new Uint8Array(_classPrivateFieldGet2(_pending, this).length + buf.length);
			input.set(_classPrivateFieldGet2(_pending, this));
			input.set(buf, _classPrivateFieldGet2(_pending, this).length);
			_classPrivateFieldSet2(_pending, this, void 0);
			buf = input;
		}
		if (buf.length === 0) return "";
		const newBuf = this.backend.allocRawChars(buf.length + this.prevBytes.length);
		const errors = _classPrivateFieldGet2(_defaultCharUnicode, this) === "�" ? void 0 : [];
		let nodeIdx = this.nodeIdx;
		const prevBytes = this.prevBytes;
		const prevOffset = this.prevBytes.length;
		let seqStart = -this.prevBytes.length;
		let j = 0;
		for (let i = 0; i < buf.length; i++) {
			const curByte = i >= 0 ? buf[i] : prevBytes[i + prevOffset];
			let uCode = this.decodeTables[nodeIdx][curByte];
			if (uCode >= 0) {} else if (uCode === UNASSIGNED) {
				uCode = 65533;
				errors === null || errors === void 0 || errors.push(j);
				if (this.eucjp && i - seqStart === 2) {
					if (curByte < 128) i--;
				} else if (i - seqStart !== 1 || curByte < 128) i = seqStart;
				if (_classPrivateFieldGet2(_fatal, this)) _assertClassBrand(_DBCSDecoder_brand, this, _fail).call(this, buf, i + 1);
			} else if (uCode === GB18030_CODE) {
				let ptr;
				if (i >= 3) ptr = (buf[i - 3] - 129) * 12600 + (buf[i - 2] - 48) * 1260 + (buf[i - 1] - 129) * 10 + (curByte - 48);
				else ptr = (prevBytes[i - 3 + prevOffset] - 129) * 12600 + ((i - 2 >= 0 ? buf[i - 2] : prevBytes[i - 2 + prevOffset]) - 48) * 1260 + ((i - 1 >= 0 ? buf[i - 1] : prevBytes[i - 1 + prevOffset]) - 129) * 10 + (curByte - 48);
				if (ptr < GB18030_GAP_START) {
					const idx = findIdx(this.gb18030.gbChars, ptr);
					uCode = this.gb18030.uChars[idx] + ptr - this.gb18030.gbChars[idx];
				} else if (ptr >= GB18030_SUPPLEMENTARY_START && ptr <= GB18030_MAX_POINTER) uCode = 65536 + ptr - GB18030_SUPPLEMENTARY_START;
				else {
					if (_classPrivateFieldGet2(_fatal, this)) _assertClassBrand(_DBCSDecoder_brand, this, _fail).call(this, buf, i + 1);
					uCode = 65533;
					errors === null || errors === void 0 || errors.push(j);
				}
			} else if (uCode <= NODE_START) {
				nodeIdx = NODE_START - uCode;
				continue;
			} else if (uCode <= SEQ_START) {
				const seq = this.decodeTableSeq[SEQ_START - uCode];
				for (let k = 0; k < seq.length - 1; k++) {
					uCode = seq[k];
					newBuf[j++] = uCode;
				}
				uCode = seq[seq.length - 1];
			} else throw new Error("iconv-lite internal error: invalid decoding table value " + uCode + " at " + nodeIdx + "/" + curByte);
			if (uCode >= 65536) {
				uCode -= 65536;
				const uCodeLead = 55296 | uCode >> 10;
				newBuf[j++] = uCodeLead;
				uCode = 56320 | uCode & 1023;
			}
			newBuf[j++] = uCode;
			nodeIdx = 0;
			seqStart = i + 1;
		}
		this.nodeIdx = nodeIdx;
		if (seqStart >= 0) {
			prevBytes.length = buf.length - seqStart;
			for (let i = seqStart; i < buf.length; i++) prevBytes[i - seqStart] = buf[i];
		} else {
			let retained = 0;
			for (let i = seqStart + prevOffset; i < prevOffset; i++) prevBytes[retained++] = prevBytes[i];
			for (let i = 0; i < buf.length; i++) prevBytes[retained++] = buf[i];
			prevBytes.length = retained;
		}
		return replaceDecodeErrors(this.backend.rawCharsToResult(newBuf, j), errors, _classPrivateFieldGet2(_defaultCharUnicode, this));
	}
	end() {
		if (_classPrivateFieldGet2(_fatal, this)) try {
			const result = _classPrivateFieldGet2(_pending, this) ? this.write([]) : "";
			if (this.prevBytes.length) _assertClassBrand(_DBCSDecoder_brand, this, _fail).call(this);
			return result;
		} finally {
			this.nodeIdx = 0;
			this.prevBytes.length = 0;
			_classPrivateFieldSet2(_pending, this, void 0);
		}
		if (this.prevBytes.length === 0) return "";
		if (this.gb18030 || this.eucjp) {
			this.prevBytes.length = 0;
			this.nodeIdx = 0;
			return _classPrivateFieldGet2(_defaultCharUnicode, this);
		}
		let ret = "";
		while (this.prevBytes.length > 0) {
			ret += _classPrivateFieldGet2(_defaultCharUnicode, this);
			const bytesArr = this.prevBytes.slice(1);
			this.prevBytes.length = 0;
			this.nodeIdx = 0;
			if (bytesArr.length > 0) ret += this.write(bytesArr);
		}
		this.prevBytes.length = 0;
		this.nodeIdx = 0;
		return ret;
	}
};
function _fail(buf, start = 0) {
	const pending = [];
	if (buf) for (let i = start; i < buf.length; i++) pending.push(i < 0 ? this.prevBytes[i + this.prevBytes.length] : buf[i]);
	this.nodeIdx = 0;
	this.prevBytes.length = 0;
	_classPrivateFieldSet2(_pending, this, pending.length ? pending : void 0);
	throw new TypeError("Invalid multibyte sequence");
}
function findIdx(table, val) {
	if (table[0] > val) return -1;
	let l = 0;
	let r = table.length;
	while (l < r - 1) {
		const mid = l + (r - l + 1 >> 1);
		if (table[mid] <= val) l = mid;
		else r = mid;
	}
	return l;
}
const _dbcs = DBCSCodec;
// node_modules/iconv-lite/dist/encodings/tables/big5-added.js
let table$7;
function getTable$7() {
	return table$7 || (table$7 = [
		["8740", "䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"],
		["8767", "綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"],
		["87a1", "𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"],
		[
			"8840",
			"㇀",
			4,
			"𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
		],
		["88a1", "ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"],
		["8940", "𪎩𡅅"],
		["8943", "攊"],
		["8946", "丽滝鵎釟"],
		["894c", "𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"],
		["89a1", "琑糼緍楆竉刧"],
		["89ab", "醌碸酞肼"],
		["89b0", "贋胶𠧧"],
		["89b5", "肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"],
		["89c1", "溚舾甙"],
		["89c5", "䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"],
		["8a40", "𧶄唥"],
		["8a43", "𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"],
		["8a64", "𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"],
		["8a76", "䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"],
		["8aa1", "𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"],
		["8aac", "䠋𠆩㿺塳𢶍"],
		["8ab2", "𤗈𠓼𦂗𠽌𠶖啹䂻䎺"],
		["8abb", "䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"],
		["8ac9", "𪘁𠸉𢫏𢳉"],
		["8ace", "𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"],
		["8adf", "𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"],
		["8af6", "𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"],
		["8b40", "𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"],
		["8b55", "𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"],
		["8ba1", "𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"],
		["8bde", "𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"],
		["8c40", "倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"],
		["8ca1", "𣏹椙橃𣱣泿"],
		["8ca7", "爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"],
		["8cc9", "顨杫䉶圽"],
		["8cce", "藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"],
		["8ce6", "峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"],
		["8d40", "𠮟"],
		["8d42", "𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"],
		["8da1", "㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"],
		["8e40", "𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"],
		["8ea1", "繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"],
		["8f40", "蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"],
		["8fa1", "𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"],
		["9040", "趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"],
		["90a1", "𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"],
		["9140", "𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"],
		["91a1", "鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"],
		["9240", "𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"],
		["92a1", "働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"],
		["9340", "媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"],
		["93a1", "摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"],
		["9440", "銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"],
		["94a1", "㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"],
		["9540", "𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"],
		["95a1", "衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"],
		["9640", "桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"],
		["96a1", "𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"],
		["9740", "愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"],
		["97a1", "𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"],
		["9840", "𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"],
		["98a1", "咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"],
		["9940", "䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"],
		["99a1", "䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"],
		["9a40", "鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"],
		["9aa1", "黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"],
		["9b40", "𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"],
		["9b62", "𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"],
		["9ba1", "椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"],
		["9c40", "嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"],
		["9ca1", "㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"],
		["9d40", "𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"],
		["9da1", "辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"],
		["9e40", "𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"],
		["9ea1", "鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"],
		["9ead", "𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"],
		["9ec5", "㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"],
		["9ef5", "噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"],
		["9f40", "籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"],
		["9f4f", "凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"],
		["9fa1", "椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"],
		["9fae", "酙隁酜"],
		["9fb2", "酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"],
		["9fc1", "𤤙盖鮝个𠳔莾衂"],
		["9fc9", "届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"],
		["9fdb", "歒酼龥鮗頮颴骺麨麄煺笔"],
		["9fe7", "毺蠘罸"],
		["9feb", "嘠𪙊蹷齓"],
		["9ff0", "跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"],
		["a040", "𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"],
		["a055", "𡠻𦸅"],
		["a058", "詾𢔛"],
		["a05b", "惽癧髗鵄鍮鮏蟵"],
		["a063", "蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"],
		["a073", "坟慯抦戹拎㩜懢厪𣏵捤栂㗒"],
		["a0a1", "嵗𨯂迚𨸹"],
		["a0a6", "僙𡵆礆匲阸𠼻䁥"],
		["a0ae", "矾"],
		["a0b0", "糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"],
		["a0d4", "覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"],
		["a0e2", "罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"],
		[
			"a3c0",
			"␀",
			31,
			"␡"
		],
		[
			"c6a1",
			"①",
			9,
			"⑴",
			9,
			"ⅰ",
			9,
			"丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
			23
		],
		[
			"c740",
			"す",
			58,
			"ァアィイ"
		],
		[
			"c7a1",
			"ゥ",
			81,
			"А",
			5,
			"ЁЖ",
			4
		],
		[
			"c840",
			"Л",
			26,
			"ёж",
			25,
			"⇧↸↹㇏𠃌乚𠂊刂䒑"
		],
		["c8a1", "龰冈龱𧘇"],
		["c8cd", "￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"],
		["c8f5", "ʃɐɛɔɵœøŋʊɪ"],
		["f9fe", "￭"],
		["fa40", "𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"],
		["faa1", "鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"],
		["fb40", "𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"],
		["fba1", "𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"],
		["fc40", "廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"],
		["fca1", "𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"],
		["fd40", "𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"],
		["fda1", "𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"],
		["fe40", "鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"],
		["fea1", "𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"]
	]);
}
// node_modules/iconv-lite/dist/encodings/tables/cp936.js
let table$6;
function getTable$6() {
	return table$6 || (table$6 = "A.A.4iQq1WCQEIOCEEICCCCIGCCGMGCEMCCECCCEKKCEIMIECESGECOGCGCGCEGCCCCEKKGCIEECCCCCECCKCCUGCCCEECEEEECCCCCCCCCCMCECCGCIECICCCGGCCCCCAECCCGCCCEGGCCCCECECCCCCECGCCCCCGCCEACCCEGCCCEACCCGIECCCGCCCCCIEOGGCEECGCECCEEKGGCCECECCACCECCCECEMKGCEEMCCCECECCMCKCEECCACCCCCECCCCECCCCOMGECCCCCCCCCCCEGECCEGECECCCCGECCCIEGGCCOECCIGECCCGCGACCCCCEEECCCCEMCCICEIYKGCECGQGCKCIKEEEECCCCCECQECCCCGIGCCCCEGCGGCAEQCCECCCICIUCEIMEECECCECGCCCGCCCICCCECECECECCICGIECKKCCCEECCCCCCCCEECEICECCICGCECCEEAECECCEECEECCCCCGCGCCCKCCEEECCCCCCCCEMCCCEEEGECGACCCGKCGCCCCCMCQCCICCCEEAKEECKECCECCCECECEGCECCCCGCCCECCCCCCECCCCACECCCCCECECCCAEEEECCCCCCECCCCCCCCCCGECCECGGCCICECGCECKCCCCECECIGCCEECCGAIECCCCCEKECECCCCCCCCOCCCCCECCCECCCCCECCACCCICCCECAECCCECCCCCCCECCCCCCECCCCAEGOCKECECCCCEGGECCCQOECIEGCICCEGCECCCKCCCCECCGCCECECCCCWCIICCCECEECECECEECOECGCCCECCCCCCCCGCCCCCAEECCCCCCECECECGCCCCECCCCCACCCCEEKCEICEGECCGGMEECEGCECECCEGCCIECEEGKECGGCCKCAEGCCCCCECOCECCCCECEGECCCECCCEICECCEEECCCEGEMCCCGCCCCECCEICEIICECCEECCCCUACGCGCGEOCCECGCCCCCECGOECCMCAECECCCECECCCGCECCEEECCCCEEIMECEECEGCCEEECCACCCCCCCCECCCCCCACGCCCCCEECCCCCCSIECEECCCECKCGIICCCEQCCCCGCEGIEIECECCCGCCOGCGOCEKICEEIEGCCCESCECCECEECMCEGCCECEECCICGCCCCECIGCEECCCACCCICCCECECCCCCCICEEEECEACCECCCCCKCCCCCCCCGCECEECCCCGCCECCCCCECCEACCCCCCCCACCEGECECECCCECCEECECCCCCEECCCECCECCCCECECIEECECCKMECCECCCEGCCECECCCGCCCCECMACCCCCCGCECCCCCCCECECCCCCGCCCGCCCGAICCECCCCCCICCECCCECECICCCICGCEECCCECCCCCCCECGECEECECICEMGGCCCCCGECECMECCECCEEGGOGCCEGAUCCECCECCCCGCECCACCCCCCCCCCCCECECCCCECCECCCCCCCCCCCECCCCCCGCCCCICECEECCCCCCACCCCCCCECCCCCECCCCCCCECCCECCCCCCCCCECCACEKCACCECCECCCMCCEIEGCECECCGCCECCCCMCCCECCCCCGCGIICECKGCECCGEECECAOCGCCCCCEGEECEECCCCKGEGEKEECCKACCICCEICIKCCCECCCGCCCECGCCICCIEGIECCCCCEECECCCECCCGCKEMECCCEIECCEEECCECCCCCECCGECECCEGCCCCCCACCEEECCCCCCECECECCCCCCCCECEECECCCCGCCKGEACCCCCCGCCGCCCCCCAECCCCCCCECCCCCCEGCCCCCCCCCECEAECECACCCCCGEECCGCECCGCEKCCGGICCECCCIGCCCCECCEGCGACCCCCCCCGCECCCCCCCEECCCCCCCECCCCCCACCCCEKCCCEECCCCCCEECECCEICECCCCEECIICECCCC5thB50XihBHhiB01XCl/Hy0vDz0vDefEs/HdMRj2XqC+B8zQhBxBH0BFlC8C9B0IjINiP1H/GEkDtBLZjCkEaZxEsBF6gCHj5Si4P+MggvDjm/D2z/Dl7vD14P8mQ+uCF3DGFRFtCFkBFx3CsVHC+nHpqH8wBxCxCs7G1sIq5uDiOjOqIn6nDat2WCOC2m9DEIJEVNRCri9DrBoBA2B5BtYayzOCee+MG4I2HSG8CmBuFgpBaAGsCoCmCr3B43GU9xXjC4O/OkD3CiDpDkE/DkOrOgG3F8NjOwHlHyN5N4NCCCjOnBsW9QGwRmqXzQynB0OYEkCSEE0llDibCpsvD+wIliJ2uIlGgGzPsJ06mDCCACrmnDxwFg5mBCEESEGCCCCCGIECICCCGEACCCCCECACCCCCCCCCCCCCGECECCGCGCCCCCCC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.gICCGCCCGCCCECCCCCGCCCCCCEIEMCUOCCCECGCCGCIGCCECGCCECGCCGCCCOEKECCEGCCCCCCKEMCCCECCEEECICGGCCCCEEGCEECCCKSGIGKCCCCECECCICGYCCECGCECGCCWCCIGGCKICQMSGEIEIqBCCEKOCkBMGWIICKUCEMc6BCCCCGEGCKEEECCCEEEEIECCGCCKECGEGCCCECMGCEEMCCECCCECEEGCEGGCCCEECCMCEECEGCEGCCIEUCCKOEOCIGUGGCCICGCMIWQGICICICEECEGGUECCCCGCCECCCCCECCCIECECEKECECECCIOIGCKGECCGECCCGCCCCCGCCECCCECCCEECCICCKCCCQCEECCCICCCECICCCCCGECCCCECCCKEGMCCCICKEMICEECCCGICCCCEKIKIEECMECCEGCEGECOSCCCCCCKGEGCKCCCCCEECCKCIEECQEEGEIGCCECGYKEEKCGIIIQOGeWOIaSEECCMCEEGEGCCOUEGICEKECCIECKEECCCCGEGICIKOICCCCGCGSOEECEECGQCIGEECGGCGGGICEKKIQMOGEGKMKiBCCCGGKKGQkBIGWGcMCCEEEQCEKCIECEICCCCEECICECECECKCEaCCGGCCEIECIICCEEMCEOGIECCKCEGYCGCCEICIGEECGOCCKGKEUIMCIESEIkBOcEKCEKEMEKCCCGGCEECKuBY0BCEQOQCCCEECGCCIEECCCEGCCCGIECGECIGCSCEEKCOECECEICECCCICCIIEGEEEGGICCCOCOICKGEECKKCGCCCICCEMMMOECCEEUKCEMKCIEKCCGKQQEWECWCEIasBGGsBaOaCEECECEKECCGEECQKEKEICMOKEEeCCCCGCEGCCCCIKKCIOGMEIYCSCEGGCGCCCCEGICECCOCGeCCIGCCECECGCCGCCGCECEIMCEMCIKEECGGEEEECEGEECCEEECECEGGKKECOCECEGEIECEECCCEIEICCGCCEECECCCGEQGKGECCCKCECEKICGKIIECGmBOCCCCEGOIIOICmBEKCOSEUMGKCKCiBcSMCCECGCCICCIEKCGCEGEOECEEEECGIMCCGCEEIGGCCECCCCCEECECCCICIIEIGCECGEMEICECIQCGCGEIEICICCCGCOCCCCCEECCCEGCEGCGOCCKEICCCICEKEEMCCGCGCMKECCECOCGKQCGUOCCSEEIKIECICCCGCEOCCIEGGCCyBQQKSGKEICCEKEEECGECCGEIGCCEeGGCGCCECECCCCCQEGCICEGQCEEIEKCEGCCGGGCICICCEKCECOEECCICECCKGCEGGCEIIIKSKKII0BCQEMCECECGICEGCGCCMCCCCEIEECECECCEKCGEECCCCICCEECCIICCCGCCCCCECQCUGCCCEGEECQCICCCCEKGOOGECCCCCCMICQCSCCQGGUGICECGOCMCCIEECKEUCGGCIGKCCCYGQEGIGCEiBEEECEEIEEKEGCCCGMEEUECGEEGEGQCCCGMGYIUCUYMCMCICGOKEQOCKGWOEGGSCKQMECmHEOGICGIECEYQEcCICCCIEGKQQCOCEKCCECCKQGGCGGOKCCCGCCCGCCEIEGCKGCCEEGKCCCEGECCEEEICGCCCCEICIGCGECEECCECECCCEEEGCGICEMCEEECGCECCCCCICCCEEEGIEGKEEECECKCCCEEEEMGGIICGCECICECGCCQICCECEEECGCCCECCECQQICCEGWEeGCEKOGEEECEICCCECGIGGCCCEGCCMIIQGEKGUGICCCCEOIGGCUGCGGMGCGCCOGEaIKWEEMCMOWCIQiCQOOUGkBEcYCICGCIGGGCEEaCCGCEICaCGICCCOCGWKECCWQGCcICCaCKCKGICEMKIIGKOGMCGSUKUICMUYoBEUCCGGCCCOGIGECCCCGCIEEGGEKCCEYYCGCOGICCICEGCCCCCCCCCCEEEQEECCCCECCCCCCCCCCCCCCCCCCCCEECCCCCCECCCECCCCCCCCCCCCCCCCECCUoBoBUUYGCyFCmFsFiBOiBOEEEEIEECEMC0BMC0BECCCCCCCICCCCECoCOQGEICCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCqCSCEGCCCECCCCCCCCEECEUISKIC4EECMEECICMGICGEEGCEEEISIECIQWCEYKECCEEIIGEMCECGEICKECOICICCGIKWCEISMECCCCCEKIYOCCCaEKGGCCGGECWCQgBaUSCCCCOGCCOIQCCCICEKECCCCCECIEECIIQGOCGKGECGGCCCCECCKCEEGCEICCEEGCCIEIEECCEECGICCGCCECEEEGCECOMCKCIOGQECGCCEEECEEEQSECUECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCEGKQCCGECEEECCWICGCECCKCCGCGQQCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCICCEYGGMEYCECCCGECKCCaSGKCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCIECIMEGCCCCCGCCEEGECCICICCCEGEYQIOCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCEECGCECCCCQIIEGGIGGUIGKCEEMGOCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCMUKeKCCICSEECCCCICOCKEIIGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCOYWKCCCEECCGEEMGCCCCCOECECEICKEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEeGCCCMUKiBOGCICCCIGEGCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECGKWWUEIECMCIKECGCCCGCEGCECGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECICCCMCCCECCCCCECWEECCCECIOEGCIGGGEGQGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCIICKEGGGGEKICQGEMGKMEaMCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCUqCMUCOECGECIGEKECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEGCCCOCEEOMQEcMeCIGGOCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCuDQiCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCaO2CiCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC+DCKKsBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCoCwBGCCECCCCCCCCCOCUECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCICKGECIIEQCCKKECEEOCKECCGICCKEMECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEICCOGCIECCEGCEMCCECCEEGICGCcMYCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCMECCCCGCCCEECCKOCEECCCCCCIGECCCCCGaECGCKCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCMCCGCGKICCGCEICKCICMEKECCQMIEGCOCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCeGECKMCCCKECCMCCICCCCECIECCGQCIQCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCICIEECGCCCIECCECCEGEEECCCECCIGCEECCKECCECEUECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEECKCKCCOEOEIGIECCOGCCCEGCECEICCGCGGGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEKGGCCICMGMQMGQGOKCICKCGCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKICCQCEIaECGECCEIEECECKCECKGWEGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCSICGEICSUKIWEIKGSCIEGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECOWOGCGMCOOKECMOIeCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEGKWIgBCcGIYEKGGQCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEOOKCMKECEEGKGCCEEGCCCIIGCGICCGEICCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECGIEEEGEOECIGCMEQCGCIGCEECKGOKCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGECGCIEEKGKOIIIGUIIMQCIKCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCcMEGGMMECOECCCCIGECCEECIGKKCMCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGKIIEEIGCEKEEOCGECGMCKCKKGIIGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCSEyBMoBCECCE2BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC+BCCGGCCICIGGOKMsBCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCgCSsB0BOCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCQQ+CiCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCmC4BE+BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCgCK0ByBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCSICEQIMOOIOEECCOGqBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC+DiCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCeCECCCGCEESEIKEUECaCECCCGCICCGCCCCCECECECCCGCECECECCCCCCECCCCCEGCCCCGCCEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECGGCEGCCCOGCEIQEKCCCGGECCCEKMYEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCKECGCOGOCYEEOQWsBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCC+DiCCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCiCCCCCCGICIIEGECCKCCECECCCCEGGEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGMKCECECEKCGEMCEIKOCCIEKCCCCCCGEGCCCCEECECCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCECCCCCCCCCCCECCCCCCECECCCCCCCCCCECCCCCCCCCCCCCCECEGCGGGGECCIGIGCoBGCGWCOSCCCGCCCCCCCCCCCCCCCCECCCCCCCECCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCECECIEEEGCCCGKCCCEOMMEIICWCCCUSCCCCCCCCCCCCECCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCC+DiCCCCCCCCCCCCCCCCCCCCCCCCCCCCMCCCCCCCCEGCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCECCC8CiBQyBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECCICCGECCCCCCCCCCCCECCCCCCCECCCCCCCCCCCCMyBgCiCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCoDWgCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECmC4B8BGCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCCCECCGEECCCCCCEQuDiCCCCGCECCCCECCEECCECGEECECCCCCOIKCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCe4CIqBCCCCCECCCCCCCCCCCCCCCCCECCCECCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCEQ2CiCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCECCECECCCCGECCECCECCC4BCCCCCCCCOGEICCCCEGEGGCCECKCaCEGCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECCCCEECCCCCGICCCCCECCCCCCCCCCGEEUQEEEECECEEEUOCGGECICECGGEKCECCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCICCCCCCCCCCCCECCCCCCCCCCCCCCECCCECCCCCCCCCCCCCCSEECKImBEECECEGQCCKQKCGCGKCCCCCCCCGCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCEEOCCEC+CECKCwBCCCCCCCCCCCCCCCCCCCCCCCCCECCCEGCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCECCCC+DiCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCGCCEECCCGECCCCECCKECCOGGCCCGCEECMCCCCCCsCECEGKE+BCCEGCCECCCEEGKCCGCECCECGCECCGCCEGICECESCGCCCCCCCCCCCCCCKE6B2BUaCCCECCECCCCCCCCCCCCCCCCCKCCCCCECECIECCCCGCCOCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCWEgDiCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCC+DiCCECCEEEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCkBCCCEECCOICCGEKICIIECIICCSCOGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCMGWGWEQICGCCEMiCCCCCCCCECCCGCCCCCCECCCCCCCCCCCCCCCCCECCCCCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEC+DiCCCCCCECCCCCCCCECGCCCCCCCCCCCCCCCECCECCCECCCCCCCCCCCCCCCCCCCCEECCCCCCCCCCCCCCCCCCCCCCC+DiCCCCCCCCCCCCCCCCCCCCCMCCCCCECCCCCCCCCCCCCCCICCCGEEMKCEQIIE+DCECEECCCICCCCCKEEEEKGGECCCCECCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCECCECCCCCGCCCCCCCCCCCCCEC+DiC+DiC+DiC4BCCCCCECCCGCCCICECUCCIEMSCMISGECKIGCEGECCECCISCCOKCCEGCMCSEEKCCCKWuCMEYGKCCCCCICECGEG.A+rgCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAACAAAAiEAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKMAAEEoKAAAkK6K0KAQAOAAAAEAAC2KAAeAA8EAAAAAAAAAAAAAAAACAAAAAAAWAAAAAAAAAAAAAAAAAAAAAAAAAACACIsFAAAAAAAAAAACACGAAAAAAACAaagFAAAAAAAAAAAAAAAAAAAAACAAAAAAA+JAAAAAAAAAAAAAAAAAAACAAAAAAAAAA+JAAAAAAAAAAAAAAACAAAAAAA+JAAAAAAAAAAACAAAAAAA+JAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAA+JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAA+JAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsEAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiECAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEC+JC+JC+JAAAAAAAAAAAAAAAAAAACAAAAAAA+JAAAAAAAAAAAAAAAAAAAACAAAAAAAAAA+JAAAAAACAAAAAAAAA+JAAAAAAA");
}
// node_modules/iconv-lite/dist/encodings/tables/cp949.js
let table$5;
function getTable$5() {
	return table$5 || (table$5 = "A.A.k41CCIQKCCEGAECCCCCACCECECEIICCEGGCEEGCCCCCCECECCGCEECCCECCACCCCEECCECCCCCCCECIGCEECCECCECCECCCCECGECCCAECECAECECGCCCEGCECCEGECGCCEGECACCCCCCAECCAECCCECGECEECCCCECCECACGCECCAEECCECCCCECECCCCGCCCECCECCGCIAEKCGCCEGEACCCCAEECEEGGCCEGECCEECCCECCCECCGCCACACCCAECECCCCCECEECCCCCCCCEAECECAECGECECCCCAECCCECCCGCKGKGCCEGCGCEEECCCCECCEGCACCECCAECECCECCCCCCCCCCCCECCAECCECCACCACCCCCCCCCCCCCECECECCCECEAEIECCEGAGCCEGAECCEEGGCCEGCCAECCACCCACCCECCECACACCCAECECEECCCCECCCECCECCEIICACEGECACCAECCEGGCCECCECCEGCCCCECCECCCCACACCCCAECCCCCCCCECCECCCCCECCCCCECCECCECCAECEEAECCECCECKECECGCCEIECCECCCAECEGCCEGECCGCCAEECCECCCCECCCCCCCCCACCGCIECCCEACCCCCACCCCCCCCCCCCCECECEGCCKKECCCECACEGCECACECECECEECEEGECCCGCCCGCCAECCCCACCACECCECCECIECCECCCCAECCCCACCCCCECCECECCCECGECCCEGGCCEGECAECECGCACEEGECCECACACACECCCCCCACCCCEAECCECCEEIEGCECCEGECCECCCCCCCKEEEGCECCEGECCEGCCCACGCCCECCCECCCCCCCECCCECECCECCECEAECCCECACECCCCAECCECCECCCCECEECCECEGCCCEECEEAGCCEEACAECCCEECCCCEACECECECACCACCCCECECCECCCCACCAACECCCGCCCCECCECCEGGGGEECCEGECCCECCCECCCEAEIOCCECCECCAGCCEMICCEEECGCGCCCECCEGECCCCECCECCECCECCECGECCEACCEEECCAECECCECCECCECCCECCCECQCCCCECGGICECGCEIECCAEGECCCCCCCCAECCCECEECCECCCCCEECECCCECGGCCCCACEACCCECCECACECGE/wsC50X62P/3P01Xv1Xu2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.gIEEKCEGOCGGEGUCMCEGmBEECKCEGGOCMCEOCGEGGQCQEECCECCKEGCKCCEIGGQEMEGOCCMGGQCQEEICCKEGWMkBQEGOCQGGmBEEMCCMQmBEECEGCCGCCGCKCGEEGOCMM+CCGOCMESEECMGGSCIEmBQECCOCCIMWMmBMGGOGM2BEECMCCKOKMMEGOEOGGOU2BECCCICCG8BEGOCCMCEEGCCCEGOCMCCGOIWuBCGCICKEGOCMEGOEEGGuBEGCKCCIGGCUgBmBGGCMCQEGQCCMEEOCCMmBO2BGGOKKMOGKCEGKCCGCGGGgBEGCKCCICCEGCGEGOCMuDCECICCCECEGOCMCEGWMGCsBEECCGCCCCEGGmBmBOGGOCQgBWEGOCCCKmBEKoBMGGQCCMGGOIMEECKCCM2BEECMCKEGOCCIEGOCSqDEGCICKEGOCMmBmBgBEGKOMOMa2BGmDEGMIiBiBSkBGGEKGkCEEOCQGGOUGGOCCMEGOCGEECOCMESKCoBcEGOCKEGOCCMEGOCMGYCQEGOCCMGQQkBQOGGKECCMGGQCCMEGOCCMmBO2BEGOECMEGOCCMEGCMCCEgBaEGOCCMECKCCECEGOCKMYkCEGCICCCIEGOCMEGUCIMqBCGCKCCMGekCGGQCCMGGOCCQCEKCCGCECGQCQKsBGGmBGGOEQGGOEoCEECKCCCEEICCGEECEOCGEESGsCEECKCCKEEOCMEGQCGEGuBCGCMCCMGSMOaMOEGOUGuBEEKCCGCOWOyBEEGYMCEGOECMEGOCoCEGCKCCIEGCKCKEGOCMcewBEEOEMSWMcCkCEGOG6CiBSkBQYMEGOEC0FGiBMGGOgBsBEGOCCMCEKCGEEGOCMEGOCCMGGOIMECICICEGOCMEGOCMGGGSMCGCKCCGEEGYMGGOEOGGOCQEGOCCMEEGICCCCCiBEOEGOICKEGOCCMMOECMEGMCCkCEEMCCICCGOEEGEGOESkBQ0BEGCKEMGGmDuBCCECKGMEMSOUSOGGOU2BEGOGMmBOacGS0BSMEGCIUGGOWEGOCCMECICGCEGOCMEGEICCGCGGQUCCCKCCCEGOCCEICGCIGGGOCOEGCECCCIEGOCMEWECMEGOCCMEGOCCMEGKCCMCCGOEMEGEKGMEGOCCMEGOCCCIEGKCCCGGOEQEGICGCECCKCKEGGICMECCOIMGGcKEGCKCCKEGOCCMGGOEM2BEGCKCCGMQCCGGmBIEGGOCCMECeMEGKCGCECCCCCCCEEEUCCCCECCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCEECECCCCECCEECCECCMmBOmBQEGOCQGCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCECECCCCCCCCCCECCCCCCECCCCCCCCCCCGOWEGOCCiBiBEECKCCEC2DCiCCECCEICMEGIGCMGaG6B8FKEGOCMEkBMEiBeUUiBOiBOoBEGCMCCCIMOIOmBECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEQKGGOQuBGGEGOGMQGCCCIUCGCECEUKMKCEGCCGCICCCCCCCWemBOoBYCCCCCCCCCCCCC4B0BeCECCIeWIECmBeEGOGECCCCCCCCCCCCCCCC4B0BeCECCIEECCOCKEGEKCMGCCOEE8BmFIEGOCMECEOCCMGMSOGasFGMEGOCCGGGGYK6BGMC0BMC0BGOCCMQOWEGGICCMmBCMGiBMGGOCCKCGGOIMEGGICCoBcEEMCCMEGOCCMEGCMCMaMoBcEEOCMECIQKCCEGECCCCCCCECECEIICCEGGCEEGCCCCCCECECCGCEECCCEGOCCMGGOCMYeEGOCCGECCCCCCEECCECCCCCCCECIGCEECCECCECCECCCCECGECCCECECECECGCCCEGCECCCGEGOIMCmBMCMmBOCGECGCCEGECCCCCCCECCECCCECGECEECCCCECCECCGCECCEECCECCCCECECCCCGCCoBEGCMCCMGGMMMoBCECCECCGCIEKCGCCEGECCCCEECEEGGCCEGECCEECCCECCCECCGCCCCCCEMEGOCCMGGOWEGOGmBCECCCCCECEECCCCCCCCEECECECGECECCCCECCCECCCGCKGKGCCEGCGCEEEeEGMCCCMEGMCKCEGOCMYCCCCECCEGCCCECCECECCECCCCCCCCCCCCECCECCECCCCCCCCCCCCCCCCCECECECCCECEEIECCQkBgBEGCICCMEGOCCMGCEGGCCEGECCEEGGCCEGCCECCCCCCCCECCECCCCCECECEECCCCECCCECCECCEIEcOGEqBEGOCCICGeECCEGECCCECCEGGCCECCECCEGCCCCECCECCCCCCCCCECCCCCCCCECCECCCCCECCCCCECCEQkBSGcCMyBCCECCECEEECCECCECKECECGCCEIECCECCCECEGCCEGECCGCCEECCECCCCECEEGOCCMIeOIuBEGICCCCCCCCCCGCIECCCECCCCCCCCCCCCCCCCCCECECEGCCKKECCCECCEGCECCECECECGGMGGOCGMEECKCMEGGOUEGEEECEEGECCCGCCCGCCECCCCCCCECCECCECIECCECCCCECCCCCCCCCECCECECCCECGECKCCMCGCKCECEEGOCMIgCCCEGGCCEGECECECGCCEEGECCECCCCECCCCCCCCCCEECCECCEEIEGCECCEGCkBEGGICMEGOCCCKGGOEMMCCCECCCCCCCKEEEGCECCEGECCEGCCCCGCCCECCCECCCCCCCECCCECECCECCECEECCCQCQEGGICCMcM0BCECCECCCCECCECCECCCCECEECCECEGCCCEECEEGCCEECECCCEECCCCECECECECCCCCCQGeQGGQCGKEECKCCMSCECECCECCCCCCCECCCGCCCCECCECCEGGGGEECCEGECCCECCCECCCEEIOCCWemBGGCMEQGGOECECCECCGCCEMICCEEECGCGCCCECCEGECCCCECCECCECCECCECGECCECCEECMGGOCM0BIEGOCCMEGGCCCECECCECCECCECCCECCCECQCCCCECGGICECGCEIECCEGECCCCCCCCECCCCECCMEGOCEIoBEgCECEECCECCCCCEECECCCECGGCCCCCECCCECCECCECGECCCCCECCECCCCCECCECCECECECEGCKCCMEGEKCCMEGOCMGGQUEEEECCCCEGECCEGCCCECCEGCCCCECCECCCECCCCCCCECECCECCECCCCCCECCEEGCCCECGIECCGEEGKKCMEYECMEGQCCMEGECCEGCCCCCCECCEGECCECCCCCCCCECCECCCCCCCCCECCCCECCECCCCCCCCCECCCCCCCECCECCCGQCQEGIEECMGGKEIMEGYGECGECCECCECCECCEGECECEEGECCECCCCCEGCECCECCECCCCCCCCCECCECCCCCCCCECCGEGOCCMECEOECMECKCCCGEGGOGMEECCCCCCECCECECCECCECEEGECCEGCCECCCEGECCECCCCCCCECCECCCCCCCCCCCECCECCCCGOCCMCECCECCCCCCECECECCCCEECCECCGCCCEGCECCEGEECCEGECCECCCCCEECCCCECCECCCCCCCCCCCECECECCCCCCCCCCCCCCCCCCECECCECCECCCECCECCEGCCECCCECCECCECCECCEGCCCCECCCECCCECCCCECCCECCCCCCCCCCECCCCCCCCCCCECCCECCECCECCCCCECIECCCCCCECECCECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCECCCCCMCKCICCCECCCCCCCCCCCGCECCCKCCCCCCCCCCCCCCCCCCCCCCGCMCWCECCCECECQCCCCMCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCGCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCGCCCCECCGCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCCCCCCECCCCCCECCCCCECCCCCCCCCCCCCCCECCCCCECCCECCCCCCCICCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCICCCCCCCCCCCCCECCCECCECCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCCCCCECCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCC.isgCAAAAAAAAMAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAMAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAAMAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAAAAMAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAAMAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAMAAAMAAAAAAAAAAAAAAAAAAAAAkEAAAAMAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAAAMAAAAAMAAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAMAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAMAAAAAMAAAAAAAAAAAAAkEAAAMAAAMAAAAAAAAkEAMAAAMAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAMAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAMAAAAMAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAMAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAMAAAAAMAAAAAAAAAAAAAAAAAAAkEAAAAAAAAAAMAAAAAMAAAAAAAAAAAAAAAAkEAAAAAAAAAAAAMAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAMAAMAAAAAAAAAAAAAAAAAAkEAAAAAMAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAkEAMAAAAMAAAAAAAAAkEAMAMAAAAAAAAkEAAMAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAMAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAMAMAAAAAAAAAAAkEAAAAAAAMAAMAAAAAAAAAAAAAAkEAAMMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAMAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAMAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAMAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAMAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAMAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyFAAAAMAAAMAAAAAAAAAAAAkEAAAAAAAAAMAAAAMAAkEAAAAAAMAAMAAKOAQAwEAAAMAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FAAAAMAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiFAMAMAAAAACCAAAAAAACAAAAAAAkEAMAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAAMAAAAAAAMAA6EAAAAAAAMAAAAAAMAAAA0EAAAAAAAMAAAAMAAAAeAA+EAAAAAMAAAAMAAAAAgKAAMAAAAAAMAAAAAAAAgKAAAMAAAAAMAAAAAAAAAgKAAAMAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAMAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAMAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAMAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAMAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAMAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAMAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAMAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAAMAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAMAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAMAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAMAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAMMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAAMAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAAMAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAAMAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAMAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAAAAAAMAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkEAAAA8EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
}
// node_modules/iconv-lite/dist/encodings/tables/cp950.js
let table$4;
function getTable$4() {
	return table$4 || (table$4 = "A.A.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.gICCECCCCCCCCCGCICCCCCCCCEECCEEEEEEEEEEEEEEIEEECCCCCCCCCCCCCCCCCCCCCCCCCCCEEEGCCCCCCCCCECCCCKCECCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCGCGCCECCCCCCCCCCCQCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCGUUSCE0BsBIiBOiBOW0BCECCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCECECCCCECCCGCECCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCIECCCCECECCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCECCCCCCECCCCCCCCCCCCCCCCEICCCCCCCCCCCCEECCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCEECCCCCCCEECCCCCCCCCCCCCCECCCCCCCEECCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCECCECCECCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCICCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCEECGCCCCCCCCCCCCCCCECCCCEECCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCECCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCCECCCCCCCCCCCCECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCCECCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCCCECCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCECCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCECCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECCCCCCCECCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCECCCCCCCECECCCCCCCCCCCCECCGCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCECCCCCCECCCCCCECCCCCCCCCCCCECCCCCCCCCCCECCCCCCCECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCECCCCCCCCCCECCCCCCCCCCCCECCECECCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCECCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCECCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCGCCCCECECCCCCCCCCCCCCCCCCCCCECEGCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCECCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCECCCCCECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECEECCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCCCCCCCCECCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCECECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCECCECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCECCCCCCCCCCCCGCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCECECCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCECCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCEECECCCCCCECCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCECCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCECCCECECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCEECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCCECCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCGCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCCECCCCCCCCECECCECCCCCCCCCCCCCCCECCCCCCCECCCCCCCECCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCECCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCECCCCCCCCCECCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECCCCCGCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCECCECCCCCCCCCCCCCCCCECGCCCCCCEEECCCCCCCECCCCCCECCCCCCCCCCCCCCCECCCCCCCCCECCCCECCCCECCCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCECEECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECGCECCCCCCCCCCECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCECCCCCECCCECCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCECCCCCCCCCCCCCCCCCCCCCEGCCCCCECCCCCCCCCCCCCCCCCCCCCECCCCCCCGCCCECCCCCECCCCCCCCEGECCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCC.gswCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAiEAAAAAkCAAAAiC8FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAisBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
}
// node_modules/iconv-lite/dist/encodings/tables/eucjp.js
let table$3;
function getTable$3() {
	return table$3 || (table$3 = "A.A.iu/Dh6nDywnDCphnD8hnDG/BvmnDz+X2o/Dzp/Dqp/DoKrKnknDlG5JytPztPoPxuIN8vvD4CiC1zuDszuDvzvDFdE0uvDtvnDqynDC6BCt1nDyvnDC7l/DqC+Bqi/D9ruD2ruDCzruD1EqB6gCHj5Si4P+MiuvDlO2N7NHEGqB1n/D81SF3DGFRFtCFkBFUFl4Cs9HjoHHC+nH5gHE0HN1FFHy7uDjhvDC2CE4BoI4GjRIyFhBuBlFkCjCuBXlQ5P8jDHJ3kD52PwzSgysDOM1xnDat2WCOCsErBoBA2B5BgrQCSGOLOeTeO5DCWGOLWeTee5CcRcOnCkBZkBSnOpxB+9ItDa0CtDcrCkD0BK3EwBJO8BhBgGjBoDpCvC/1BC1wHsrJ7qJk4IxHMoUFF3yIcvDE9BQ0ItIF+J3IbinWynD4uC2jeh4gB0lG4gBnzE2ib96F1V7sEv6MszBmkFzjEwnPjc80Mn2Z72IynHjzBvtD5c0qWwnJn5N2F+8Oz3cwoNuhG/yW2yBmlC64Bgb83Wqc/jY3mMoCkE+E2KwqDokB4J4CugBqtC+CgGkqCivBo7DopCgC0oCi7BiEmtB00BolC8pBk1CoCh0evqCeyzEktU8gIn9LhvVgvFg7Kq5QvgLqvE9Jm6M/ulB8iB4UmC8f0xByxC49cxwVwvJwkCozIa+C0Vj/hBzBm5Du0K6uHogIqyD13hB4+kBnqR1qWioVw2Ev9J/gMrRwhL4/MgyLvlhB7jD47Mq3DkrQ90fl7Dy7gBsqDp6J47K5yiBody3CgkC8qDkNgRmjC0LqDizD4mBq4Bq+Op0Ky2CogB4oE5zSw/D8R0vRhyc0lVwoBuiEriWl+KxiB24C6RmR+mBi0BiTg4B0E0sEolByXqIoE2HyWisFonC0FqsBwsF0f+rFnriBk1G6pD0sE7yRozDsD0hD2F+tB6zB+iC4P4Is9DqjGo5Eq9J/BqbpihBo/HouLxnZs0F02C+gQj1M0+EzgSga63BgvG+7GqiGm6Oz+kB0wCziCsGzBmG/C4yB8UyhBqwBiboP0C++O30JoRyBq5BsWu7Bs1B08CgD6H0UyyDyCwCkHuH7Bk5B20B1oa8nb6zBuG+sDrpIvsbmyGwyCukIiuByqGuNgkCi8CogF6kBiM3wlB8EwsdtwZ2W+HgjD+O8DyGnD6WiE6LwmBugb5taykBssCwvB2tCyT8uD+yCm1Ci5GkQl/E7qd4MulDpmC+vDkWilCyhE4iC6tF6jG24B0hBozEgxD70W2jWhtJvzX2lI8sP+zF54fmgCpoB8sF6gCudk4BLk4Bs7Du0Cgb8yHuDw5BuZyeqrCgPoNpge4UysG+sXprao4LtvImF1cs1Z/qW9uO0yBktF2nB8kF2MyMy4KorCmjDjzgBoinBpkkBoyK8Ry0W31X/sLs2U8+EyyG+alze4sjBvwakuN2S74D9pV4rYh+GzmToQ4hBijFz8E6McmxFlmE+oB2bqaWkEspBMyiB2HmE0F4hBsY8mBiIsKmkBoBmQ0sBoHnF02CuG0cuCm/BiK+Huc4UyL4KwcuTohDwR8dw9B48BiUHgBkM6WoVjxLj+Zk/C4oEmR49KkqB+OppNi0R+xGq7E+UkEGx1kBYkmC0iB2MiZ4Uic0L2M2XiH6UiiC20BpWU4T2aR0ZhjGo5GiFqGiwEw8Bt+O4pP+vBp0Oi9UwI2pBkMoVgFo8E2S6S7rmB4fkIkpEwgBkpDgF2mB6kDq2DgvBq7BimDilEgsBmLr8T6hQq9Jx5hBPuawqJmgBuhQ1kJnrIu1b11lB6iEu3SqzCq7E/+gB4CiIyEwrC6Gq3Do2BiR2yC2eowC+CgHo5B04BknDuDyFihB7BuGh4LmnGjqPyoEkayuCawDswFyjMs9B26B0xCx/RoqFm7QnrmBE8OIgTqH86Ut4UoI6VpD6F2GgcstB6lCqlBkBoOgC4BirByjBivCqnBggD0CiwCwwEYkQq0Bw6FyuB6hCuVkQ32lB4uB+kFmlF2uB9yGirFkoBmhF1zFgjK77V8hBkmCsrDuyan4W83CyBsvE40C2D6Y8nB8uCkRkrC+NydupC+fn7egmfpiiBwd86B5K45P8LklC4vFw8FsxFCS5lkBk6Hm0S/qYysSrgV41Fmna6jDplkBwqO2wTv5aV+0DswL7gHguVphExrKjyE6vSvgN5mKwlLhiL0xV3ngBwS+4YumChnFwyHmhB53eiyax0Hh4U2PkV9M8gCyd4rOhmOqcghDiCgPgQhBiEwgBuIiTkQkdg9Ck1DstC6rBgF4EiL+Rk6B2Dk4B0zB0FkQs5B4xEo3CxtNqxGyhGl2kBu5HmmB4zFwtTzlXj7L8oNyVytB+xF2tB+uFke5xRnhMkUpB8DsR2L0Cm0BuWqPssB6iCurBqE0P8Hy6C4QmlE8CiIquC0FywC9mD45EiuE6Ywc+egZixBowB0d6bomCtzmB2lBmBusF0KovHoHmvCyHo0EmvCw8DyPq1FngkB4bw9BuJ6nBstBkZ4oByL2HgxB4wBymBsqDynCy/Ey+FphE+D8wB6lBwjCg2B8kC+oC+Z2qDhooBH0H0jCgQZg/C41CoB6PugEse28EsiC4hJKkNwhDnzhB02mBtymBuNkDyGJkTkCkTyBoE2JwE6CJ0XucgF0dsdQiDqlBCegIUsB4BgGyTyP0UgE8MmZsMgEgLwHmLqHmTmpB0M8DqM6GopDoVoekdgqBoCkBqEkFmmBnB2KCkK0D0JuSyvCoByrBsYyF68B0K2PnjN4rNuqBwKubmZ8TkmBjulB+E2UgB4sCiiFwuGyoOovBy1H/2mB+O8gBkrBk0RszLw+FiX/4V5jCsmJhmGrxK4N68c98TguOzlS8pW1zkBqiEmHyV2Z6gD8VukCVkjBuHq0C69Do2DmzCmtMxqmBoLwnC4TwmEsHO4gF6pCy9D84B6kJq0ExrFh5Ys1DmoCvnJVgOk3KxjJo5B4Vofw7BmuBmV2pCqzBopBonBy0Qx0Po5CgBsUh+Ji6L2qDouCukDi5DxjiBmsCuiIyhMszG9ud64Cuufj/e+0IyyLngW2lEnxCwpQo2S/pnB6uBgkBk7Hye2OgO8oJiN2c4gLptVg1ZrnQjiUhZ4Ku6EsxDubuDskB4oC8+MuyIlkQq0S3ocy7XoqE7uS9mI1kM8oByyB8qEsnCy6BgN2vBs4EmewVmnD0uBkhE6uCuV4pCu5Dr2Z8P+tCvrOFqGoE0rB6bPgfuP+gB+NHqDgV4PobwC2aqEyuBuiBp9EklFa0Cobo8BwBmJqzDmgDuHszBgCiBs3B+FgPk6DuMUJqCiGwdoB++E+iB94WruOgLgFkcsgFkK60Cwbg0B8tCy6BjhBk4C8nBsR4uBwHitDsCsbyqBywF/0R8iZj3fwkWk9IljR6/J52Z61dzukB6+CqgCyTuZ0NouCq/GsIurD2yL50Yg2UjyE/2Vi4LwqN7jTwuU7yD++BtnY0mFm2D6/U38Ti9F+8Dw9B6uBuxF46Bmax6Ek+E5ogB0tB+zEwxFwyEwbsxP2HkWvkIpyT82Buc/rJ05Ci7DksDquCwlC81DsP6kD4zDujG86BmkErokBosBkJo5Dw4DgrDk3Jm1MvigB7wByJ8yDyJ4aj/GkxI4fmjF6oGUs3B0QoY0hBiDgnBq7B2S6hBmuB0LiQyRgCy1C3yC7thB8Iqf2filG0nBq8C4mCycu1CksFs6JqLhrfo0CqqBihJ24FgtCpZ9hSgyMt6Pwlb45DvigBgzGyyEs4IszBwzDk+L1jkBm+GikDk4ByhBymBkK6My5DqhDpzPmpZiR8nDjijBsDkiIglCuEg0Dr2H2xP+Z3nMsrPuEgwChlc+Sy5C2xCgQoM8oZ+3B96iBuG6bkEsCoK2P6FtBqOg1BqF6HwXgFQCQymBKqF+I8wBIsFgLtB+oBIgCwEuQmS4XqBsoB2MgI8EmuBvBgE+lCyT2VmKmG0I+OgDqZiJ41B+zBoL6LmxBqJ2S4BuB8B6e4HqsCiMuRyJmoB2P/4kBHqBwD+zBwN61CqGuJqlBqxB4oBwjCkmBZ6+Ci3C4rB+uColFyrDqkDuWhvekcywgBlhb+hDwoBslDsmGkiB0fm3DwvH34I2lEv3ZpwGwK7Ci1CwxC4bWy9B0YgegoB0JkqB4K49BwHi0DqIqW8jBuI40B+qC2M0vB+/B+IgnC+OsJ0ayyC9kkBMi0BinDsH8xB8wM9tMgxS2rE07C6pDyQzkOy6HwzGvqDhnd50B8me/9dw0BkqDk4C2oEqlCstDyyCo1B+oEi9DiR2bOs3BljRqmT97eiGsgEijBqgTkzE92Z09B+c2qNilKxVn8G33M3wFnoEn+GqhRgzC/yH5mKiH2KgvD66CqKwe8yBoD0KoF6nB7N40BiqB4mC4qB2bk+Cu5Bv2T4gYiIgSduDi1CoX+7CMj9YooKuvDo7K/oc8qB6T04B8G2XkmIylB+fgf2sBi6FuL4H6Hv7KnqTitI2M4J3ao5T36H4T2uH6jGr3MqpC4zCjnc8mB0f4BkkE8FmBscwkCgCwmBk2BgCopC2H/Cr0Cw4Dif8Cn7FmrK6S4iB+G6VidgK6B42BusC+lBsSkoBFqjB7BivB0iDl2kBszBm7M6f/8P4hU+sC61BtuCnoTogBslCiwDm1BF4lB83EqrBF+3BuEwIurBwImCksE4iCsgG39C8rH1jnB6YsVqB19Bg6Cm0BgG6uMnrLwNx0Eq8GewmBsCrE2HiR2R+QvxEy+F+CuxC+sB71R+1T8Q05B2kB+OpDosBuuBcmR+E8TysB0qCgpB2GyyBo4BqvBp0kBu8DsvEokQi2Bk9DuxB9lgBgLkd2S2vGytBqhC4sDs4P2mBzkgBsoG2mY5vT08LzkVm0ajyb4kJ5mEkB8JkgEm0B0wUv4gBmkFeq0Jg+OpxastB+Y00DkW62CmnNjuM0uWm4BmGttlBkrEu/BihSh2R6XqV0J0SwO0sCg/C6e++IgLoVs7C4iCu0B6C2lDglEjwBzvmB4wCszCogRgmL8rD46C7xXyUrtOgfgkDktDqEoD88E40BkjCo/KgiFxnS4zNv8Dl1Ygxa/wZFpqC6wgBrKvkbs8TrzR4uOotKtuT41Rh0M+0U5gZknQxne8xC6qB+V81F4NmkBu2CkpByHilB+zDiwB0LghBioBwIogDy8BqsEznemesnD8mDwOy+BoTi4E+4Kpqdg8TtrQ0+DyUohDq+Cm5EqiCm1CqoBmyC4yE62E3+O9mD45CuFk3E20FxiLwKmqEtlU8lOpxUoMsqGskC4tB83BobsvCk4M2gBmckxDoa4tD17X8gDmwB47H+WulE/qfo0BoI+7BymDgiB4B6EkJgCqDwE6jB8Rg5B0HglEmuBuuB+fyzEoM8D6/Cw0B4BwqB6GsqC4tB0oBkuCjilBipI45Jh+Hk3Co0DqvM0uDosB/0U1oKinI6LgjT45Bh8O8jNj8bu6H/kCskDzrNw+Pr1Dk+TtpFn3D+5KthVgjDvgM4YojB+/QnwFjiPw9eg9FxwnBgK6QwB6c0ldvlc29Bq3BkoBuHuByEuC4WwiBoIqJ8tCg5BskGsQ4Ho9BsmC07DmO61B8coKoH0KqzG1iZ9oEyIkJ83E+4DspC60Ku2BxxSz8MssF0uCwqV+JslB7sgBkvD6L2yBikBm2HmpIp3E+5LqiBw3En6T75QiqOi/B83C08Q96iBisBoiCiCoVmrBizBogDocosDylEm2G6wEsyBwO+kBzyNoBj5S2/Fx4DolB6pDjgIuUiFgCkD+wBm0BG8P6jBgWoJgzBwduZm0BiNwHkCu/GhwEsJrNmtBwVtnJooL85BidUHmY0Jl0VkjZqQ0HyiCqPiUwcmfWygC4lBsbkgBzlC5wiBugBsTq/B2gCw5CsvB+nEopFizB8gD+wB8kGijBt6asigBz8kBulG2Bw+G4tCyuC2lBoiBnhIyxDg8L3qR6lB1mMwoU90I3uG2qgB5gNvyTm4a5yQv6Ms/CulC8pCqyD68Ps+Bi9Dn8hBqnJq0Vtsc01b/xfzzB45B86Zo3CvrN/tGg9X1+UilYj7N9oEjiRwgL83SmgEvoVl9O+6GmtBwtYxue88czkG++C33TquDn3LivB4hE4rB86dpvkB8oFkkD+rV7qN88E/E53OyoUv0I3X9zJgYq4B8RwyGotFtlXwrIlrIg5E3TsgFyxHy0G++BqD2Ik/G5hDpvBjrUqpCkiBytSjhR02C2FuvD6/B/+O8ySuzB8vL17kB+sHyhCoLocuhBm1HxnC+nHnB8mHmiBj0gB2+DwpBk/G6Og/DwZy7Mt8Z6+Zy4EllD3pE55G9fikG3vaqzBoPk3HiwC0vCk7EsxCgQg6C60BsmF/wUkkEquBohG+4CqhLouC1qmBm7Uh0Bq0B8sCh0CjmIxoG0iR5zFct/RsvgBv9R6+D4xNk1E39lB+lYrtOkrMqlNm0DhnjB8d0oXu9Hz4jB+uBqSkIa0iFqiDoW6e8rCey/CsG6TsW4uE0+B47B+rDtuIigL9lQwqT4Nn7a2yBgwHyX2eknG0ar8ZsCoN41CmwCoPqTsZ+CiDouBmkDuPquE2PkesUk/B2a6SqgE6gBigBm8B8tD4XjtX4iJh6Vo6F+2Bw9DglC4lEmtBooE46Pl3b4kJ/tTilRi2Sx4dsjRmlB11B71QwI45Km+CqvKt9T7nH+KonRnpD6qKxzdo3H8qF6hB0sB+9CqoC+vH4emiB35W+uCq/I4gCowEglIvDvlHglB+zK72jB0qF+hD+8DwrBipO2Cu2F7uZs6H1uT0MuwE0U0TqWriF0lGwJyX+lBgwB+CsM+vDusC+uEyiDyE8PksEmUqE6IuqEuCvpjB4vK0rDurLkkBwQ63Fxuai1Go1X/iK4Nzkb+1ByzGrWusEioJy+D64D8Hl5N/tH6zBkmF1+Oy5RwyU74kBojBwjB8jBgvEyM2qH76L0xRoF4Do9M12YstNtkZ2V+f0sDkiDesJyrE/5Msxb2kIiNz+M64NvwjBq8Do5OglBnoT+3S22G54ExzVyrE6zM+3EgiBi9IyBwH/ogBywB+1DutC2qcj9jByjZktIx+dilGmhEi8Eg7JujDntKp2Tm7CisEoLmqC8xCinIy6Dv8Z5C4wBgU0+BuRmlBkVFyD4W0hCqLsd0HiVy8CWuhCwzDw/CkrBodwV+NqhB+gBuR+hB2lC2iB0iDq/BwH9xnBiF2ewcmvC6lBopC0ZqmBonCsGoLiQj0L84Vw4B6Pu1E2YkD87Cm7BnhhB2giBtxiBnkBsoB20CygGioBkzF8vC+tB+5Lpyf69M5Rv4J2kDzvCu9G8sM3hXouS9lJ8nK2mRs2BjvjB6e6mGkXmjCtuL+uKr4Fs0RxgNoha76Zmlat/Zx7M4To+BgvHinC+3CwxRxhgB+rXilQzroB01J6xG0Ku+KjqYsrJ0han1ei6O1uPvOq1VntMsoL9rFmvDh3TmvR7nI8wFxkSwkD8/L6T23C20PyjDvla7oHxGpnEumB+Gg5IgtIuxMgqB2lF3whBknMz5Bz3O23LqvK4Cq3Mu1Dnkdw6CguM/3U0d2nI+zDs9B+rDomBioCx2Zq/Kg7b5+T74HpmKqgjBlueshDkkNijIl2bs2FolOonMhohBnqCs1Bq2D6xM2/Gu5I1qZ4rM/lSo/F04OuqEsoCylCwsEp2X07OoqH30ZFg7Fw5E0pK0kC1gd/9Cwd4ZmQy9DutBkiBiOmlBkzBgN4oD5Ny6Cyf8hCo4Hkci7CsEmG88CxzHznX9oFgN5U0neqrCgtEp2jB88GvuCkiB8vBiyC+BsM0hB6mB6IkzB0a6tBm5Bs4C0tCqHwkC+HurC+ZwuB0lBuhD4oB74bkRgqEgVgPulJ+C7jJo8IojE6Tp5Q2kO0oKtU79UqkI2tD4yG1vhBmwC09Em7GsuCi+K+Fy3B/3bqeqlEwuFyV61F4H8V4uJiB0uEqxC3G9ub2/Jm0Dk4E/qQo8I7tRurN0V42C+UixBsiCm/M36NgrSx9nBu7IslCspQv9buC2iB1rB06BiiF06EuuB0zCk2CkyB0W8mB0sBu4CkmEy6CkVqqCka93iBqzVv6W42B8/JmjDogCkmBo7Gi0Gw3Dm7CukBhkVhiOu1Kq5H8yN33kBiFoF2iByPwwFimBq5Jy4Cs5Eg2HkoC8DmB44D0M7rc6sC91M2IoiPy/L1/UiYoUk5GqiBovFqb0nB8nCozFwwB3uf4yjB7pYq7CwjO4Sk0E/niB44DwoCyDkhEomBuBq9Boak1ByJgvEmhC4H4sDk4El2fqymBhxSswDsqJ7lE1qd8lCo+axwPy1Q97FvjQ8sDilb11nBFu3mBt6I3qC1FzmO63CwhF6rE1kR7vIIoBMIKEEmBCyCEq+el+eu4ZtwRhoIeCaEEuBFVCLoBMcfuBiBgF3C0CCPjB8CiBMQ9BnBMgCnCsBeiYrUUlBSEXQXmBoDarBqBNjC1OyN0COE/ChBiCZ4DG2rL/qLNTiBLqBWOyBtB8CHsBxBcmBOMOXUULmBTmBFFKMwBJIFGiBPOaq5Uh5UGiBCq1C70CJKCCCaCLMOHHIOOGiBIona7maGEIQKMQPwBEGIKqBZMiBXqBSZSWHeMHlCsBQsxeF5vecRWWSMIEsgjB9gjBkBCEYC+iR5iREFKIQWCCIOKF/yCizCGxXuYUIy6C95CLUmBSKFQCKY8kUssN3vhB4xJivFjgPPIYM2DErBcfOdbgDgE3BwBhDiBKRiCxBIXaWXgEtCqBpBMuBGjCEsB/ByBH2BYwCIxBhBFYzBsFMkCxB/B6CxBgBhCNyC2D1BlN0NoBrCEyBKenDMqCnCgCiDtByB5BuBOjB+D9B8BzBF6BnCoFC84N56NCLKkDRtD4DH2BPSqBbNqBQOHaPICJOKECGsBUMFIIFECKIHhVoVSgBqBpBIcyBsFzDxC6BSSYkBhBKKkBEaHsDrDYuCaGoFlFgExBoC+0J/2JtB2DWmD3BWcmCpCJXsBaHKCFYVONeUFCIOKU04Hl4HMIKKm5Q93QNHWHSHMIJcQ2BhkF4Eu/EcmBiCbhF2E0EPfUpBgBqC2CpCrB2CO+CiCCYVNqCbcEpBmCgBFU2BnGyFWOICNgBGISGMECE+gF/gFKEkCiBUGCULmBCLLMKIKJiBCIKYCKeOIOIJF/N0PC7gHmhHEkBIE1vB+wBeNKNaRQiBemBJd8JnKgCSCoE9DLXEaTFFmDKLJgCMEgBJH+BNcCc9CsCIYGKFGIeMEqBcFTS0BYFJaQJUEC9B6CGikgB9jgBgCgCKOFMYPJMFMEICJGGKIKmFFlFKIkBGUQMGChCiCICOWKGWFJUHQXsBNFOOIcyBoCxBmBRrBqNrLiC8DxEVwB5BkCvBPqBNxB0C+B1BwCYzBtBLMqBjCgCnCyCFnBuCWyFrGsBvBsBNNoB7BqF1CuCdhCrM4MQlBkCoHzDhBjBQbKQ6BvCX2BwDVvBFkCZJjBOQIC8CGhCgBQNXWnBHXiCmCJhBoCzBKjBMyBE6BHF6ChDNEbgB66O76OwBJkBGPUHFCCOGFOMEEQGCCaYeITIOmBKMZmBE6DlFgBkEPvBmB+C1D6gB7gBmBjBHTI7C6CkE/BEqDtCK1BK0FnBc8M9MsETf0CtD4CrBPqBqB3EHoF0C1CK4B3BQmCnDiF6B/CYkBesOvQgB1BuFOMzC2NtJHiBGlCmD6BTdCb4BvB8CXiyO1yOtjBsjBW4DvDHHOKJ0BGxB8BFOQCFCkhIpgIaFTUKFoBKSsgTh/SGWWWENEOKQHMegYzWRTuX/THzBkDZIT4BFMEVEakBIKNNmBImCTeZHOb6BGKlKsKEMICuBMOOghY3gYgBVUVFcuBCRSoC1BwD9CnBiCF0BN7BiDuD5DuD1DqDlD2CPFIWtDoBTgCorB/nBuC9BsBY5B2BoGzI6CSmBO+BjB6B1BQHzB0iBtftEgEtByBoFnIhBkIxD6DjDyEGtE0ChEMkBnBgGrCf9CWiE7C1BcwDCjBQH5FkLH5B2BdxByCjBtD0DxD2B1CgDJFmCxBuELiClBCiBtBev+Gi+GkBnCO7BsI9JcLR8ByCSyBwB7B0QlRRZ6BrF4GlDsC1C8BO8K/JjBgDzDqG7DiElD0BVY/BjBvB6GJkB7B6Bb+3N71NOFXNRiDdatD+CegBSgxN7xNuBG0hYnhYwBFo6Fp6Fo7Wx6WLKMQNMGCsBKGFSUJQKKGEFCGISIOWYFOL8sZvrZUMQF0DVYOuBUY1ByB9BvBU8BHmD4C/BvByBnBuBhDEYLgCmBvBgBoD6yNxxNZiBNhC2BHlCPsF+ChDX8BjCoDM8kBhmBmH2BZtFiB8B/CaqCfnB2BvBdoDlCUhBoBG8DgEjEtBwFpBlC5BuEjE0E1C/CmCVmB3C0NnO0ByEuCnBgDnB2BvBfoBnBiCvEqB4BpCiKjD0TjWWKgE9E8DnEkEvGiH5C7B8IbHQFlBrBuJvIoBPrCqDEgD7F4EjBHEoBY7BoDXsBzBGwBJpB6CClBsBjBalB4BFvKwKNMgBab8BiBqDR4BiEtEWNNgDrBiBL+Cb8BJ2EjBkDnCLvBSqBkC2GxHgBkBG0C/BImBVUPiBWNaMJKaEUYIFGCQEKIY2BSGFKUGWIiBRgBEHSGeHuBHzuRuwRdiBPMsBNPLwBew4Vl4VkBHOOJKF6EtB0BpBIoCQjBmM9JyG3E9CyDO0BvB+BPzB0BYMdMWOYkBQkCIIpO8OEGCIGHMFYFCMCFOHUOKeOQJFiBtBmBcNEGCUHepBqBFRiBKEOH8BhBefONGZ2BJOMSN+BJIlBSTuBCLqBORCeLUWHqBLQKJIGCGCGGEIEEOJKqBGGOUQLWEGCEo0HrzHYFJoCNPMZ2BckBaEjBSyBFNoBJKcHiBKEKJHWKSECMUaeKmRvQyQtOwE3BiBX6BfsBiBZIiCZIQvBHQIiCNdkCVkBUFOkBFoB+BVONNHsCIUkBSm6Sl6SGIKcWiBIZCoCIUMFhKgLSERWmBfuBMmzS9ySQGUcHEHkB8BzBKcFNm8K77KEECKHKEGGMEiBYNL4C5BIsBdayByCvHwEnEgER+CjBcdQNC8CNMnBcHhBMJnD2DiDXUE5BiBsBWuCE/CF0HjGMWjCG+BXxB4CGEZuBbiBcVgBNhBeOMIfcMQaYmBQZQXMUFFJUGEIJqBPSKwlP7kPECCGWLyBRZ0DK9BGYXgB4C9BTmCXKhCmB+CX/CmDnB6B8BbZiBiBXnBiJ5JY4CrC1BgBuCIMP4BVlBmCIwBHhB8BnBvBCsBmC+B5CPGSbNO4CXRON8BhBFkBFO/KuKgzIhzIQEKHECTY2JCUMCGFGMOHgBSGJIFIOSFJQWEMZOCw7F76FGUFYIESKkuMvtMHMMKEIMsBLcLWKCIEKUFHKEGCICFqBTMkB9xX2xX8CSbG1BqBLkD3BCyCaPW2B+zKt0KToBHtFoHJVacICXC6BZcFrEmDqBMIQPIECTcGGOFjBiBIMkBEEECEEEKkBCYNYwBFIJIIHKC9DkEKKcIwBb2BhBoDCLdiCFMwJjJTH5BuC3C4CjD2FF/B2BFcRsBZvBLrB4GoBeZEbpH0GREfwDnEC0CxB8B2E8BzC9B8CK5CkD3EqDexCiB0BoBHpG0H6M5QiHpEiB6RvNdbiEhEmB1BpC3BkESrEoJzGsFKjCyDbnB8BXhBIetD+HnCZkCmBdXFzBmEkCZjBRgMxLS0CmC7BQR6B5DsCM8EpGoBtCMiBwDhBoBvBsBIOOV4BgBQTdLW2BTqBcaz/b8/bUOSiCeKhCyCRoBCvBwByVzXwCSUEdLmBkCbCTETqBTGrBgByCUTGvBGhBqEFwB7CCqC9BgBKtBPeM0JpGJ9B4C2BfEeqwH5yHwBlBmBFZmDEnB8CHhBTsB7D8DIFYFeIEnBmBQHeMIGQqBJ+B1COuDpEeoBN2BtBQtBsBWcfiBeGG2BQPTbSiBOHQ+CtCMIqBEVNCmBhDkEHOHQJIIEMIICQIQOJKEEOECyBCSYGUkBPLcCOgBUyBVbCmDhBFXkCJCmCRjBmBbQgCQZuBgBObJYkCrDCoB1BJgDNkB1DoDPMQkBunGtoGIkBvBwBUEFNYIFgBbYEIQEWCGEE+JMHQGCCIYSWCOMLIEKzB2B5nV+oVJkBZNOiBRkCFVkCJQIJOHE6jJ5jJvEsECgFKGCauBwCLLoBULXcjB8BbGwBWX6BfckCdNGqBJCEGTgBULvDwDfgCLSIKHFMFQHEIgBVUGqBtBYMEEeOwBFjBkBWNeJMPQELhByBYOHWJLaJJOQIKuDEGSCOkCUJOIuJpJgBbsBGWrBgBTZ2BcFGlEsFrE0DZuBCKSMMijDvjDeNGFSFKwBMCG4CC7pXkpXsCeMwBHyBWCUCGSFwBHR+BQGNUFKKOCIKQCPgCRuChCoBuBxBL4ERnBG0B7B4EvFWI2EPJOlEoHvBHiDqCtByEvBtBQTQsBNKgCG2BfzByFL1BoC4BgBJdtByBdT2BqDPFjBGQqCZSrBwBMgBfsBICLWlkBskBICKpCiCCEHkQIESCCMOFKcFHIWr9S48SSFQFCKIGJ8DMKkBSEL2C5BCFCMWPgCUJCkBJSHGCCoBJHGj4G84GgDzDmCUCCUNEHMEUKKQGKCCPMkBGGCCvpiBwpiBKOWVIRWIGWWHJecECEgBgBi2D91DpxOsxOFyBJ2CrBJqBKQQL+BGAEFsDICIaFEkCCuBKQCGQLKLWCcGMLUNKPQiEYOakCLCNR2BEQJQaXpCsDiBWaJHENsBTaLOEEFICFkEEWGcCCSEEQLEKJKGUiBCIECCGEiBFWHEM2B8BjBaIOOWWSlBYQCgBFCjBYwFzEFFoCFZSRPCSTPyCpBSFJcsBtBmBT2BKMcC8GIGwBF9BuBEmCLwI7ILoChDJ8CHFOCoBKpBFQwBsBHmC7DU+BSIQiBJPJCWQdsBPoCnBMCa4BEsFGGGMEKELWOGcfE70D02DCGOCFEIEMICCCSllU6lUWUiBWOCcLIIHYNG8BMGl3jBu5IipTt/NzoR47PgvGipF2iFjM76GpxaivQ3oFspBgjV//Vv7D9xIwL0BGEqD4B2DTePwDkH/BpC8BuCyC/CiF+F7BiHyBwDgC6CwCsISyB0BoCM4B6EgC8B0CgjzCn3yCnB8BqFsIkdWsE2BFukxCn3wCmBwFuEOCKgEqB2ZyG82Mx1MmBiDuImB0DiD2C6ruChtuC0C0EsBgVkBkD+EsC8HuCImFV0E/C8BqCRuG0HkJ8U0G4DgD+HiLoBqCnDoCjBKgEfCw7pCh6pCqCMiBY0DmB0hpCp8oCoFsJnJgEkE0Im0oC5qoC2qoC7noCyE6E0DtC4CUmGCiPwG4ByCxB0GyCkIzBsCqBkCwCPS4DkCtDoBkIwM4C+DeCgC4FqCmGZuFvB6skCrlkC4DkLYqGivjChqjCqEWYYlBoDnBgDGFImDsCqBiG6GkRyBCJUg3hClthCxpSi3S4CqBqBqLuugCvogCsogCjogCqTqBoz/Blz/BkL8n/Btt+BmB0FxBqD2HoPyF4n9B9x7BgG4BuE8CiF2G8JKiBmr6Bhn6B+m6B3h5B6O4RoCiE6CsBgCk03B7y3B4F2CgXG6BmG4q2Br11Bo11B/70BsHu00Blx0BiBkLJMcXgCSP+CKLiBUTzB6C+DjD8GjBCVs1zBn1zBUdiFLvC4yzB3wzBhC6B5B6G1B4EiCuByBwDmBEyUykyB4E74xBiBmIOOSCCGiQao8wBrwwBowwB/owB+K0IEwJJ4BiCSoE+WNisuBrhuBuLl2+BwmvDC9NN3i+DlBhhBgiBG/iB2iBFmo+D399DruBIwBNjBFImnQ/nQinQj5OC+B/BC4B7B4B0B3D2DXUH5B6BmDCkEC15ByEqBWcHUnHyHmBzIO0ClCsDSCISHQCpF0FrHuI1G9DFGH+D0M9MGhEHkECGtEkEGtEFEF+ELLKGCGHGxFFEFgQhKPGPWCEGHOGHrHCFGH4PlILxH8HGHGCGHKHzIFEFgJsGpGPOLP8GGHLlGxJ0JHEGH3JFGHgC0M9MGjCHmCCGvCmCGvCFEFgDLLK2NzNCCGzDFEFiOtKGPWCEGHOGHtFCFGH6NlILzF+FGHGCGHKH1GFEFiHsGpGPOLP8GGHLlGzHCuHEGHqomBCMKYGGEEIUEESQCMIUGKaQKiBSSYSIKMCCCOCIEKECoBE8C9CCCCCECCKCKCCCMGMCCEKEECAGCCCCECGkBICCCGCCCESGCaCSCEEECCCEGEGIMCCCUEGCCEGCKCEEEEvDqECCGGCCICOIQEEEEICCEGGCECCCKCIGGIEE7B6BMCCIGGCCCEQOIGCCMICuBIMESIGCSUCCCEKMCCEKGEQGESEYCCSKQEMQGWCCCEIOQMCEICMCCCOOKCCEGCCGECECIIGECGECQEMAICIECKCCECEMGSFaCKCCMIMIIGKIIGGEKGECCCEEISECIECKaYgBMMKCICEaEKCcGCCCCCKUCCCEGGGKECICEEKCGMGEiBSCEMKCGEEMoBMEIGKCEEMCECECwBCGCKCEWQIYCCEECCEAGEEGMYQKECEMkBGECCCCCCCECCCISCEEGCCEcEEQGEMCGCGMMGGLWECCEQPCQSIECIGICECGCCGQKKIeECECCCCCECQOECCCbiBEWISGEKOKCCGEICIGGzC0CaEKKIMKSECISCEEeGEKCCGCMEGEOiBTKKICCCCGEGMSiBIK4yWryWGCGMECQGEWKCCCCOCCEEECcCGECOIEKEGECICGCEIUGEMCCEQGOGUIECEEmBCGGIQICCKSEEYIEEEECCIIICECGICCMUCGIIGMMEMc4B5BCCGGOUQSKGOSKYCECGGCCCiBECCIECGWCMKcCEQcUMGEECCCCEkCCKGGEGISCIEUCCEGOCIcCMUPsBECYIMIwBTCSEIGCEECYLOhBoBCKEEQGCCICOGCGMGIGGSGGIHSMGIcMMKICEMaPSEQYIROICECSCCeUEmBCECCICSMKFEECMCMKsBGKUEGGECCGCICCGCKEGGEIEEOECECEUGCMKIIGROEMWECISEKCEEGCUEEKECIIQKCUMEIECKGKSYEGCCGECCEIGCEOKGEGCGEIGCCGEYEEGIIECGCCECGOIGCOGEoBCWKKEECMCIGGCIECEUEGWKMCICLMCiBCEWCMGCGCCaGICKGCCGCOQCGMEeqBCUEEGISMGeOCOKKCEEECgBEOEEICGEGGESKGEEGCECEEKGGGKCMaGGEKECMGIICKCEeKCCGKCCCGIIOCWGCKCCSKMCOCOMCCCCCECGMSIICCGCYGEEICGGCEGIGCECEEGEIEQCKGCMCCUMGcEGGIOEEIEEEOGUEKICGCCMgBCCGIGGGGEMAECECCCKHQIGCIJQCGyJlJiBZCSTCILcECMEGQGEKGCIGCIMGQECWUCMIKEGCgBUMCGOOQKCKCIKESCCECCoBEK2D1DCCEQICEIISCG0F/DIGCQFICCOGIICQCEeEEGKCCCaCCCICCGGGQSEGEACEEEOECEGIQEKCEyBCCEEMEGIQGOCEGOGYIGCQGCECCOCCQEQIUEQCCCQCCWCGIEEGGOCCEGEKEGCEIQEEMCUECECCKSCKKGEQMEFGGGKMEIGSIECKKGEKGEEKIGMGEIGCIEMGECIOAGEiBGGCIECOGIIESGMCEMEKCKECGGCCMKMGCICGGUCCECICcCCICCCSCUCGEgBCCaGMCCCGCGMCCCGCeEEGCCMWlMsMCOEEuBMCGCOWKISCCiBCOECGCIGCGMICCCEGKGCKGGyBGIUGECOECGCEIGIUOCeKKMMKECOGCGCE2BCUCCMGCCQCCUEIEEIhBiCCGCEEKGgBIGEECCGIIKIKQCCeGSMIGEEIKSQEWIECEMGQOjBqBMCMOEGaEQMIEEkBMCCGOqBQGEcCUCCMQGEICIECCCOgBMICIKOICYCMIEMMEEC2BKCMSGEECIMGIGOCQECGCCCEIEECKEEIIGIOYIEESEKCEQCMKaKEGCCGCIIIGCEGIEICKSECGCIKCCCCKCEGCCOCECCGCCEGCOCCECKECEEEEGGCECUCCCCEEEMQQCCOMECGCGIKIGECEaGCKKCECECECEGCGQEGEICEIGCGIKEMWGQEECIMEGEGKCCIMCaCOEGUCCGEKCeKIECKCOIEEEICCOMCECCEECECICEGICEACaXCGCSGKIOCEYGMOKCCCEeGGGCCKIMKCGGIEEGKGGGCCCCKKIIEGGEGEEGICCCEECGCKEEGOMGIEIEGCGQIKOEGIGCGCGEGESEGEWGSCICWEGCGSCCCGCGWGWIIGQLIGGEOCCOECGCaVGIGOYXEGMKGSCCICCGGEKCCIGGCEGEUCCMMCCYICCEIMCGCEGEMCECIICGECCEICGMGKGCCIGKEEKGCCGESCGQEECICEEOEKCCEGIESCEQMCGCSEECESYCIEMCQYUGGCCAEQCKMMUGCEECEGYIICIIECIMECEGIEECSCCYCOCECCECECCSCIICGICCEWGULKECGCGCCMEQOISCKSKEEIEGCGCCEQECSaGKCEMIEGEGUCKIGCGCCOCEKOCGCCCEGIKAOEQECQKQCsC/BEGCGGEaOGCIEMGCGEQICMCCKMCEKEGIKEIEEGGECE6JFCGEOEOGCMGWUCCIIIGGEMOEEIKWGGCEGCEOEOCECCCMGCKCCGCCCCCG2BGCMGGWMKaCOGYcICECCOYCCEEGIOUGCCGEIGIICQCECKIQKGCOScbIEOCEEGWGCMeTCIGKCGCEEMGECGCEWGIEGKSCKQIECIKGEGKMMCCCECGEECCCICEGCCCEECCMSIIKCCGCECMKCKCwE1DCCSCEGECIEKEGwBOICCCCMICECQCEiBMCKEQ3IoJCWCEIIGICGG7GiISWCCECCGCCGGCEKECCGGGYCQOCICEKECCIGEGQUEII0DzDCIGICCWCGCEGGCQMQEEECMGSCCCGECEGIICCECYCGEIEElC0CCIKCIKEKEGOCKCEEKCYCCCECGWEGEIEEKEkBGICCCIIIGCCKCCWECECGECChGiHCMCGEEIICCIKCMCCECOUIGESCQOCGECCICEGIEGQCMGMECEEKCGCICICCEEIQRGCCQICCEICICCEEEGCCCEGIOOCIuBCEOCeECSEOEQOGCSIMKCCGKOEGGCCEEKEIEIOECECIAWGEGKEIUGIuBYGCCGCEEGCICOCCQCCCCIEKCKCECCCGIEGGGCaCEEEIGCGCKOCIGEGEIECMCCKCYGGKEKIKUCtBkCEMIKCSIbgBISQCECEEKCCIMCwJGMCCCGCCEECLSCCGKCIEOAGICKCOoBUECGMFGGGMGECECKCCKQIGyEGECgBECGIEGQKIEEECCCIICGEECCUCIGrDoDCQGEIKECSAESCEGESCIMEMECOMKMCEICGICGICIICEOCEOWKCKCdkBCIMKKCCCCGKEKCGOCEIMuDEEcCKCIGCECCUEGKEGIEGCGGWEYKNCKEOGOcCIGIGGIWEECCICCIEUCCMcfIACYCECKpBmCZGGSGCIEGCCCCCIJGCICECCCKGMGGCKEEKMIKCCGGECEKEICGCEICECaECGKGCKCCCEECCGCECGKCKECCCCCCEEECMEEGCIICCQEGICKGCEGEGCCCCECECCECCCCGCCQCGCKIGEMCECCQCeMECCGKCCECCCGECKCCCEEEEEECCCEQGlBuBECKKECEGiBHCCGCGGKOcCMGHKCECCQGEECCIECCiBFoPIKGGcCIECOCGECMCCIKEGCsDGCKICGCGgBCCQYKMCCIOIGECIEIGMeOjycqycCESKCQOACGgBCGIQCaCMGKCCOGEGIEECCQWCGESCEECCCCECCCCEEGCNKEUCEECYEcbKCKCCEEIECCjBwBKEEMECOCGC8DCCGECGEEEGoBCCEQEWIQGEEEGGKGGIIKGCC0DCCMSEGECGKSICCQEGGGGGMGIOCCEKICCcPEKCEECM4ECCECECECCECKCCEGGGCCEKCGECAECCCGECGKICKCCEUEQGEECCCCICCKGCCCGKEOCEGIECCKKCMICKCEGGGAECCQGCICCCGEMGKGCGGECCECGKfcJKCCECG0GWICiBVcKGgBCKCQTIGEQUGFEGIKGACICGEGCQQCCEGGEEGGCSEGICCCECESWTIMCEEE4FGCCMMCEEKGGCEgBCESSIEICEEMEKKCCCGEGGGCCECCCCCWCCESGCCIEiBCCMECA.gI+DGCCCECCECCCCCCEECCGCCCCCCCCCCEEEECCCCUCCCCCCCCCECCCCCECCCECCCCCCCCCCCCCCCCCCCCCCECCCCEECCECCCCCCCCCCCCECCCCECCCCCECCU0B0BmFsFiBOiBOMC0BMC0BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCoBUCCCCCCCCCCCCCCCCGECCCCCCCCKECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCECCCCCECCCCCCCCCECCCGCECCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCECCCCECCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCECCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCECCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEECCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEECCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCGCCCCECCCEGCCCCCCCCCCCCCCECCGCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCECCCECCECCCGECCCEECCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCECECECCCCCCCCCCCCCCCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCECCCCCCCECCCCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCECCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCECCCCCCCCCCCCICCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCECCCCCECCECECCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEECCCCCCCCCCCCECIECCCCECCCCCCEECCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCECCCCCCCCCCCGCCCCCCCCCECGECCCCCCCCCGECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCCCCCEECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCUCCCCCCCCCCCCCECCCCCCCCCCCGCCCCCICCCCCCCCWEWECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCECCGCECCCCCCEECCCECCCCCEGCCCCCIECECGCCCCCCCCCCCCEECCCCCCCCCCIEECCECCCGCEECCCIEEEGCCCCCCCEGCCCCCCCEICCCCECGECCCGCCEEECCECCECCGGCEKCEECCECCCCECECCCCECCCCCCGICCCCICEECCGECCCCCECCCCECCCCCCCCCCECCCGCCCCCCGCECEECCCECCCCCECCGCCGCCCCCCICCIEGECCCCCCCCCCECCGCECECCECCCCEECGGCCCGCCCCCCCCECCCCECECCCCECCEECCCCCECCECECCCCCECCCEECCCCCCECCECCCCCECCECCCEEECCGCCCECCCCCCICEGCECEGCCECECECECCCECCEICECCCCCCCECECECCCCCCCCCMCCCCCCCGGECCCCCCCICCCCECECECEGIGCCCCCGEECECCKCCCEECCCCCECCIECEEGEECCCECKGCICCCCCCEICCGCCCECCCECECCCECGEECECGECCCCCEECCCCECCGIEECCCGCCECCCCECCCCCCECCEEGCCCECECECCCECCGCCCCCCECEECCCCCCCICCCCCECCCCGECEECCCCGECEECCCEECCCCCCCCCECCCCCCCGCCCGCCECCCCCCCCCCCECECCCCCCCCCCCECCCCEICCCCCEECEECECCCECCKCCCCCCCECCCECCCEECEGCCEIECCCCEECCCECCCCCCCECCCCCCEECCCCCECCCCCCICCCCEECCCCICCECCCCECCCCCECCCECCCCECECCCCCCCCCCCECCKCCCCCECCCCCGCCCCEECCCCCGCCEICECCCCCCEECCCCCCCECCCECCECCCCECCCCCGCCGCKCEGIECCCCCCEECCCCCCCGCCCECCCCECCCCCCCCCECECECCCCCIEECCECCCCCECCCCKECCCCEEGCCECCCCCCEGECCEEEECCCCECGECIECCCECCECCCCCECCCCCGCCGCCCCCCCCCCICCCECECCECCCCEEECCCCCECECCICECGCCEECECECCCCCCEECCCGCCCCCCGCCCCCECEECCCCCCCEEECCCCCIIGCCECCCCGECCCCCCCCCGCICECCEECCCCCCCCGCECCCECCCCCCECCCCCCECCCCCCCCCCCCCCCGCCECCCCCCCCECGCECEECCICICECCCCECCCCGEECGCCCCGCCCGCCIECCECCEECCECCCCECCCCCCCCCCCCCECECCCCCCCCCECCCECGCGCCECECCCCCCCCECCCCCCCEGCCCECCCECCKCICCCCCCCCCCCECCCCCCCECCCECCIEEGCEECECCCCCCCCCCCIECGEECCCCCECCCCECCCCCECCECCCCECCCCCCCCCCCCCCEEECGECCCCCCCCCECCCCGCCGCGCCCCCGECCCGEEECGCCCCCECECCCCCCCCCCCCCCCCCCCCCEEEGCEEECCCCCCECCCCCCECECCCCGCCCEECECCCCCECCCCCECGCEECCCCCCCCICCCCCCCECCCCCCECCCGCECCCCCECCCECCCECGCCCCCCCCCCECCCECCCECCCCCCCCCCCEEECCICGECCCCCCCCCECCCGCECGCECCCCCCECCECEECCECCGCEEECCECEGCGCCEIGECCECCCECCCECGCCCCCCCCCEIEECECCECCEKCCCECCCCICCCCKECCCCCGCCGECCCCCCCCCCCCCCECCEECGCECCECCCCGCCCCCCCCCEGCGCECCCCCCCECEECCCECCCECCCCCCCECCCEECCECCCEECCCECECECCCCCCCIECEECCCCECECCCCECGCEECCCCECECECECCCCCECECGCGCCCCECCUCCEECCECCCGCEEEGCIGCGCCIEECCCCECCCCEECCECCGCCCEECCECCCICECCCCECCCMCCCECCCCCCCGCCCECCGCCCECCCGECCCEECICECCECECCCEGCCCCCEGCCCCECGEOCCCCCCECCCCCCCECCCCCCCCECECCCGGCECECGCECGCCCCCCGCCCCEGCCCCCECCCCCECCGCCCCECCCECECCGECCCEECCCCCEECCCCCCCCCCGCCEICCCGCCEECCGCCECEECCCCCCGCCCCCECCCGECCCCECCCCCECECICECECCCCCCCCECCCCCECCCECCCCECECCCCCCCCCEEGEECECEECCCCCCCCCEEECCCCCCCCECCCCCCEECCCECCCCCGICCCGCCCCCCECCECCCCECCCCCCECEICCCCCEGCCCEGCCICCEECCCECCCECECCCGMCCCCECCCEECCCCCCEGCCGCCGCECCCCCCGCGCECCCCCGEECCCCEECCCCCECGECGCECCECCECKGCCCCEECCEECECCECEECCCCECCCCCCECCECCCCECCCCCCECCGECCEGCICCICCGECECCCCCECCECCCCCCECCGECGCECICCCCCECECCCCCCCCCCCCCCCECECCCCEECECECECCCGCCCCCCCCCCCCCCCCEGCCCCCGCCCCCCCCCCCCCCCECCCECCEGEECECCEECECCCCICECCCCCCCCCCGECECCCCCEEEICCCCCCCECCCCCCCCCCCEEEEECCGEGCCCCEGCECGCCCECCCCCEEGECCGCCGCCCCCCECCCCCCCCCCCCECCCECGCCECCCECCECCECCCGCCCCECCECCCCCCICCECECCCCCCICECECCCKCCOCCCGCCCECECCCCECCCCGICCECCCCECCCCCCEEEGECCCCCCCCECCCEICKCCCGCCCCCCCCGCCGGGCCECCCCCCCCCCEECCGECECCCEEEGCCCCCCCECECOECCCGCCCCGCCECGCEECCGECCCCCCCCCGCCGCGECECCCCCCCCICCECCCECCCCCCCGECCCECKGCCCGCCCCGEGCCGGCECCCECCCCGGCCCCCCGCCCEEECCICKCCCCCCCCCCECCEECCCCCECCCECCCCCECGECCCGGGCCCECECCCCECECCCCGCGCCCCCGCCECCCECCCCCKCGCCCCCCECCCECCCECEEECCCCCCEECCCECECCECCCCCCECECEECCCCCCCCCCECCEECCCCCCCCCCCCCCCECGCECCCCCCCICCCECCECCCCECCCGCCCCGCECCICECGCIECEGGECCCCEECCCECCEEECCCCCCCECECCCEEGCECCEGICECCCKCECCEGECCECECCECCECCCECCCCCCCCECCEECCECCCCECCCCCCECCCGCGCCGCCCCCEECGECCCCCECGGCCCCGCCCCCECCECCEEECECCCGCCCCCGCCECCCGCCCCCGICGCECECECEEMCCCCEIECCECCEICGCEGCCCEECGCEEECGGKGCGECCCEEECCCCCIKIICCCGEGCCECCCCCECCCCEICECEEEGGCECCECECGECCCICECCCCCCCCECCCGCCCIKCCCECECEECECEGGCEICCCCCCCCCCCCCCCCGECCECCCGGCCCECCCCCCECIEICCECGCCCIECCCGCCCEEICCCCCCGCECCCCCCCGCCCCCCCCECGCCCCCCECEECCCCCGCCECGEECCCEEGCECECEGECGECCCCCCCECCCCECCCCCCCCGECCCCCCGEEEECCCECCEECCCCCCCGCCCCECGGCCECKIEGECEEGCCCCGCECCCCEECCCGCECEGEECCCGCECECCCCGCCCCCCCECGCCECCCCCCCGECECCCECECKEEICCCCECCCCGCECCEGCCCCECKCCGEIGCECCEECCGEEECECCECCCCECCEECECCCCCGCCEKCGCCGEGECCCGCECCCCCCCCCCCCCCCCEGEGCCCCECCECCCCGCECCCECCEEICCCCCCCCCCCEICGCCCCCCECCCCCGECEGCICECCCCCCCGGCCCCCCCGGCCCECICEGCCCECECCEECCKCICEEKCCCCICECGC.iinCisJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAWAAAAAQAAAAAWAAAAAAAAAAAAOAAAAAAIiLOMsK6K0KAQAwMAAeAA+KAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAguCACAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAoqBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAA0vCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAg7y6RAAAAAAAAAQAAsCAAAAAA++BAACCACIAAAAAAAAqMAmCAkaACCCACAACAgBAAAAAAAAAAAAAAAgNAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyKAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyqCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
}
// node_modules/iconv-lite/dist/encodings/tables/gb18030-ranges.js
let table$2;
function getTable$2() {
	return table$2 || (table$2 = {
		"uChars": [
			128,
			165,
			169,
			178,
			184,
			216,
			226,
			235,
			238,
			244,
			248,
			251,
			253,
			258,
			276,
			284,
			300,
			325,
			329,
			334,
			364,
			463,
			465,
			467,
			469,
			471,
			473,
			475,
			477,
			506,
			594,
			610,
			712,
			716,
			730,
			930,
			938,
			962,
			970,
			1026,
			1104,
			1106,
			8209,
			8215,
			8218,
			8222,
			8231,
			8241,
			8244,
			8246,
			8252,
			8365,
			8452,
			8454,
			8458,
			8471,
			8482,
			8556,
			8570,
			8596,
			8602,
			8713,
			8720,
			8722,
			8726,
			8731,
			8737,
			8740,
			8742,
			8748,
			8751,
			8760,
			8766,
			8777,
			8781,
			8787,
			8802,
			8808,
			8816,
			8854,
			8858,
			8870,
			8896,
			8979,
			9322,
			9372,
			9548,
			9588,
			9616,
			9622,
			9634,
			9652,
			9662,
			9672,
			9676,
			9680,
			9702,
			9735,
			9738,
			9793,
			9795,
			11906,
			11909,
			11913,
			11917,
			11928,
			11944,
			11947,
			11951,
			11956,
			11960,
			11964,
			11979,
			12284,
			12292,
			12312,
			12319,
			12330,
			12351,
			12436,
			12447,
			12535,
			12543,
			12586,
			12842,
			12850,
			12964,
			13200,
			13215,
			13218,
			13253,
			13263,
			13267,
			13270,
			13384,
			13428,
			13727,
			13839,
			13851,
			14617,
			14703,
			14801,
			14816,
			14964,
			15183,
			15471,
			15585,
			16471,
			16736,
			17208,
			17325,
			17330,
			17374,
			17623,
			17997,
			18018,
			18212,
			18218,
			18301,
			18318,
			18760,
			18811,
			18814,
			18820,
			18823,
			18844,
			18848,
			18872,
			19576,
			19620,
			19738,
			19887,
			40870,
			59244,
			59336,
			59367,
			59413,
			59417,
			59423,
			59431,
			59437,
			59443,
			59452,
			59460,
			59478,
			59493,
			63789,
			63866,
			63894,
			63976,
			63986,
			64016,
			64018,
			64021,
			64025,
			64034,
			64037,
			64042,
			65074,
			65093,
			65107,
			65112,
			65127,
			65132,
			65375,
			65510,
			65536
		],
		"gbChars": [
			0,
			36,
			38,
			45,
			50,
			81,
			89,
			95,
			96,
			100,
			103,
			104,
			105,
			109,
			126,
			133,
			148,
			172,
			175,
			179,
			208,
			306,
			307,
			308,
			309,
			310,
			311,
			312,
			313,
			341,
			428,
			443,
			544,
			545,
			558,
			741,
			742,
			749,
			750,
			805,
			819,
			820,
			7922,
			7924,
			7925,
			7927,
			7934,
			7943,
			7944,
			7945,
			7950,
			8062,
			8148,
			8149,
			8152,
			8164,
			8174,
			8236,
			8240,
			8262,
			8264,
			8374,
			8380,
			8381,
			8384,
			8388,
			8390,
			8392,
			8393,
			8394,
			8396,
			8401,
			8406,
			8416,
			8419,
			8424,
			8437,
			8439,
			8445,
			8482,
			8485,
			8496,
			8521,
			8603,
			8936,
			8946,
			9046,
			9050,
			9063,
			9066,
			9076,
			9092,
			9100,
			9108,
			9111,
			9113,
			9131,
			9162,
			9164,
			9218,
			9219,
			11329,
			11331,
			11334,
			11336,
			11346,
			11361,
			11363,
			11366,
			11370,
			11372,
			11375,
			11389,
			11682,
			11686,
			11687,
			11692,
			11694,
			11714,
			11716,
			11723,
			11725,
			11730,
			11736,
			11982,
			11989,
			12102,
			12336,
			12348,
			12350,
			12384,
			12393,
			12395,
			12397,
			12510,
			12553,
			12851,
			12962,
			12973,
			13738,
			13823,
			13919,
			13933,
			14080,
			14298,
			14585,
			14698,
			15583,
			15847,
			16318,
			16434,
			16438,
			16481,
			16729,
			17102,
			17122,
			17315,
			17320,
			17402,
			17418,
			17859,
			17909,
			17911,
			17915,
			17916,
			17936,
			17939,
			17961,
			18664,
			18703,
			18814,
			18962,
			19043,
			33469,
			33470,
			33471,
			33484,
			33485,
			33490,
			33497,
			33501,
			33505,
			33513,
			33520,
			33536,
			33550,
			37845,
			37921,
			37948,
			38029,
			38038,
			38064,
			38065,
			38066,
			38069,
			38075,
			38076,
			38078,
			39108,
			39109,
			39113,
			39114,
			39115,
			39116,
			39265,
			39394,
			189e3
		]
	});
}
// node_modules/iconv-lite/dist/encodings/tables/gbk-added.js
let table$1;
function getTable$1() {
	return table$1 || (table$1 = [
		[
			"a140",
			"",
			62
		],
		[
			"a180",
			"",
			32
		],
		[
			"a240",
			"",
			62
		],
		[
			"a280",
			"",
			32
		],
		[
			"a2ab",
			"",
			5
		],
		["a2e3", "€"],
		["a2ef", ""],
		["a2fd", ""],
		[
			"a340",
			"",
			62
		],
		[
			"a380",
			"",
			31,
			"　"
		],
		[
			"a440",
			"",
			62
		],
		[
			"a480",
			"",
			32
		],
		[
			"a4f4",
			"",
			10
		],
		[
			"a540",
			"",
			62
		],
		[
			"a580",
			"",
			32
		],
		[
			"a5f7",
			"",
			7
		],
		[
			"a640",
			"",
			62
		],
		[
			"a680",
			"",
			32
		],
		[
			"a6b9",
			"",
			7
		],
		["a6d9", "︐︒︑︓︔︕︖"],
		["a6ec", "︗︘"],
		["a6f3", "︙"],
		[
			"a6f6",
			"",
			8
		],
		[
			"a740",
			"",
			62
		],
		[
			"a780",
			"",
			32
		],
		[
			"a7c2",
			"",
			14
		],
		[
			"a7f2",
			"",
			12
		],
		[
			"a896",
			"",
			10
		],
		["a8bc", "ḿ"],
		["a8bf", "ǹ"],
		["a8c1", ""],
		[
			"a8ea",
			"",
			20
		],
		["a958", ""],
		["a95b", ""],
		["a95d", ""],
		[
			"a989",
			"〾⿰",
			11
		],
		[
			"a997",
			"",
			12
		],
		[
			"a9f0",
			"",
			14
		],
		[
			"aaa1",
			"",
			93
		],
		[
			"aba1",
			"",
			93
		],
		[
			"aca1",
			"",
			93
		],
		[
			"ada1",
			"",
			93
		],
		[
			"aea1",
			"",
			93
		],
		[
			"afa1",
			"",
			93
		],
		[
			"d7fa",
			"",
			4
		],
		[
			"f8a1",
			"",
			93
		],
		[
			"f9a1",
			"",
			93
		],
		[
			"faa1",
			"",
			93
		],
		[
			"fba1",
			"",
			93
		],
		[
			"fca1",
			"",
			93
		],
		[
			"fda1",
			"",
			93
		],
		["fe50", "⺁⺄㑳㑇⺈⺋龴㖞㘚㘎⺌⺗㥮㤘龵㧏㧟㩳㧐龶龷㭎㱮㳠⺧龸⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌龹"],
		[
			"fe80",
			"䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶龺䲣䲟䲠䲡䱷䲢䴓",
			6,
			"䶮龻",
			93
		],
		["8135f437", ""]
	]);
}
// node_modules/iconv-lite/dist/encodings/tables/shiftjis.js
let table;
function getTable() {
	return table || (table = "A.A.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.iI+DGCCCECCECCCCCCEECCGCCCCCCCCCCEEEECCCCUCCCCCCCCCECCCCCECCCECCCCCCCCCCCCCCCCCCCCCCECCCCEECCECCCCCCCCCCCCECCCCECCCCCECCU0B0BmF+DuBiBOiBOMC0BMCQkBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCoBUCCCCCCCCCCCCCCCCGECCCCCCCCKECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCECCCCCECCCCCCCCCECCCGCECCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCECCCCECCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCECCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCECCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEECCCCCCCECCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEECCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCECCCCECCCCCGCCCCECCCEGCCCCCCCCCCCCCCECCGCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCECCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCECCCECCECCCGECCCEECCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCECECECCCCCCCCCCCCCCCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECECCCCCCCCCCCCCCCCECCCCCCCECCCCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCECCCECECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCECCCCCCCCCCCCICCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCECCCCECCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCECCCCCECCECECCCCCCEECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEECCCCCCCCCCCCECIECCCCECCCCCCEECCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCECCCCCCCCCCCGCCCCCCCCCECGECCCCCCCCCGECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCGCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCCCCCEECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCUCCCC+D6H+D6H+D6H+D6H+D6H+D6H+D6H+D6H+D6H+D6HUUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCCCECCCCCCCCEECCCCCCCCCCCCECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCECCCCCCCCCCCCCCCCC.gCgmgCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWAAAAAQAAAAAWAAAAAAAAAAAAOAAAAAAIkFOOI8ECQAQAyGAAeAACaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAioBACAAAAAAAAAAAAAAAAAAAQCAAAAAAAAAAAAAAAAAAAAAAkQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmkgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2pBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAmUCmECmECmECmECmECmECmECmECmECmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmEAAAAAAAAAAAA");
}
// node_modules/iconv-lite/dist/encodings/index.js
const modules = [
	internal_default,
	utf32_exports,
	utf16_exports,
	utf7_exports,
	iso2022jp_exports,
	sbcs_codec_exports,
	sbcs_data_default,
	sbcs_data_generated_default,
	dbcs_codec_exports,
	{
		shiftjis: {
			type: "_dbcs",
			table: getTable,
			leadBytes: [[129, 159], [224, 252]],
			encodeAdd: {
				"¥": 92,
				"‾": 126
			},
			encodeSkipVals: [{
				from: 60736,
				to: 63996
			}]
		},
		csshiftjis: "shiftjis",
		mskanji: "shiftjis",
		sjis: "shiftjis",
		windows31j: "shiftjis",
		ms31j: "shiftjis",
		xsjis: "shiftjis",
		windows932: "shiftjis",
		ms932: "shiftjis",
		932: "shiftjis",
		cp932: "shiftjis",
		eucjp: {
			type: "_dbcs",
			table: getTable$3,
			eucjp: true,
			leadBytes: [[142, 143], [161, 254]],
			encodeAdd: {
				"¥": 92,
				"‾": 126
			}
		},
		gb2312: "cp936",
		gb231280: "cp936",
		gb23121980: "cp936",
		csgb2312: "cp936",
		csiso58gb231280: "cp936",
		euccn: "cp936",
		windows936: "cp936",
		ms936: "cp936",
		936: "cp936",
		cp936: {
			type: "_dbcs",
			table: getTable$6
		},
		gbk: {
			type: "_dbcs",
			table: function() {
				return [getTable$6(), getTable$1()];
			},
			gb18030Decode: getTable$2,
			encodeSkipVals: [0x8135f437]
		},
		xgbk: "gbk",
		isoir58: "gbk",
		gb18030: {
			type: "_dbcs",
			table: function() {
				return [getTable$6(), getTable$1()];
			},
			gb18030: getTable$2,
			gb18030EncoderTable: {
				58853: null,
				59277: 42713,
				59278: 42714,
				59279: 42715,
				59280: 42716,
				59281: 42717,
				59282: 42718,
				59283: 42719,
				59284: 42732,
				59285: 42733,
				59286: 42739,
				59422: 65113,
				59430: 65121,
				59435: 65126,
				59436: 65127,
				59442: 65133,
				59459: 65150,
				59476: 65168,
				59492: 65184
			},
			encodeSkipVals: [128],
			encodeAdd: { "€": 41699 }
		},
		chinese: "gb18030",
		windows949: "cp949",
		ms949: "cp949",
		949: "cp949",
		cp949: {
			type: "_dbcs",
			table: getTable$5,
			leadBytes: [[129, 254]]
		},
		cseuckr: "cp949",
		csksc56011987: "cp949",
		euckr: "cp949",
		isoir149: "cp949",
		korean: "cp949",
		ksc56011987: "cp949",
		ksc56011989: "cp949",
		ksc5601: "cp949",
		windows950: "cp950",
		ms950: "cp950",
		950: "cp950",
		cp950: {
			type: "_dbcs",
			table: getTable$4
		},
		big5: "big5hkscs",
		big5hkscs: {
			type: "_dbcs",
			leadBytes: [[129, 254]],
			table: function() {
				return [getTable$4(), getTable$7()];
			},
			encodeSkipVals: [
				36457,
				36463,
				36478,
				36523,
				36532,
				36557,
				36560,
				36695,
				36713,
				36718,
				36811,
				36862,
				36973,
				36986,
				37060,
				37084,
				37105,
				37311,
				37551,
				37552,
				37553,
				37554,
				37585,
				37959,
				38090,
				38361,
				38652,
				39285,
				39798,
				39800,
				39803,
				39878,
				39902,
				39916,
				39926,
				40002,
				40019,
				40034,
				40040,
				40043,
				40055,
				40124,
				40125,
				40144,
				40279,
				40282,
				40388,
				40431,
				40443,
				40617,
				40687,
				40701,
				40800,
				40907,
				41079,
				41180,
				41183,
				36812,
				37576,
				38468,
				38637,
				41636,
				41637,
				41639,
				41638,
				41676,
				41678
			]
		},
		cnbig5: "big5hkscs",
		csbig5: "big5hkscs",
		xxbig5: "big5hkscs"
	},
	{
		1200: "utf16le",
		cp1200: "utf16le",
		1201: "utf16be",
		cp1201: "utf16be",
		12e3: "utf32le",
		cp12000: "utf32le",
		12001: "utf32be",
		cp12001: "utf32be",
		65e3: "utf7",
		cp65000: "utf7",
		65001: "utf8",
		cp65001: "utf8",
		20127: "cp20127",
		cp20127: sbcs_data_generated_default.ascii,
		cp367: "cp20127",
		ibm367: "cp20127",
		28591: "cp28591",
		cp28591: sbcs_data_generated_default.iso88591,
		28599: "cp28599",
		cp28599: sbcs_data_generated_default.iso88599,
		28601: "cp28601",
		cp28601: sbcs_data_generated_default.iso885911,
		21866: "cp21866",
		cp21866: sbcs_data_generated_default.koi8u,
		ibm1168: "cp21866"
	},
	{
		ascii: "windows1252",
		iso88591: "windows1252",
		iso88599: "windows1254",
		iso885911: "windows874",
		tis620: "windows874",
		xcp1250: "windows1250",
		xcp1251: "windows1251",
		xcp1252: "windows1252",
		xcp1253: "windows1253",
		xcp1254: "windows1254",
		xcp1255: "windows1255",
		xcp1256: "windows1256",
		xcp1257: "windows1257",
		xcp1258: "windows1258",
		dos874: "windows874",
		csiso88596e: "iso88596",
		iso88596e: "iso88596",
		csiso88596i: "iso88596",
		iso88596i: "iso88596",
		csiso88598e: "iso88598",
		iso88598e: "iso88598",
		csiso88598i: "iso88598",
		iso88598i: "iso88598",
		visual: "iso88598",
		logical: "iso88598",
		csisolatin9: "iso885915",
		suneugreek: "iso88597",
		koi: "koi8r",
		koi8: "koi8r",
		koi8u: "koi8ru",
		xmacukrainian: "xmaccyrillic",
		xmacroman: "macintosh",
		xeucjp: "eucjp",
		cseucpkdfmtjapanese: "eucjp",
		unicode20utf8: "utf8",
		xunicode20utf8: "utf8"
	}
];
function getEncodings() {
	return Object.assign(Object.create(null), ...modules);
}
// node_modules/iconv-lite/dist/lib/utils.js
function canonicalizeEncoding(encoding) {
	encoding = "" + encoding;
	let start = 0;
	let end = encoding.length;
	while (start < end && isAsciiWhitespace(encoding.charCodeAt(start))) start++;
	while (end > start && isAsciiWhitespace(encoding.charCodeAt(end - 1))) end--;
	const label = encoding.slice(start, end);
	for (let i = 0; i < label.length; i++) {
		const code = label.charCodeAt(i);
		if (code <= 8 || code === 11 || code >= 14 && code <= 31 || code >= 127) return label;
	}
	return label.toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
}
function isAsciiWhitespace(code) {
	return code === 32 || code === 9 || code === 10 || code === 12 || code === 13;
}
// node_modules/iconv-lite/dist/lib/encoding-registry.js
var _EncodingRegistry;
var EncodingRegistry = class EncodingRegistry {
	static extend(registry, definitions, options = {}) {
		if (!definitions || typeof definitions !== "object" || Array.isArray(definitions)) throw new TypeError("Encoding definitions must be an object");
		if (!options || typeof options !== "object" || Array.isArray(options) || options.replace !== void 0 && typeof options.replace !== "boolean") throw new TypeError("Encoding registration options must contain a boolean replace option");
		const additions = Object.create(null);
		for (const [label, definition] of Object.entries(definitions)) {
			const name = _assertClassBrand(EncodingRegistry, this, _key).call(this, label, registry);
			if (Object.hasOwn(additions, name) && !_assertClassBrand(EncodingRegistry, this, _same).call(this, additions[name], definition)) throw new Error("Duplicate encoding label: " + label);
			additions[name] = definition;
		}
		const next = Object.assign(Object.create(null), registry, additions);
		let changed = false;
		for (const name of Object.keys(additions)) {
			const definition = _assertClassBrand(EncodingRegistry, this, _definition).call(this, additions[name], next);
			if (Object.hasOwn(registry, name) && _assertClassBrand(EncodingRegistry, this, _same).call(this, registry[name], definition)) {
				next[name] = registry[name];
				continue;
			}
			if (Object.hasOwn(registry, name) && !options.replace) throw new Error("Encoding already registered: " + name);
			next[name] = definition;
			changed = true;
		}
		for (const name of Object.keys(additions)) _assertClassBrand(EncodingRegistry, this, _validateAlias).call(this, name, next);
		return changed ? next : registry;
	}
};
_EncodingRegistry = EncodingRegistry;
function _key(label, registry) {
	if (typeof label !== "string") throw new TypeError("Encoding labels must be strings");
	if (Object.hasOwn(registry, label)) return label;
	const name = canonicalizeEncoding(label);
	if (!/^[a-z0-9]+$/.test(name)) throw new TypeError("Invalid encoding label: " + label);
	return name;
}
function _definition(definition, registry) {
	if (typeof definition === "string") return _assertClassBrand(_EncodingRegistry, this, _key).call(this, definition, registry);
	if (typeof definition === "function") {
		try {
			Reflect.construct(Object, [], definition);
		} catch (_unused) {
			throw new TypeError("Encoding codecs must be constructors");
		}
		return definition;
	}
	if (definition && typeof definition === "object" && !Array.isArray(definition) && Object.hasOwn(definition, "type") && typeof definition.type === "string") return {
		...definition,
		type: _assertClassBrand(_EncodingRegistry, this, _key).call(this, definition.type, registry)
	};
	throw new TypeError("An encoding definition must be a codec constructor, alias, or object with a type");
}
function _same(left, right) {
	if (left === right) return true;
	if (!left || !right || typeof left !== "object" || typeof right !== "object") return false;
	const keys = Object.keys(left);
	return keys.length === Object.keys(right).length && keys.every((key) => Object.hasOwn(right, key) && Object.is(Reflect.get(left, key), Reflect.get(right, key)));
}
function _validateAlias(name, registry) {
	const seen = /* @__PURE__ */ new Set();
	while (true) {
		if (seen.has(name)) throw new Error("Encoding alias cycle: " + name);
		seen.add(name);
		const definition = registry[name];
		if (typeof definition === "function") return;
		if (typeof definition === "string") name = definition;
		else if (definition && typeof definition.type === "string") name = definition.type;
		else throw new Error("Encoding alias target not found: " + name);
	}
}
// node_modules/iconv-lite/dist/lib/iconv.js
var _Iconv_brand = /* @__PURE__ */ new WeakSet();
var Iconv = class {
	constructor(backend) {
		_classPrivateMethodInitSpec(this, _Iconv_brand);
		this.encodings = null;
		this._codecDataCache = Object.create(null);
		for (const method of [
			"encode",
			"decode",
			"encodingExists",
			"addEncoding",
			"getCodec",
			"getEncoder",
			"getDecoder",
			"encodeWebStream",
			"decodeWebStream",
			"setBackend"
		]) Object.assign(this, { [method]: this[method].bind(this) });
		this.toEncoding = this.encode;
		this.fromEncoding = this.decode;
		Object.defineProperty(this, "backend", {
			configurable: true,
			get() {
				throw new Error("iconv-lite backend is not set. Please use iconv.setBackend().");
			}
		});
		if (backend !== void 0) this.setBackend(backend);
	}
	encode(str, encoding, options) {
		if (typeof str !== "string") throw new TypeError("iconv-lite can only encode() strings.");
		const encoder = this.getEncoder(encoding, options);
		const res = encoder.write(str);
		if (res === null) return null;
		const trail = encoder.end();
		if (trail === null) return null;
		return trail && trail.length > 0 ? this.backend.concatByteResults([res, trail]) : res;
	}
	decode(buf, encoding, options) {
		if (typeof buf === "string") throw new TypeError("iconv-lite can't decode() strings. Please pass Buffer or Uint8Array instead.");
		const decoder = this.getDecoder(encoding, options);
		if (decoder.decode) return decoder.decode(buf);
		const res = decoder.write(buf);
		const trail = decoder.end();
		return trail ? res + trail : res;
	}
	encodingExists(enc) {
		try {
			this.getCodec(enc);
			return true;
		} catch (e) {
			return false;
		}
	}
	addEncoding(definitions, options) {
		const registry = this.encodings || getEncodings();
		const next = EncodingRegistry.extend(registry, definitions, options);
		this.encodings = next;
		if (next !== registry) this._codecDataCache = Object.create(null);
	}
	getCodec(encoding) {
		if (!this.encodings) this.encodings = getEncodings();
		let enc = canonicalizeEncoding(encoding);
		const cached = this._codecDataCache[enc];
		if (cached) return cached;
		let codecOptions = {};
		const seen = /* @__PURE__ */ new Set();
		let optionsName;
		while (true) {
			if (seen.has(enc)) throw new Error("Encoding alias cycle: " + enc);
			seen.add(enc);
			let codec = optionsName === void 0 && this._codecDataCache[enc];
			if (codec) return codec;
			const codecDef = this.encodings[enc];
			switch (typeof codecDef) {
				case "string":
					enc = codecDef;
					break;
				case "object":
					if (!codecDef) throw new Error("Invalid encoding definition: " + enc);
					if (optionsName === void 0) optionsName = enc;
					codecOptions = {
						...codecDef,
						...codecOptions
					};
					enc = codecDef.type;
					break;
				case "function": {
					const Codec = codecDef;
					codecOptions.encodingName = optionsName === void 0 ? enc : optionsName;
					codec = new Codec(codecOptions, this);
					if (!("createEncoder" in codec && typeof codec.createEncoder === "function") && !("encoder" in codec && typeof codec.encoder === "function") || !("createDecoder" in codec && typeof codec.createDecoder === "function") && !("decoder" in codec && typeof codec.decoder === "function")) throw new TypeError("Codec must provide encoder and decoder factories or constructors: " + enc);
					this._codecDataCache[codecOptions.encodingName] = codec;
					return codec;
				}
				default: throw new Error("Encoding not recognized: '" + encoding + "' (searched as: '" + enc + "')");
			}
		}
	}
	getEncoder(encoding, options) {
		if ((options === null || options === void 0 ? void 0 : options.invalidCharHandler) !== void 0 && typeof options.invalidCharHandler !== "function") throw new TypeError("invalidCharHandler must be a function");
		const codec = this.getCodec(encoding);
		let encoder;
		if ("createEncoder" in codec && codec.createEncoder) encoder = codec.createEncoder(options, this);
		else encoder = new codec.encoder(options, codec, this.backend);
		if (codec.bomAware && options && options.addBOM) encoder = new PrependBOM(encoder);
		return encoder;
	}
	getDecoder(encoding, options) {
		const codec = this.getCodec(encoding);
		let decoder;
		if ("createDecoder" in codec && codec.createDecoder) decoder = codec.createDecoder(options, this);
		else decoder = new codec.decoder(options, codec, this.backend);
		if (codec.bomAware && !(options && options.stripBOM === false)) decoder = new StripBOM(decoder, options);
		return decoder;
	}
	get supportsWebStreams() {
		return typeof TransformStream === "function";
	}
	encodeWebStream(encoding, options) {
		_assertClassBrand(_Iconv_brand, this, _checkWebStreams).call(this);
		return createEncodeWebStream(this.getEncoder(encoding, options));
	}
	decodeWebStream(encoding, options) {
		_assertClassBrand(_Iconv_brand, this, _checkWebStreams).call(this);
		return createDecodeWebStream(this.getDecoder(encoding, options));
	}
	setBackend(backend) {
		Reflect.deleteProperty(this, "backend");
		this.backend = backend;
		this._codecDataCache = Object.create(null);
	}
};
function _checkWebStreams() {
	if (!this.supportsWebStreams) throw new Error("iconv-lite Web Streams require a global TransformStream implementation.");
}
if ("Ā".charCodeAt(0) !== 256) console.error("iconv-lite warning: js files use non-utf8 encoding. See https://github.com/ashtuchkin/iconv-lite/wiki/Javascript-source-file-encodings for more info.");
// node_modules/iconv-lite/dist/lib/streams.js
function streams_default(streamModule) {
	class IconvLiteEncoderStream extends streamModule.Transform {
		constructor(conv, options, iconv) {
			super({
				...options,
				decodeStrings: false
			});
			this.conv = conv;
			this.iconv = iconv;
		}
		_transform(chunk, encoding, done) {
			if (typeof chunk !== "string") return done(/* @__PURE__ */ new Error("Iconv encoding stream needs strings as its input."));
			try {
				const res = this.conv.write(chunk);
				if (res && res.length) this.push(res);
				done();
			} catch (e) {
				done(e);
			}
		}
		_flush(done) {
			try {
				const res = this.conv.end();
				if (res && res.length) this.push(res);
				done();
			} catch (e) {
				done(e);
			}
		}
		collect(cb) {
			const chunks = [];
			this.on("error", cb);
			this.on("data", (chunk) => chunks.push(chunk));
			this.on("end", () => cb(null, this.iconv.backend.concatByteResults(chunks)));
			return this;
		}
	}
	class IconvLiteDecoderStream extends streamModule.Transform {
		constructor(conv, options) {
			super({
				...options,
				encoding: "utf8"
			});
			this.conv = conv;
			this.encoding = "utf8";
		}
		_transform(chunk, encoding, done) {
			if (!(chunk instanceof Uint8Array)) return done(/* @__PURE__ */ new Error("Iconv decoding stream needs Uint8Array-s or Buffers as its input."));
			try {
				const res = this.conv.write(chunk);
				if (res && res.length) this.push(res, this.encoding);
				done();
			} catch (e) {
				done(e);
			}
		}
		_flush(done) {
			try {
				const res = this.conv.end();
				if (res && res.length) this.push(res, this.encoding);
				done();
			} catch (e) {
				done(e);
			}
		}
		collect(cb) {
			let res = "";
			this.on("error", cb);
			this.on("data", (chunk) => {
				res += chunk;
			});
			this.on("end", () => cb(null, res));
			return this;
		}
	}
	return {
		IconvLiteEncoderStream,
		IconvLiteDecoderStream
	};
}
// node_modules/iconv-lite/dist/lib/iconv-node.js
var NodeIconv = class extends Iconv {
	constructor(backend) {
		super(backend);
		const streams = streams_default(node_stream);
		this.IconvLiteEncoderStream = streams.IconvLiteEncoderStream;
		this.IconvLiteDecoderStream = streams.IconvLiteDecoderStream;
		this.supportsStreams = true;
		for (const method of ["encodeStream", "decodeStream"]) Object.assign(this, { [method]: this[method].bind(this) });
	}
	encodeStream(encoding, options) {
		return new this.IconvLiteEncoderStream(this.getEncoder(encoding, options), options, this);
	}
	decodeStream(encoding, options) {
		return new this.IconvLiteDecoderStream(this.getDecoder(encoding, options), options);
	}
};
// node_modules/iconv-lite/dist/lib/index.js
const iconv = new NodeIconv();
const { encode, decode, encodingExists, addEncoding, toEncoding, fromEncoding, getCodec, getEncoder, getDecoder, encodeStream, decodeStream, encodeWebStream, decodeWebStream, setBackend } = iconv;
// node_modules/iconv-lite/dist/lib/index-node.js
iconv.setBackend({
	encodeString(str, encoding) {
		return Buffer.from(str, encoding);
	},
	decodeBytes(bytes, encoding) {
		return (Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength)).toString(encoding);
	},
	copyBytes(bytes) {
		return Buffer.from(bytes);
	},
	allocBytes(numBytes, fill) {
		return Buffer.alloc(numBytes, fill);
	},
	bytesToResult(bytes, finalLen) {
		if (finalLen === 0) return Buffer.alloc(0);
		return Buffer.from(bytes.buffer, bytes.byteOffset, finalLen);
	},
	concatByteResults(bufs) {
		return Buffer.concat(bufs);
	},
	allocRawChars(numChars) {
		const buf = Buffer.alloc(numChars * Uint16Array.BYTES_PER_ELEMENT);
		return new Uint16Array(buf.buffer, buf.byteOffset, numChars);
	},
	rawCharsToResult(rawChars, finalLen) {
		if (finalLen === 0) return "";
		return Buffer.from(rawChars.buffer, rawChars.byteOffset, finalLen * Uint16Array.BYTES_PER_ELEMENT).toString("ucs2");
	}
});
// node_modules/qrcode-generator/dist/qrcode.mjs
/**
* qrcode
* @param typeNumber 1 to 40
* @param errorCorrectionLevel 'L','M','Q','H'
*/
const qrcode = function(typeNumber, errorCorrectionLevel) {
	const PAD0 = 236;
	const PAD1 = 17;
	let _typeNumber = typeNumber;
	const _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
	let _modules = null;
	let _moduleCount = 0;
	let _dataCache = null;
	const _dataList = [];
	const _this = {};
	const makeImpl = function(test, maskPattern) {
		_moduleCount = _typeNumber * 4 + 17;
		_modules = function(moduleCount) {
			const modules = new Array(moduleCount);
			for (let row = 0; row < moduleCount; row += 1) {
				modules[row] = new Array(moduleCount);
				for (let col = 0; col < moduleCount; col += 1) modules[row][col] = null;
			}
			return modules;
		}(_moduleCount);
		setupPositionProbePattern(0, 0);
		setupPositionProbePattern(_moduleCount - 7, 0);
		setupPositionProbePattern(0, _moduleCount - 7);
		setupPositionAdjustPattern();
		setupTimingPattern();
		setupTypeInfo(test, maskPattern);
		if (_typeNumber >= 7) setupTypeNumber(test);
		if (_dataCache == null) _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
		mapData(_dataCache, maskPattern);
	};
	const setupPositionProbePattern = function(row, col) {
		for (let r = -1; r <= 7; r += 1) {
			if (row + r <= -1 || _moduleCount <= row + r) continue;
			for (let c = -1; c <= 7; c += 1) {
				if (col + c <= -1 || _moduleCount <= col + c) continue;
				if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) _modules[row + r][col + c] = true;
				else _modules[row + r][col + c] = false;
			}
		}
	};
	const getBestMaskPattern = function() {
		let minLostPoint = 0;
		let pattern = 0;
		for (let i = 0; i < 8; i += 1) {
			makeImpl(true, i);
			const lostPoint = QRUtil.getLostPoint(_this);
			if (i == 0 || minLostPoint > lostPoint) {
				minLostPoint = lostPoint;
				pattern = i;
			}
		}
		return pattern;
	};
	const setupTimingPattern = function() {
		for (let r = 8; r < _moduleCount - 8; r += 1) {
			if (_modules[r][6] != null) continue;
			_modules[r][6] = r % 2 == 0;
		}
		for (let c = 8; c < _moduleCount - 8; c += 1) {
			if (_modules[6][c] != null) continue;
			_modules[6][c] = c % 2 == 0;
		}
	};
	const setupPositionAdjustPattern = function() {
		const pos = QRUtil.getPatternPosition(_typeNumber);
		for (let i = 0; i < pos.length; i += 1) for (let j = 0; j < pos.length; j += 1) {
			const row = pos[i];
			const col = pos[j];
			if (_modules[row][col] != null) continue;
			for (let r = -2; r <= 2; r += 1) for (let c = -2; c <= 2; c += 1) if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) _modules[row + r][col + c] = true;
			else _modules[row + r][col + c] = false;
		}
	};
	const setupTypeNumber = function(test) {
		const bits = QRUtil.getBCHTypeNumber(_typeNumber);
		for (let i = 0; i < 18; i += 1) {
			const mod = !test && (bits >> i & 1) == 1;
			_modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
		}
		for (let i = 0; i < 18; i += 1) {
			const mod = !test && (bits >> i & 1) == 1;
			_modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
		}
	};
	const setupTypeInfo = function(test, maskPattern) {
		const data = _errorCorrectionLevel << 3 | maskPattern;
		const bits = QRUtil.getBCHTypeInfo(data);
		for (let i = 0; i < 15; i += 1) {
			const mod = !test && (bits >> i & 1) == 1;
			if (i < 6) _modules[i][8] = mod;
			else if (i < 8) _modules[i + 1][8] = mod;
			else _modules[_moduleCount - 15 + i][8] = mod;
		}
		for (let i = 0; i < 15; i += 1) {
			const mod = !test && (bits >> i & 1) == 1;
			if (i < 8) _modules[8][_moduleCount - i - 1] = mod;
			else if (i < 9) _modules[8][15 - i - 1 + 1] = mod;
			else _modules[8][15 - i - 1] = mod;
		}
		_modules[_moduleCount - 8][8] = !test;
	};
	const mapData = function(data, maskPattern) {
		let inc = -1;
		let row = _moduleCount - 1;
		let bitIndex = 7;
		let byteIndex = 0;
		const maskFunc = QRUtil.getMaskFunction(maskPattern);
		for (let col = _moduleCount - 1; col > 0; col -= 2) {
			if (col == 6) col -= 1;
			while (true) {
				for (let c = 0; c < 2; c += 1) if (_modules[row][col - c] == null) {
					let dark = false;
					if (byteIndex < data.length) dark = (data[byteIndex] >>> bitIndex & 1) == 1;
					if (maskFunc(row, col - c)) dark = !dark;
					_modules[row][col - c] = dark;
					bitIndex -= 1;
					if (bitIndex == -1) {
						byteIndex += 1;
						bitIndex = 7;
					}
				}
				row += inc;
				if (row < 0 || _moduleCount <= row) {
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
	};
	const createBytes = function(buffer, rsBlocks) {
		let offset = 0;
		let maxDcCount = 0;
		let maxEcCount = 0;
		const dcdata = new Array(rsBlocks.length);
		const ecdata = new Array(rsBlocks.length);
		for (let r = 0; r < rsBlocks.length; r += 1) {
			const dcCount = rsBlocks[r].dataCount;
			const ecCount = rsBlocks[r].totalCount - dcCount;
			maxDcCount = Math.max(maxDcCount, dcCount);
			maxEcCount = Math.max(maxEcCount, ecCount);
			dcdata[r] = new Array(dcCount);
			for (let i = 0; i < dcdata[r].length; i += 1) dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
			offset += dcCount;
			const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
			const modPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1).mod(rsPoly);
			ecdata[r] = new Array(rsPoly.getLength() - 1);
			for (let i = 0; i < ecdata[r].length; i += 1) {
				const modIndex = i + modPoly.getLength() - ecdata[r].length;
				ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
			}
		}
		let totalCodeCount = 0;
		for (let i = 0; i < rsBlocks.length; i += 1) totalCodeCount += rsBlocks[i].totalCount;
		const data = new Array(totalCodeCount);
		let index = 0;
		for (let i = 0; i < maxDcCount; i += 1) for (let r = 0; r < rsBlocks.length; r += 1) if (i < dcdata[r].length) {
			data[index] = dcdata[r][i];
			index += 1;
		}
		for (let i = 0; i < maxEcCount; i += 1) for (let r = 0; r < rsBlocks.length; r += 1) if (i < ecdata[r].length) {
			data[index] = ecdata[r][i];
			index += 1;
		}
		return data;
	};
	const createData = function(typeNumber, errorCorrectionLevel, dataList) {
		const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);
		const buffer = qrBitBuffer();
		for (let i = 0; i < dataList.length; i += 1) {
			const data = dataList[i];
			buffer.put(data.getMode(), 4);
			buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber));
			data.write(buffer);
		}
		let totalDataCount = 0;
		for (let i = 0; i < rsBlocks.length; i += 1) totalDataCount += rsBlocks[i].dataCount;
		if (buffer.getLengthInBits() > totalDataCount * 8) throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
		if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) buffer.put(0, 4);
		while (buffer.getLengthInBits() % 8 != 0) buffer.putBit(false);
		while (true) {
			if (buffer.getLengthInBits() >= totalDataCount * 8) break;
			buffer.put(PAD0, 8);
			if (buffer.getLengthInBits() >= totalDataCount * 8) break;
			buffer.put(PAD1, 8);
		}
		return createBytes(buffer, rsBlocks);
	};
	_this.addData = function(data, mode) {
		mode = mode || "Byte";
		let newData = null;
		switch (mode) {
			case "Numeric":
				newData = qrNumber(data);
				break;
			case "Alphanumeric":
				newData = qrAlphaNum(data);
				break;
			case "Byte":
				newData = qr8BitByte(data);
				break;
			case "Kanji":
				newData = qrKanji(data);
				break;
			default: throw "mode:" + mode;
		}
		_dataList.push(newData);
		_dataCache = null;
	};
	_this.isDark = function(row, col) {
		if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) throw row + "," + col;
		return _modules[row][col];
	};
	_this.getModuleCount = function() {
		return _moduleCount;
	};
	_this.make = function() {
		if (_typeNumber < 1) {
			let typeNumber = 1;
			for (; typeNumber < 40; typeNumber++) {
				const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
				const buffer = qrBitBuffer();
				for (let i = 0; i < _dataList.length; i++) {
					const data = _dataList[i];
					buffer.put(data.getMode(), 4);
					buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber));
					data.write(buffer);
				}
				let totalDataCount = 0;
				for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
				if (buffer.getLengthInBits() <= totalDataCount * 8) break;
			}
			_typeNumber = typeNumber;
		}
		makeImpl(false, getBestMaskPattern());
	};
	_this.createTableTag = function(cellSize, margin) {
		cellSize = cellSize || 2;
		margin = typeof margin == "undefined" ? cellSize * 4 : margin;
		let qrHtml = "";
		qrHtml += "<table style=\"";
		qrHtml += " border-width: 0px; border-style: none;";
		qrHtml += " border-collapse: collapse;";
		qrHtml += " padding: 0px; margin: " + margin + "px;";
		qrHtml += "\">";
		qrHtml += "<tbody>";
		for (let r = 0; r < _this.getModuleCount(); r += 1) {
			qrHtml += "<tr>";
			for (let c = 0; c < _this.getModuleCount(); c += 1) {
				qrHtml += "<td style=\"";
				qrHtml += " border-width: 0px; border-style: none;";
				qrHtml += " border-collapse: collapse;";
				qrHtml += " padding: 0px; margin: 0px;";
				qrHtml += " width: " + cellSize + "px;";
				qrHtml += " height: " + cellSize + "px;";
				qrHtml += " background-color: ";
				qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
				qrHtml += ";";
				qrHtml += "\"/>";
			}
			qrHtml += "</tr>";
		}
		qrHtml += "</tbody>";
		qrHtml += "</table>";
		return qrHtml;
	};
	_this.createSvgTag = function(cellSize, margin, alt, title) {
		let opts = {};
		if (typeof arguments[0] == "object") {
			opts = arguments[0];
			cellSize = opts.cellSize;
			margin = opts.margin;
			alt = opts.alt;
			title = opts.title;
		}
		cellSize = cellSize || 2;
		margin = typeof margin == "undefined" ? cellSize * 4 : margin;
		alt = typeof alt === "string" ? { text: alt } : alt || {};
		alt.text = alt.text || null;
		alt.id = alt.text ? alt.id || "qrcode-description" : null;
		title = typeof title === "string" ? { text: title } : title || {};
		title.text = title.text || null;
		title.id = title.text ? title.id || "qrcode-title" : null;
		const size = _this.getModuleCount() * cellSize + margin * 2;
		let c, mc, r, mr, qrSvg = "", rect;
		rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
		qrSvg += "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"";
		qrSvg += !opts.scalable ? " width=\"" + size + "px\" height=\"" + size + "px\"" : "";
		qrSvg += " viewBox=\"0 0 " + size + " " + size + "\" ";
		qrSvg += " preserveAspectRatio=\"xMinYMin meet\"";
		qrSvg += title.text || alt.text ? " role=\"img\" aria-labelledby=\"" + escapeXml([title.id, alt.id].join(" ").trim()) + "\"" : "";
		qrSvg += ">";
		qrSvg += title.text ? "<title id=\"" + escapeXml(title.id) + "\">" + escapeXml(title.text) + "</title>" : "";
		qrSvg += alt.text ? "<description id=\"" + escapeXml(alt.id) + "\">" + escapeXml(alt.text) + "</description>" : "";
		qrSvg += "<rect width=\"100%\" height=\"100%\" fill=\"white\" cx=\"0\" cy=\"0\"/>";
		qrSvg += "<path d=\"";
		for (r = 0; r < _this.getModuleCount(); r += 1) {
			mr = r * cellSize + margin;
			for (c = 0; c < _this.getModuleCount(); c += 1) if (_this.isDark(r, c)) {
				mc = c * cellSize + margin;
				qrSvg += "M" + mc + "," + mr + rect;
			}
		}
		qrSvg += "\" stroke=\"transparent\" fill=\"black\"/>";
		qrSvg += "</svg>";
		return qrSvg;
	};
	_this.createDataURL = function(cellSize, margin) {
		cellSize = cellSize || 2;
		margin = typeof margin == "undefined" ? cellSize * 4 : margin;
		const size = _this.getModuleCount() * cellSize + margin * 2;
		const min = margin;
		const max = size - margin;
		return createDataURL(size, size, function(x, y) {
			if (min <= x && x < max && min <= y && y < max) {
				const c = Math.floor((x - min) / cellSize);
				const r = Math.floor((y - min) / cellSize);
				return _this.isDark(r, c) ? 0 : 1;
			} else return 1;
		});
	};
	_this.createImgTag = function(cellSize, margin, alt) {
		cellSize = cellSize || 2;
		margin = typeof margin == "undefined" ? cellSize * 4 : margin;
		const size = _this.getModuleCount() * cellSize + margin * 2;
		let img = "";
		img += "<img";
		img += " src=\"";
		img += _this.createDataURL(cellSize, margin);
		img += "\"";
		img += " width=\"";
		img += size;
		img += "\"";
		img += " height=\"";
		img += size;
		img += "\"";
		if (alt) {
			img += " alt=\"";
			img += escapeXml(alt);
			img += "\"";
		}
		img += "/>";
		return img;
	};
	const escapeXml = function(s) {
		let escaped = "";
		for (let i = 0; i < s.length; i += 1) {
			const c = s.charAt(i);
			switch (c) {
				case "<":
					escaped += "&lt;";
					break;
				case ">":
					escaped += "&gt;";
					break;
				case "&":
					escaped += "&amp;";
					break;
				case "\"":
					escaped += "&quot;";
					break;
				default: escaped += c;
			}
		}
		return escaped;
	};
	const _createHalfASCII = function(margin) {
		const cellSize = 1;
		margin = typeof margin == "undefined" ? 2 : margin;
		const size = _this.getModuleCount() * cellSize + margin * 2;
		const min = margin;
		const max = size - margin;
		let y, x, r1, r2, p;
		const blocks = {
			"██": "█",
			"█ ": "▀",
			" █": "▄",
			"  ": " "
		};
		const blocksLastLineNoMargin = {
			"██": "▀",
			"█ ": "▀",
			" █": " ",
			"  ": " "
		};
		let ascii = "";
		for (y = 0; y < size; y += 2) {
			r1 = Math.floor((y - min) / cellSize);
			r2 = Math.floor((y + 1 - min) / cellSize);
			for (x = 0; x < size; x += 1) {
				p = "█";
				if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) p = " ";
				if (min <= x && x < max && min <= y + 1 && y + 1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) p += " ";
				else p += "█";
				ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
			}
			ascii += "\n";
		}
		if (size % 2 && margin > 0) return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("▀");
		return ascii.substring(0, ascii.length - 1);
	};
	_this.createASCII = function(cellSize, margin) {
		cellSize = cellSize || 1;
		if (cellSize < 2) return _createHalfASCII(margin);
		cellSize -= 1;
		margin = typeof margin == "undefined" ? cellSize * 2 : margin;
		const size = _this.getModuleCount() * cellSize + margin * 2;
		const min = margin;
		const max = size - margin;
		let y, x, r, p;
		const white = Array(cellSize + 1).join("██");
		const black = Array(cellSize + 1).join("  ");
		let ascii = "";
		let line = "";
		for (y = 0; y < size; y += 1) {
			r = Math.floor((y - min) / cellSize);
			line = "";
			for (x = 0; x < size; x += 1) {
				p = 1;
				if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) p = 0;
				line += p ? white : black;
			}
			for (r = 0; r < cellSize; r += 1) ascii += line + "\n";
		}
		return ascii.substring(0, ascii.length - 1);
	};
	_this.renderTo2dContext = function(context, cellSize) {
		cellSize = cellSize || 2;
		const length = _this.getModuleCount();
		for (let row = 0; row < length; row++) for (let col = 0; col < length; col++) {
			context.fillStyle = _this.isDark(row, col) ? "black" : "white";
			context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
		}
	};
	return _this;
};
qrcode.stringToBytes = function(s) {
	const bytes = [];
	for (let i = 0; i < s.length; i += 1) {
		const c = s.charCodeAt(i);
		bytes.push(c & 255);
	}
	return bytes;
};
/**
* @param unicodeData base64 string of byte array.
* [16bit Unicode],[16bit Bytes], ...
* @param numChars
*/
qrcode.createStringToBytes = function(unicodeData, numChars) {
	const unicodeMap = function() {
		const bin = base64DecodeInputStream(unicodeData);
		const read = function() {
			const b = bin.read();
			if (b == -1) throw "eof";
			return b;
		};
		let count = 0;
		const unicodeMap = {};
		while (true) {
			const b0 = bin.read();
			if (b0 == -1) break;
			const b1 = read();
			const b2 = read();
			const b3 = read();
			const k = String.fromCharCode(b0 << 8 | b1);
			unicodeMap[k] = b2 << 8 | b3;
			count += 1;
		}
		if (count != numChars) throw count + " != " + numChars;
		return unicodeMap;
	}();
	const unknownChar = "?".charCodeAt(0);
	return function(s) {
		const bytes = [];
		for (let i = 0; i < s.length; i += 1) {
			const c = s.charCodeAt(i);
			if (c < 128) bytes.push(c);
			else {
				const b = unicodeMap[s.charAt(i)];
				if (typeof b == "number") {
					if ((b & 255) == b) bytes.push(b);
					else {
						bytes.push(b >>> 8);
						bytes.push(b & 255);
					}
				} else bytes.push(unknownChar);
			}
		}
		return bytes;
	};
};
const QRMode = {
	MODE_NUMBER: 1,
	MODE_ALPHA_NUM: 2,
	MODE_8BIT_BYTE: 4,
	MODE_KANJI: 8
};
const QRErrorCorrectionLevel = {
	L: 1,
	M: 0,
	Q: 3,
	H: 2
};
const QRMaskPattern = {
	PATTERN000: 0,
	PATTERN001: 1,
	PATTERN010: 2,
	PATTERN011: 3,
	PATTERN100: 4,
	PATTERN101: 5,
	PATTERN110: 6,
	PATTERN111: 7
};
const QRUtil = function() {
	const PATTERN_POSITION_TABLE = [
		[],
		[6, 18],
		[6, 22],
		[6, 26],
		[6, 30],
		[6, 34],
		[
			6,
			22,
			38
		],
		[
			6,
			24,
			42
		],
		[
			6,
			26,
			46
		],
		[
			6,
			28,
			50
		],
		[
			6,
			30,
			54
		],
		[
			6,
			32,
			58
		],
		[
			6,
			34,
			62
		],
		[
			6,
			26,
			46,
			66
		],
		[
			6,
			26,
			48,
			70
		],
		[
			6,
			26,
			50,
			74
		],
		[
			6,
			30,
			54,
			78
		],
		[
			6,
			30,
			56,
			82
		],
		[
			6,
			30,
			58,
			86
		],
		[
			6,
			34,
			62,
			90
		],
		[
			6,
			28,
			50,
			72,
			94
		],
		[
			6,
			26,
			50,
			74,
			98
		],
		[
			6,
			30,
			54,
			78,
			102
		],
		[
			6,
			28,
			54,
			80,
			106
		],
		[
			6,
			32,
			58,
			84,
			110
		],
		[
			6,
			30,
			58,
			86,
			114
		],
		[
			6,
			34,
			62,
			90,
			118
		],
		[
			6,
			26,
			50,
			74,
			98,
			122
		],
		[
			6,
			30,
			54,
			78,
			102,
			126
		],
		[
			6,
			26,
			52,
			78,
			104,
			130
		],
		[
			6,
			30,
			56,
			82,
			108,
			134
		],
		[
			6,
			34,
			60,
			86,
			112,
			138
		],
		[
			6,
			30,
			58,
			86,
			114,
			142
		],
		[
			6,
			34,
			62,
			90,
			118,
			146
		],
		[
			6,
			30,
			54,
			78,
			102,
			126,
			150
		],
		[
			6,
			24,
			50,
			76,
			102,
			128,
			154
		],
		[
			6,
			28,
			54,
			80,
			106,
			132,
			158
		],
		[
			6,
			32,
			58,
			84,
			110,
			136,
			162
		],
		[
			6,
			26,
			54,
			82,
			110,
			138,
			166
		],
		[
			6,
			30,
			58,
			86,
			114,
			142,
			170
		]
	];
	const G15 = 1335;
	const G18 = 7973;
	const G15_MASK = 21522;
	const _this = {};
	const getBCHDigit = function(data) {
		let digit = 0;
		while (data != 0) {
			digit += 1;
			data >>>= 1;
		}
		return digit;
	};
	_this.getBCHTypeInfo = function(data) {
		let d = data << 10;
		while (getBCHDigit(d) - getBCHDigit(G15) >= 0) d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
		return (data << 10 | d) ^ G15_MASK;
	};
	_this.getBCHTypeNumber = function(data) {
		let d = data << 12;
		while (getBCHDigit(d) - getBCHDigit(G18) >= 0) d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
		return data << 12 | d;
	};
	_this.getPatternPosition = function(typeNumber) {
		return PATTERN_POSITION_TABLE[typeNumber - 1];
	};
	_this.getMaskFunction = function(maskPattern) {
		switch (maskPattern) {
			case QRMaskPattern.PATTERN000: return function(i, j) {
				return (i + j) % 2 == 0;
			};
			case QRMaskPattern.PATTERN001: return function(i, j) {
				return i % 2 == 0;
			};
			case QRMaskPattern.PATTERN010: return function(i, j) {
				return j % 3 == 0;
			};
			case QRMaskPattern.PATTERN011: return function(i, j) {
				return (i + j) % 3 == 0;
			};
			case QRMaskPattern.PATTERN100: return function(i, j) {
				return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
			};
			case QRMaskPattern.PATTERN101: return function(i, j) {
				return i * j % 2 + i * j % 3 == 0;
			};
			case QRMaskPattern.PATTERN110: return function(i, j) {
				return (i * j % 2 + i * j % 3) % 2 == 0;
			};
			case QRMaskPattern.PATTERN111: return function(i, j) {
				return (i * j % 3 + (i + j) % 2) % 2 == 0;
			};
			default: throw "bad maskPattern:" + maskPattern;
		}
	};
	_this.getErrorCorrectPolynomial = function(errorCorrectLength) {
		let a = qrPolynomial([1], 0);
		for (let i = 0; i < errorCorrectLength; i += 1) a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
		return a;
	};
	_this.getLengthInBits = function(mode, type) {
		if (1 <= type && type < 10) switch (mode) {
			case QRMode.MODE_NUMBER: return 10;
			case QRMode.MODE_ALPHA_NUM: return 9;
			case QRMode.MODE_8BIT_BYTE: return 8;
			case QRMode.MODE_KANJI: return 8;
			default: throw "mode:" + mode;
		}
		else if (type < 27) switch (mode) {
			case QRMode.MODE_NUMBER: return 12;
			case QRMode.MODE_ALPHA_NUM: return 11;
			case QRMode.MODE_8BIT_BYTE: return 16;
			case QRMode.MODE_KANJI: return 10;
			default: throw "mode:" + mode;
		}
		else if (type < 41) switch (mode) {
			case QRMode.MODE_NUMBER: return 14;
			case QRMode.MODE_ALPHA_NUM: return 13;
			case QRMode.MODE_8BIT_BYTE: return 16;
			case QRMode.MODE_KANJI: return 12;
			default: throw "mode:" + mode;
		}
		else throw "type:" + type;
	};
	_this.getLostPoint = function(qrcode) {
		const moduleCount = qrcode.getModuleCount();
		let lostPoint = 0;
		for (let row = 0; row < moduleCount; row += 1) for (let col = 0; col < moduleCount; col += 1) {
			let sameCount = 0;
			const dark = qrcode.isDark(row, col);
			for (let r = -1; r <= 1; r += 1) {
				if (row + r < 0 || moduleCount <= row + r) continue;
				for (let c = -1; c <= 1; c += 1) {
					if (col + c < 0 || moduleCount <= col + c) continue;
					if (r == 0 && c == 0) continue;
					if (dark == qrcode.isDark(row + r, col + c)) sameCount += 1;
				}
			}
			if (sameCount > 5) lostPoint += 3 + sameCount - 5;
		}
		for (let row = 0; row < moduleCount - 1; row += 1) for (let col = 0; col < moduleCount - 1; col += 1) {
			let count = 0;
			if (qrcode.isDark(row, col)) count += 1;
			if (qrcode.isDark(row + 1, col)) count += 1;
			if (qrcode.isDark(row, col + 1)) count += 1;
			if (qrcode.isDark(row + 1, col + 1)) count += 1;
			if (count == 0 || count == 4) lostPoint += 3;
		}
		for (let row = 0; row < moduleCount; row += 1) for (let col = 0; col < moduleCount - 6; col += 1) if (qrcode.isDark(row, col) && !qrcode.isDark(row, col + 1) && qrcode.isDark(row, col + 2) && qrcode.isDark(row, col + 3) && qrcode.isDark(row, col + 4) && !qrcode.isDark(row, col + 5) && qrcode.isDark(row, col + 6)) lostPoint += 40;
		for (let col = 0; col < moduleCount; col += 1) for (let row = 0; row < moduleCount - 6; row += 1) if (qrcode.isDark(row, col) && !qrcode.isDark(row + 1, col) && qrcode.isDark(row + 2, col) && qrcode.isDark(row + 3, col) && qrcode.isDark(row + 4, col) && !qrcode.isDark(row + 5, col) && qrcode.isDark(row + 6, col)) lostPoint += 40;
		let darkCount = 0;
		for (let col = 0; col < moduleCount; col += 1) for (let row = 0; row < moduleCount; row += 1) if (qrcode.isDark(row, col)) darkCount += 1;
		const ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
		lostPoint += ratio * 10;
		return lostPoint;
	};
	return _this;
}();
const QRMath = function() {
	const EXP_TABLE = new Array(256);
	const LOG_TABLE = new Array(256);
	for (let i = 0; i < 8; i += 1) EXP_TABLE[i] = 1 << i;
	for (let i = 8; i < 256; i += 1) EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
	for (let i = 0; i < 255; i += 1) LOG_TABLE[EXP_TABLE[i]] = i;
	const _this = {};
	_this.glog = function(n) {
		if (n < 1) throw "glog(" + n + ")";
		return LOG_TABLE[n];
	};
	_this.gexp = function(n) {
		while (n < 0) n += 255;
		while (n >= 256) n -= 255;
		return EXP_TABLE[n];
	};
	return _this;
}();
const qrPolynomial = function(num, shift) {
	if (typeof num.length == "undefined") throw num.length + "/" + shift;
	const _num = function() {
		let offset = 0;
		while (offset < num.length && num[offset] == 0) offset += 1;
		const _num = new Array(num.length - offset + shift);
		for (let i = 0; i < num.length - offset; i += 1) _num[i] = num[i + offset];
		return _num;
	}();
	const _this = {};
	_this.getAt = function(index) {
		return _num[index];
	};
	_this.getLength = function() {
		return _num.length;
	};
	_this.multiply = function(e) {
		const num = new Array(_this.getLength() + e.getLength() - 1);
		for (let i = 0; i < _this.getLength(); i += 1) for (let j = 0; j < e.getLength(); j += 1) num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
		return qrPolynomial(num, 0);
	};
	_this.mod = function(e) {
		if (_this.getLength() - e.getLength() < 0) return _this;
		const ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
		const num = new Array(_this.getLength());
		for (let i = 0; i < _this.getLength(); i += 1) num[i] = _this.getAt(i);
		for (let i = 0; i < e.getLength(); i += 1) num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
		return qrPolynomial(num, 0).mod(e);
	};
	return _this;
};
const QRRSBlock = function() {
	const RS_BLOCK_TABLE = [
		[
			1,
			26,
			19
		],
		[
			1,
			26,
			16
		],
		[
			1,
			26,
			13
		],
		[
			1,
			26,
			9
		],
		[
			1,
			44,
			34
		],
		[
			1,
			44,
			28
		],
		[
			1,
			44,
			22
		],
		[
			1,
			44,
			16
		],
		[
			1,
			70,
			55
		],
		[
			1,
			70,
			44
		],
		[
			2,
			35,
			17
		],
		[
			2,
			35,
			13
		],
		[
			1,
			100,
			80
		],
		[
			2,
			50,
			32
		],
		[
			2,
			50,
			24
		],
		[
			4,
			25,
			9
		],
		[
			1,
			134,
			108
		],
		[
			2,
			67,
			43
		],
		[
			2,
			33,
			15,
			2,
			34,
			16
		],
		[
			2,
			33,
			11,
			2,
			34,
			12
		],
		[
			2,
			86,
			68
		],
		[
			4,
			43,
			27
		],
		[
			4,
			43,
			19
		],
		[
			4,
			43,
			15
		],
		[
			2,
			98,
			78
		],
		[
			4,
			49,
			31
		],
		[
			2,
			32,
			14,
			4,
			33,
			15
		],
		[
			4,
			39,
			13,
			1,
			40,
			14
		],
		[
			2,
			121,
			97
		],
		[
			2,
			60,
			38,
			2,
			61,
			39
		],
		[
			4,
			40,
			18,
			2,
			41,
			19
		],
		[
			4,
			40,
			14,
			2,
			41,
			15
		],
		[
			2,
			146,
			116
		],
		[
			3,
			58,
			36,
			2,
			59,
			37
		],
		[
			4,
			36,
			16,
			4,
			37,
			17
		],
		[
			4,
			36,
			12,
			4,
			37,
			13
		],
		[
			2,
			86,
			68,
			2,
			87,
			69
		],
		[
			4,
			69,
			43,
			1,
			70,
			44
		],
		[
			6,
			43,
			19,
			2,
			44,
			20
		],
		[
			6,
			43,
			15,
			2,
			44,
			16
		],
		[
			4,
			101,
			81
		],
		[
			1,
			80,
			50,
			4,
			81,
			51
		],
		[
			4,
			50,
			22,
			4,
			51,
			23
		],
		[
			3,
			36,
			12,
			8,
			37,
			13
		],
		[
			2,
			116,
			92,
			2,
			117,
			93
		],
		[
			6,
			58,
			36,
			2,
			59,
			37
		],
		[
			4,
			46,
			20,
			6,
			47,
			21
		],
		[
			7,
			42,
			14,
			4,
			43,
			15
		],
		[
			4,
			133,
			107
		],
		[
			8,
			59,
			37,
			1,
			60,
			38
		],
		[
			8,
			44,
			20,
			4,
			45,
			21
		],
		[
			12,
			33,
			11,
			4,
			34,
			12
		],
		[
			3,
			145,
			115,
			1,
			146,
			116
		],
		[
			4,
			64,
			40,
			5,
			65,
			41
		],
		[
			11,
			36,
			16,
			5,
			37,
			17
		],
		[
			11,
			36,
			12,
			5,
			37,
			13
		],
		[
			5,
			109,
			87,
			1,
			110,
			88
		],
		[
			5,
			65,
			41,
			5,
			66,
			42
		],
		[
			5,
			54,
			24,
			7,
			55,
			25
		],
		[
			11,
			36,
			12,
			7,
			37,
			13
		],
		[
			5,
			122,
			98,
			1,
			123,
			99
		],
		[
			7,
			73,
			45,
			3,
			74,
			46
		],
		[
			15,
			43,
			19,
			2,
			44,
			20
		],
		[
			3,
			45,
			15,
			13,
			46,
			16
		],
		[
			1,
			135,
			107,
			5,
			136,
			108
		],
		[
			10,
			74,
			46,
			1,
			75,
			47
		],
		[
			1,
			50,
			22,
			15,
			51,
			23
		],
		[
			2,
			42,
			14,
			17,
			43,
			15
		],
		[
			5,
			150,
			120,
			1,
			151,
			121
		],
		[
			9,
			69,
			43,
			4,
			70,
			44
		],
		[
			17,
			50,
			22,
			1,
			51,
			23
		],
		[
			2,
			42,
			14,
			19,
			43,
			15
		],
		[
			3,
			141,
			113,
			4,
			142,
			114
		],
		[
			3,
			70,
			44,
			11,
			71,
			45
		],
		[
			17,
			47,
			21,
			4,
			48,
			22
		],
		[
			9,
			39,
			13,
			16,
			40,
			14
		],
		[
			3,
			135,
			107,
			5,
			136,
			108
		],
		[
			3,
			67,
			41,
			13,
			68,
			42
		],
		[
			15,
			54,
			24,
			5,
			55,
			25
		],
		[
			15,
			43,
			15,
			10,
			44,
			16
		],
		[
			4,
			144,
			116,
			4,
			145,
			117
		],
		[
			17,
			68,
			42
		],
		[
			17,
			50,
			22,
			6,
			51,
			23
		],
		[
			19,
			46,
			16,
			6,
			47,
			17
		],
		[
			2,
			139,
			111,
			7,
			140,
			112
		],
		[
			17,
			74,
			46
		],
		[
			7,
			54,
			24,
			16,
			55,
			25
		],
		[
			34,
			37,
			13
		],
		[
			4,
			151,
			121,
			5,
			152,
			122
		],
		[
			4,
			75,
			47,
			14,
			76,
			48
		],
		[
			11,
			54,
			24,
			14,
			55,
			25
		],
		[
			16,
			45,
			15,
			14,
			46,
			16
		],
		[
			6,
			147,
			117,
			4,
			148,
			118
		],
		[
			6,
			73,
			45,
			14,
			74,
			46
		],
		[
			11,
			54,
			24,
			16,
			55,
			25
		],
		[
			30,
			46,
			16,
			2,
			47,
			17
		],
		[
			8,
			132,
			106,
			4,
			133,
			107
		],
		[
			8,
			75,
			47,
			13,
			76,
			48
		],
		[
			7,
			54,
			24,
			22,
			55,
			25
		],
		[
			22,
			45,
			15,
			13,
			46,
			16
		],
		[
			10,
			142,
			114,
			2,
			143,
			115
		],
		[
			19,
			74,
			46,
			4,
			75,
			47
		],
		[
			28,
			50,
			22,
			6,
			51,
			23
		],
		[
			33,
			46,
			16,
			4,
			47,
			17
		],
		[
			8,
			152,
			122,
			4,
			153,
			123
		],
		[
			22,
			73,
			45,
			3,
			74,
			46
		],
		[
			8,
			53,
			23,
			26,
			54,
			24
		],
		[
			12,
			45,
			15,
			28,
			46,
			16
		],
		[
			3,
			147,
			117,
			10,
			148,
			118
		],
		[
			3,
			73,
			45,
			23,
			74,
			46
		],
		[
			4,
			54,
			24,
			31,
			55,
			25
		],
		[
			11,
			45,
			15,
			31,
			46,
			16
		],
		[
			7,
			146,
			116,
			7,
			147,
			117
		],
		[
			21,
			73,
			45,
			7,
			74,
			46
		],
		[
			1,
			53,
			23,
			37,
			54,
			24
		],
		[
			19,
			45,
			15,
			26,
			46,
			16
		],
		[
			5,
			145,
			115,
			10,
			146,
			116
		],
		[
			19,
			75,
			47,
			10,
			76,
			48
		],
		[
			15,
			54,
			24,
			25,
			55,
			25
		],
		[
			23,
			45,
			15,
			25,
			46,
			16
		],
		[
			13,
			145,
			115,
			3,
			146,
			116
		],
		[
			2,
			74,
			46,
			29,
			75,
			47
		],
		[
			42,
			54,
			24,
			1,
			55,
			25
		],
		[
			23,
			45,
			15,
			28,
			46,
			16
		],
		[
			17,
			145,
			115
		],
		[
			10,
			74,
			46,
			23,
			75,
			47
		],
		[
			10,
			54,
			24,
			35,
			55,
			25
		],
		[
			19,
			45,
			15,
			35,
			46,
			16
		],
		[
			17,
			145,
			115,
			1,
			146,
			116
		],
		[
			14,
			74,
			46,
			21,
			75,
			47
		],
		[
			29,
			54,
			24,
			19,
			55,
			25
		],
		[
			11,
			45,
			15,
			46,
			46,
			16
		],
		[
			13,
			145,
			115,
			6,
			146,
			116
		],
		[
			14,
			74,
			46,
			23,
			75,
			47
		],
		[
			44,
			54,
			24,
			7,
			55,
			25
		],
		[
			59,
			46,
			16,
			1,
			47,
			17
		],
		[
			12,
			151,
			121,
			7,
			152,
			122
		],
		[
			12,
			75,
			47,
			26,
			76,
			48
		],
		[
			39,
			54,
			24,
			14,
			55,
			25
		],
		[
			22,
			45,
			15,
			41,
			46,
			16
		],
		[
			6,
			151,
			121,
			14,
			152,
			122
		],
		[
			6,
			75,
			47,
			34,
			76,
			48
		],
		[
			46,
			54,
			24,
			10,
			55,
			25
		],
		[
			2,
			45,
			15,
			64,
			46,
			16
		],
		[
			17,
			152,
			122,
			4,
			153,
			123
		],
		[
			29,
			74,
			46,
			14,
			75,
			47
		],
		[
			49,
			54,
			24,
			10,
			55,
			25
		],
		[
			24,
			45,
			15,
			46,
			46,
			16
		],
		[
			4,
			152,
			122,
			18,
			153,
			123
		],
		[
			13,
			74,
			46,
			32,
			75,
			47
		],
		[
			48,
			54,
			24,
			14,
			55,
			25
		],
		[
			42,
			45,
			15,
			32,
			46,
			16
		],
		[
			20,
			147,
			117,
			4,
			148,
			118
		],
		[
			40,
			75,
			47,
			7,
			76,
			48
		],
		[
			43,
			54,
			24,
			22,
			55,
			25
		],
		[
			10,
			45,
			15,
			67,
			46,
			16
		],
		[
			19,
			148,
			118,
			6,
			149,
			119
		],
		[
			18,
			75,
			47,
			31,
			76,
			48
		],
		[
			34,
			54,
			24,
			34,
			55,
			25
		],
		[
			20,
			45,
			15,
			61,
			46,
			16
		]
	];
	const qrRSBlock = function(totalCount, dataCount) {
		const _this = {};
		_this.totalCount = totalCount;
		_this.dataCount = dataCount;
		return _this;
	};
	const _this = {};
	const getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
		switch (errorCorrectionLevel) {
			case QRErrorCorrectionLevel.L: return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
			case QRErrorCorrectionLevel.M: return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
			case QRErrorCorrectionLevel.Q: return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
			case QRErrorCorrectionLevel.H: return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
			default: return;
		}
	};
	_this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
		const rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
		if (typeof rsBlock == "undefined") throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
		const length = rsBlock.length / 3;
		const list = [];
		for (let i = 0; i < length; i += 1) {
			const count = rsBlock[i * 3 + 0];
			const totalCount = rsBlock[i * 3 + 1];
			const dataCount = rsBlock[i * 3 + 2];
			for (let j = 0; j < count; j += 1) list.push(qrRSBlock(totalCount, dataCount));
		}
		return list;
	};
	return _this;
}();
const qrBitBuffer = function() {
	const _buffer = [];
	let _length = 0;
	const _this = {};
	_this.getBuffer = function() {
		return _buffer;
	};
	_this.getAt = function(index) {
		const bufIndex = Math.floor(index / 8);
		return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
	};
	_this.put = function(num, length) {
		for (let i = 0; i < length; i += 1) _this.putBit((num >>> length - i - 1 & 1) == 1);
	};
	_this.getLengthInBits = function() {
		return _length;
	};
	_this.putBit = function(bit) {
		const bufIndex = Math.floor(_length / 8);
		if (_buffer.length <= bufIndex) _buffer.push(0);
		if (bit) _buffer[bufIndex] |= 128 >>> _length % 8;
		_length += 1;
	};
	return _this;
};
const qrNumber = function(data) {
	const _mode = QRMode.MODE_NUMBER;
	const _data = data;
	const _this = {};
	_this.getMode = function() {
		return _mode;
	};
	_this.getLength = function(buffer) {
		return _data.length;
	};
	_this.write = function(buffer) {
		const data = _data;
		let i = 0;
		while (i + 2 < data.length) {
			buffer.put(strToNum(data.substring(i, i + 3)), 10);
			i += 3;
		}
		if (i < data.length) {
			if (data.length - i == 1) buffer.put(strToNum(data.substring(i, i + 1)), 4);
			else if (data.length - i == 2) buffer.put(strToNum(data.substring(i, i + 2)), 7);
		}
	};
	const strToNum = function(s) {
		let num = 0;
		for (let i = 0; i < s.length; i += 1) num = num * 10 + chatToNum(s.charAt(i));
		return num;
	};
	const chatToNum = function(c) {
		if ("0" <= c && c <= "9") return c.charCodeAt(0) - "0".charCodeAt(0);
		throw "illegal char :" + c;
	};
	return _this;
};
const qrAlphaNum = function(data) {
	const _mode = QRMode.MODE_ALPHA_NUM;
	const _data = data;
	const _this = {};
	_this.getMode = function() {
		return _mode;
	};
	_this.getLength = function(buffer) {
		return _data.length;
	};
	_this.write = function(buffer) {
		const s = _data;
		let i = 0;
		while (i + 1 < s.length) {
			buffer.put(getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)), 11);
			i += 2;
		}
		if (i < s.length) buffer.put(getCode(s.charAt(i)), 6);
	};
	const getCode = function(c) {
		if ("0" <= c && c <= "9") return c.charCodeAt(0) - "0".charCodeAt(0);
		else if ("A" <= c && c <= "Z") return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
		else switch (c) {
			case " ": return 36;
			case "$": return 37;
			case "%": return 38;
			case "*": return 39;
			case "+": return 40;
			case "-": return 41;
			case ".": return 42;
			case "/": return 43;
			case ":": return 44;
			default: throw "illegal char :" + c;
		}
	};
	return _this;
};
const qr8BitByte = function(data) {
	const _mode = QRMode.MODE_8BIT_BYTE;
	const _bytes = qrcode.stringToBytes(data);
	const _this = {};
	_this.getMode = function() {
		return _mode;
	};
	_this.getLength = function(buffer) {
		return _bytes.length;
	};
	_this.write = function(buffer) {
		for (let i = 0; i < _bytes.length; i += 1) buffer.put(_bytes[i], 8);
	};
	return _this;
};
const qrKanji = function(data) {
	const _mode = QRMode.MODE_KANJI;
	const stringToBytes = qrcode.stringToBytes;
	(function(c, code) {
		const test = stringToBytes(c);
		if (test.length != 2 || (test[0] << 8 | test[1]) != code) throw "sjis not supported.";
	})("友", 38726);
	const _bytes = stringToBytes(data);
	const _this = {};
	_this.getMode = function() {
		return _mode;
	};
	_this.getLength = function(buffer) {
		return ~~(_bytes.length / 2);
	};
	_this.write = function(buffer) {
		const data = _bytes;
		let i = 0;
		while (i + 1 < data.length) {
			let c = (255 & data[i]) << 8 | 255 & data[i + 1];
			if (33088 <= c && c <= 40956) c -= 33088;
			else if (57408 <= c && c <= 60351) c -= 49472;
			else throw "illegal char at " + (i + 1) + "/" + c;
			c = (c >>> 8 & 255) * 192 + (c & 255);
			buffer.put(c, 13);
			i += 2;
		}
		if (i < data.length) throw "illegal char at " + (i + 1);
	};
	return _this;
};
const byteArrayOutputStream = function() {
	const _bytes = [];
	const _this = {};
	_this.writeByte = function(b) {
		_bytes.push(b & 255);
	};
	_this.writeShort = function(i) {
		_this.writeByte(i);
		_this.writeByte(i >>> 8);
	};
	_this.writeBytes = function(b, off, len) {
		off = off || 0;
		len = len || b.length;
		for (let i = 0; i < len; i += 1) _this.writeByte(b[i + off]);
	};
	_this.writeString = function(s) {
		for (let i = 0; i < s.length; i += 1) _this.writeByte(s.charCodeAt(i));
	};
	_this.toByteArray = function() {
		return _bytes;
	};
	_this.toString = function() {
		let s = "";
		s += "[";
		for (let i = 0; i < _bytes.length; i += 1) {
			if (i > 0) s += ",";
			s += _bytes[i];
		}
		s += "]";
		return s;
	};
	return _this;
};
const base64EncodeOutputStream = function() {
	let _buffer = 0;
	let _buflen = 0;
	let _length = 0;
	let _base64 = "";
	const _this = {};
	const writeEncoded = function(b) {
		_base64 += String.fromCharCode(encode(b & 63));
	};
	const encode = function(n) {
		if (n < 0) throw "n:" + n;
		else if (n < 26) return 65 + n;
		else if (n < 52) return 97 + (n - 26);
		else if (n < 62) return 48 + (n - 52);
		else if (n == 62) return 43;
		else if (n == 63) return 47;
		else throw "n:" + n;
	};
	_this.writeByte = function(n) {
		_buffer = _buffer << 8 | n & 255;
		_buflen += 8;
		_length += 1;
		while (_buflen >= 6) {
			writeEncoded(_buffer >>> _buflen - 6);
			_buflen -= 6;
		}
	};
	_this.flush = function() {
		if (_buflen > 0) {
			writeEncoded(_buffer << 6 - _buflen);
			_buffer = 0;
			_buflen = 0;
		}
		if (_length % 3 != 0) {
			const padlen = 3 - _length % 3;
			for (let i = 0; i < padlen; i += 1) _base64 += "=";
		}
	};
	_this.toString = function() {
		return _base64;
	};
	return _this;
};
const base64DecodeInputStream = function(str) {
	const _str = str;
	let _pos = 0;
	let _buffer = 0;
	let _buflen = 0;
	const _this = {};
	_this.read = function() {
		while (_buflen < 8) {
			if (_pos >= _str.length) {
				if (_buflen == 0) return -1;
				throw "unexpected end of file./" + _buflen;
			}
			const c = _str.charAt(_pos);
			_pos += 1;
			if (c == "=") {
				_buflen = 0;
				return -1;
			} else if (c.match(/^\s$/)) continue;
			_buffer = _buffer << 6 | decode(c.charCodeAt(0));
			_buflen += 6;
		}
		const n = _buffer >>> _buflen - 8 & 255;
		_buflen -= 8;
		return n;
	};
	const decode = function(c) {
		if (65 <= c && c <= 90) return c - 65;
		else if (97 <= c && c <= 122) return c - 97 + 26;
		else if (48 <= c && c <= 57) return c - 48 + 52;
		else if (c == 43) return 62;
		else if (c == 47) return 63;
		else throw "c:" + c;
	};
	return _this;
};
const gifImage = function(width, height) {
	const _width = width;
	const _height = height;
	const _data = new Array(width * height);
	const _this = {};
	_this.setPixel = function(x, y, pixel) {
		_data[y * _width + x] = pixel;
	};
	_this.write = function(out) {
		out.writeString("GIF87a");
		out.writeShort(_width);
		out.writeShort(_height);
		out.writeByte(128);
		out.writeByte(0);
		out.writeByte(0);
		out.writeByte(0);
		out.writeByte(0);
		out.writeByte(0);
		out.writeByte(255);
		out.writeByte(255);
		out.writeByte(255);
		out.writeString(",");
		out.writeShort(0);
		out.writeShort(0);
		out.writeShort(_width);
		out.writeShort(_height);
		out.writeByte(0);
		const lzwMinCodeSize = 2;
		const raster = getLZWRaster(lzwMinCodeSize);
		out.writeByte(lzwMinCodeSize);
		let offset = 0;
		while (raster.length - offset > 255) {
			out.writeByte(255);
			out.writeBytes(raster, offset, 255);
			offset += 255;
		}
		out.writeByte(raster.length - offset);
		out.writeBytes(raster, offset, raster.length - offset);
		out.writeByte(0);
		out.writeString(";");
	};
	const bitOutputStream = function(out) {
		const _out = out;
		let _bitLength = 0;
		let _bitBuffer = 0;
		const _this = {};
		_this.write = function(data, length) {
			if (data >>> length != 0) throw "length over";
			while (_bitLength + length >= 8) {
				_out.writeByte(255 & (data << _bitLength | _bitBuffer));
				length -= 8 - _bitLength;
				data >>>= 8 - _bitLength;
				_bitBuffer = 0;
				_bitLength = 0;
			}
			_bitBuffer = data << _bitLength | _bitBuffer;
			_bitLength = _bitLength + length;
		};
		_this.flush = function() {
			if (_bitLength > 0) _out.writeByte(_bitBuffer);
		};
		return _this;
	};
	const getLZWRaster = function(lzwMinCodeSize) {
		const clearCode = 1 << lzwMinCodeSize;
		const endCode = (1 << lzwMinCodeSize) + 1;
		let bitLength = lzwMinCodeSize + 1;
		const table = lzwTable();
		for (let i = 0; i < clearCode; i += 1) table.add(String.fromCharCode(i));
		table.add(String.fromCharCode(clearCode));
		table.add(String.fromCharCode(endCode));
		const byteOut = byteArrayOutputStream();
		const bitOut = bitOutputStream(byteOut);
		bitOut.write(clearCode, bitLength);
		let dataIndex = 0;
		let s = String.fromCharCode(_data[dataIndex]);
		dataIndex += 1;
		while (dataIndex < _data.length) {
			const c = String.fromCharCode(_data[dataIndex]);
			dataIndex += 1;
			if (table.contains(s + c)) s = s + c;
			else {
				bitOut.write(table.indexOf(s), bitLength);
				if (table.size() < 4095) {
					if (table.size() == 1 << bitLength) bitLength += 1;
					table.add(s + c);
				}
				s = c;
			}
		}
		bitOut.write(table.indexOf(s), bitLength);
		bitOut.write(endCode, bitLength);
		bitOut.flush();
		return byteOut.toByteArray();
	};
	const lzwTable = function() {
		const _map = {};
		let _size = 0;
		const _this = {};
		_this.add = function(key) {
			if (_this.contains(key)) throw "dup key:" + key;
			_map[key] = _size;
			_size += 1;
		};
		_this.size = function() {
			return _size;
		};
		_this.indexOf = function(key) {
			return _map[key];
		};
		_this.contains = function(key) {
			return typeof _map[key] != "undefined";
		};
		return _this;
	};
	return _this;
};
const createDataURL = function(width, height, getPixel) {
	const gif = gifImage(width, height);
	for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) gif.setPixel(x, y, getPixel(x, y));
	const b = byteArrayOutputStream();
	gif.write(b);
	const base64 = base64EncodeOutputStream();
	const bytes = b.toByteArray();
	for (let i = 0; i < bytes.length; i += 1) base64.writeByte(bytes[i]);
	base64.flush();
	return "data:image/gif;base64," + base64;
};
qrcode.stringToBytes;
// src/print_cpcl.js
var PrintCPCL = class PrintCPCL {
	constructor({ width = 72, height = 40 } = {}) {
		this.width = width * 8;
		this.height = height * 8;
		this.qty = 1;
		this.currentY = PrintCPCL.PADDING_TOP;
		this.data = [];
		this._pushData(`! 0 200 200 ${this.height} ${this.qty}`);
	}
	render() {
		this._pushData("FORM");
		this._pushData("PRINT");
		console.debug("打印数据：");
		console.debug(this.data);
		return this.data;
	}
	text(data, { font = 8, size = 0, x = 0, y = 36, line_add = true } = {}) {
		this._pushData(`T ${font} ${size} ${x} ${this.currentY} ${data}`);
		if (line_add) this.currentY = this.currentY + y;
	}
	text_big(data, { size = 1, ...options } = {}) {
		this._pushData("SETBOLD 2");
		this._pushData(`SETMAG ${size} ${size}`);
		this.text(data, {
			size,
			y: 36 * size,
			...options
		});
		this._pushData("SETMAG 0 0");
		this._pushData("SETBOLD 0");
	}
	qrcode_right(data, { y = PrintCPCL.PADDING_TOP, u = 6 } = {}) {
		const qrcodeEncoder = qrcode(4, "M");
		qrcodeEncoder.addData(data);
		qrcodeEncoder.make();
		const size = qrcodeEncoder.getModuleCount();
		console.debug("qrcode size：", size);
		const x = this.width - u * size - 16;
		this._pushData(`B QR ${x} ${y} M 2 U ${u}`, `MA,${data}`, "ENDQR");
	}
	box({ x0 = 0, y0 = this.currentY, x1 = 150, y1 = this.currentY + 150, width = 2 } = {}) {
		this._pushData(`BOX ${x0} ${y0} ${x1} ${y1} ${width}`);
		this.currentY = this.currentY + y1;
	}
	lineX({ x0 = 0, x1 = 320, width = 8, height = 36 } = {}) {
		this._pushData(`L ${x0} ${this.currentY} ${x1} ${this.currentY} ${width}`);
		this.currentY = this.currentY + height;
	}
	image(dataArray, { x = 0, meta = {} } = {}) {
		dataArray.map((i) => {
			return i.toString(16).padStart(2, "0").toUpperCase();
		}).join("");
		this.data.push(...iconv.encode(`CG ${meta.byteWidth} ${meta.height} ${x} ${this.currentY} `, "gb18030"), ...dataArray, ...iconv.encode("\r\n", "gb18030"));
		this.currentY = this.currentY + meta.height;
	}
	barcode(data, { width = 1, ratio = 1, height = 50, x = 0 } = {}) {
		this._pushData(`B 39 ${width} ${ratio} ${height} ${x} ${this.currentY} ${data}`);
		this.currentY = this.currentY + height;
	}
	_pushData(...value) {
		value.forEach((i) => {
			this.data.push(...iconv.encode(`${i}\r\n`, "gb18030"));
		});
	}
};
PrintCPCL.PADDING_TOP = 40;
// src/print_pos.js
var PrintPOS = class PrintPOS {
	constructor() {
		this.data = [];
		this.debug = false;
		this.data.push(27, 64);
		this.data.push(29, 76, 18, 0);
	}
	render() {
		if (this.debug) this.debug();
		return this.data;
	}
	debug() {
		console.debug("打印数据：", this.data.map((i) => {
			return i.toString(16).padStart(2, "0");
		}).join(" "));
	}
	blankLine(size = 1) {
		this.data.push(...Array(size).fill(10));
	}
	text_big(value) {
		this.data.push(27, 33, 48);
		this.data.push(...iconv.encode(value, "gb18030"));
		this.data.push(...PrintPOS.TXT_NORMAL);
		this.data.push(10);
	}
	text(value) {
		this.data.push(...PrintPOS.TXT_NORMAL);
		this.data.push(...iconv.encode(value, "gb18030"));
		this.data.push(...PrintPOS.TXT_NORMAL);
		this.data.push(10);
	}
	qrcode(value) {
		const bytes = iconv.encode(value, "gb18030");
		const qrSize = [
			29,
			40,
			107,
			3,
			0,
			49,
			67,
			6
		];
		const qrErr = [
			29,
			40,
			107,
			3,
			0,
			49,
			69,
			48
		];
		const qrData = [
			29,
			40,
			107,
			bytes.length + 3,
			0,
			49,
			80,
			48
		];
		const qrRun = [
			29,
			40,
			107,
			3,
			0,
			49,
			81,
			48
		];
		this.data.push(...qrSize, ...qrErr, ...qrData, ...bytes, ...qrRun);
		this.data.push(10, 10);
	}
	barcode(value, { pos = 2, height = 50, width = 2, format = 4 } = {}) {
		const bytes = iconv.encode(value, "gb18030");
		const barPostion = [
			29,
			72,
			pos
		];
		const barHeight = [
			29,
			104,
			height
		];
		const barWidth = [
			29,
			119,
			width
		];
		const barFormat = [
			29,
			107,
			format
		];
		this.data.push(...barPostion, ...barHeight, ...barWidth, ...barFormat, ...bytes, 0);
	}
	image(value, meta) {
		this.data.push(29, 118, 48, 0, ...this._doubleDigit(meta.byteWidth), ...this._doubleDigit(meta.height), ...value);
	}
	disconnect() {
		this.data.push(31, 40, 99, 2, 0, 68, 66);
	}
	_doubleDigit(value) {
		return [value % 256, Math.floor(value / 256)];
	}
};
PrintPOS.TXT_NORMAL = [
	27,
	33,
	0
];
// src/print_pic.js
var PrintPic = class {
	constructor(dpr, img) {
		this.dpr = dpr || 1;
		this.img = img;
	}
	loadImageToCanvas(canvas, src, success) {
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 9999, 9999);
		console.debug("图片 src：", src);
		const img = this.img;
		img.src = src;
		img.addEventListener("load", () => {
			const w = img.width;
			const h = img.height;
			const dw = 280;
			const dh = Math.round(h * dw / w);
			console.debug("图片信息：", w, h, dw, dh);
			canvas.width = dw * this.dpr;
			canvas.height = dh * this.dpr;
			ctx.drawImage(img, 0, 0, dw, dh);
			const imageData = ctx.getImageData(0, 0, dw, dh);
			console.debug("canvas 数据：", imageData);
			const data = this.imgToRaster(imageData, dw, dh);
			console.debug("转化后的数据:", data);
			if (success) success(data);
		});
	}
	imgToRaster(rgba, w, h) {
		const buf = rgba && rgba.data ? rgba.data : rgba;
		const grayArray = [];
		const hist = new Array(256).fill(0);
		const totalPixels = Math.floor(buf.length / 4);
		for (let i = 0; i < buf.length; i += 4) if (buf[i + 3] > 0) hist[buf[i]]++;
		let sum = 0;
		for (let i = 0; i < 256; i++) sum += i * hist[i];
		let sumB = 0, wB = 0, maxBetween = 0, threshold = 0;
		for (let t = 0; t < 256; t++) {
			wB += hist[t];
			if (wB === 0) continue;
			const wF = totalPixels - wB;
			if (wF === 0) break;
			sumB += t * hist[t];
			const mB = sumB / wB;
			const mF = (sum - sumB) / wF;
			const between = wB * wF * (mB - mF) ** 2;
			if (between > maxBetween) {
				maxBetween = between;
				threshold = t;
			}
		}
		console.debug("Threshold:", threshold);
		for (let i = 0; i < buf.length; i += 4) if (Math.round(buf[i] * .299 + buf[i + 1] * .587 + buf[i + 2] * .114) < threshold) grayArray.push(1);
		else grayArray.push(0);
		console.debug("转灰度后的数据：", grayArray.length);
		const bytesPerLine = Math.ceil(w / 8);
		const raster = [];
		const dataStr = [];
		for (let y = 0; y < h; y++) {
			const sub = grayArray.splice(0, w);
			for (let x = 0; x < bytesPerLine; x++) {
				const a = parseInt(sub.splice(0, 8).join("").padEnd(8, "0"), 2);
				raster.push(a);
			}
		}
		return {
			data: raster,
			dataStr,
			meta: {
				width: w,
				byteWidth: bytesPerLine,
				height: h
			}
		};
	}
};
// src/print_command.js
var _PrintCommand_brand = /* @__PURE__ */ new WeakSet();
var PrintCommand = class {
	constructor() {
		_classPrivateMethodInitSpec(this, _PrintCommand_brand);
	}
	setWifi(inputSsid, inputPassword) {
		const ssid = iconv.encode(inputSsid, "utf-8");
		const password = iconv.encode(inputPassword, "utf-8");
		const size = ssid.length + password.length + 7;
		let xor = 104;
		xor ^= ssid.length;
		for (const byte of ssid) xor ^= byte;
		xor ^= 3;
		xor ^= 1;
		xor ^= password.length;
		for (const byte of password) xor ^= byte;
		const data = [];
		data.push(31, 40, 15);
		data.push(..._assertClassBrand(_PrintCommand_brand, this, _doubleDigit).call(this, size));
		data.push(31, 119);
		data.push(ssid.length);
		data.push(...ssid);
		data.push(3, 1);
		data.push(password.length);
		data.push(...password);
		data.push(xor);
		return data;
	}
	setDark(value) {
		const dark = parseInt(value);
		const config = [];
		config.push(5);
		config.push(1);
		config.push(0);
		config.push(0);
		config.push(0);
		config.push(dark);
		config.push(255);
		config.push(0);
		config.push(0);
		let xor = 108;
		for (const i of config) xor ^= i;
		const data = [];
		data.push(31, 40, 15);
		data.push(12, 0);
		data.push(31, 115);
		data.push(...config);
		data.push(xor);
		return data;
	}
	setName(value) {
		const name = iconv.encode(value, "utf-8");
		const length = name.length + 5 + 4;
		let xor = 93;
		for (const byte of name) xor ^= byte;
		const data = [];
		data.push(31, 40, 15);
		data.push(..._assertClassBrand(_PrintCommand_brand, this, _doubleDigit).call(this, length));
		data.push(31, 66);
		data.push(...name);
		data.push(0, 48, 48, 48, 48, 0);
		data.push(xor);
		return data;
	}
	setTime(value) {
		const time = parseInt(value);
		const data = [];
		data.push(31, 45, 49, 2);
		data.push(..._assertClassBrand(_PrintCommand_brand, this, _doubleDigit).call(this, time));
		return data;
	}
};
function _doubleDigit(value) {
	return [value % 256, Math.floor(value / 256)];
}
exports.PrintCPCL = PrintCPCL;
exports.PrintCommand = PrintCommand;
exports.PrintPOS = PrintPOS;
exports.PrintPic = PrintPic;
