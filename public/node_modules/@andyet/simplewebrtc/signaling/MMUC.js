"use strict";
// --------------------------------------------------------------------
// Our custom XMPP extensions for MMUC + DataChannels
// --------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
const stanza_1 = require("stanza");
const MMUC_NS = 'http://andyet.net/xmlns/mmuc';
const TALKY_CORE_NS = 'https://talky.io/ns/core';
const defs = [
    {
        element: 'transport',
        fields: {
            iceLite: stanza_1.JXT.childBoolean(TALKY_CORE_NS, 'ice-lite')
        },
        namespace: stanza_1.Namespaces.NS_JINGLE_ICE_0,
        path: 'iq.jingle.contents.transport',
        type: stanza_1.Namespaces.NS_JINGLE_ICE_0,
        typeField: 'transportType'
    },
    {
        element: 'transport',
        fields: {
            iceLite: stanza_1.JXT.childBoolean(TALKY_CORE_NS, 'ice-lite')
        },
        namespace: stanza_1.Namespaces.NS_JINGLE_ICE_UDP_1,
        path: 'iq.jingle.contents.transport',
        type: stanza_1.Namespaces.NS_JINGLE_ICE_UDP_1,
        typeField: 'transportType'
    },
    {
        element: 'user',
        fields: {
            customerData: stanza_1.JXT.textJSON(),
            roomId: stanza_1.JXT.attribute('rid'),
            sessionId: stanza_1.JXT.attribute('sid'),
            type: stanza_1.JXT.attribute('type')
        },
        namespace: TALKY_CORE_NS,
        path: 'presence.talkyUserInfo'
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.jingle.contents.application.screenCaptures',
                selector: stanza_1.Namespaces.NS_JINGLE_RTP_1
            }
        ],
        element: 'screen',
        fields: {
            id: stanza_1.JXT.attribute('id')
        },
        namespace: TALKY_CORE_NS
    },
    {
        aliases: [
            {
                path: 'iq.jingle.contents.application.simulcast',
                selector: stanza_1.Namespaces.NS_JINGLE_RTP_1
            }
        ],
        element: 'simulcast',
        fields: {
            profile: stanza_1.JXT.attribute('profile')
        },
        namespace: TALKY_CORE_NS
    },
    {
        element: 'conf',
        fields: {
            bridged: stanza_1.JXT.booleanAttribute('bridged'),
            media: stanza_1.JXT.attribute('media')
        },
        namespace: MMUC_NS,
        path: 'presence.mmuc'
    },
    {
        element: 'status',
        fields: {
            active: stanza_1.JXT.booleanAttribute('active'),
            media: stanza_1.JXT.attribute('media'),
            mode: stanza_1.JXT.attribute('mode'),
            ready: stanza_1.JXT.booleanAttribute('ready'),
            recordable: stanza_1.JXT.booleanAttribute('recordable'),
            stamp: stanza_1.JXT.dateAttribute('stamp')
        },
        namespace: MMUC_NS,
        path: 'message.mmucStatus'
    },
    {
        element: 'recording',
        fields: {
            active: stanza_1.JXT.booleanAttribute('active'),
            stamp: stanza_1.JXT.dateAttribute('stamp'),
            state: stanza_1.JXT.attribute('state'),
            uri: stanza_1.JXT.attribute('uri')
        },
        namespace: MMUC_NS,
        path: 'message.mmucStats.recording'
    },
    {
        element: 'state',
        fields: {
            speaking: stanza_1.JXT.booleanAttribute('speaking')
        },
        namespace: MMUC_NS,
        path: 'message.mmuc'
    },
    {
        element: 'query',
        fields: {
            endMedia: stanza_1.JXT.childBoolean(null, 'end-media'),
            startRecording: stanza_1.JXT.childBoolean(null, 'start-recording')
        },
        namespace: MMUC_NS,
        path: 'iq.mmuc'
    },
    {
        element: 'start-media',
        fields: {
            media: stanza_1.JXT.attribute('media')
        },
        namespace: MMUC_NS,
        path: 'iq.mmuc.startMedia'
    },
    {
        element: 'end-recording',
        fields: {
            uri: stanza_1.JXT.attribute('uri')
        },
        namespace: MMUC_NS,
        path: 'iq.mmuc.endRecording'
    }
];
exports.default = defs;
