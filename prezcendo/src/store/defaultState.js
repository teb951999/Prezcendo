import { SCALE_NOTES, SCALE_TYPES, GENRES } from '../constants';

export default {
    blocks: [],
    bridges: [
        {
            id: 0,
            prevBlockID: 0,
            nextBlockID: 0,
            currentParameters: {
                happySad:  50,
                simpleComplex: 50,
                duration: 5 // seconds
            },
            scale: [SCALE_NOTES.C, SCALE_TYPES.NATRUAL],
            previousBars: [], // TBD
            nextBars: [], // TBD
            revisions: [], // family tree / generations / children
            currentBridge: {
                revisionID: null,
                childID: null,
            }
        }
    ],
    songSettings: {
        bpm: 60,
        timeSignature: [4, 4],
        genre: GENRES.JAZZ
    },
    interfaceSettings: {
        modal: {
            selectedBridge: 0,
            selectedRevision: null,
            selectedChild: null,
        }
    },
    instruments: {
    }
};

export const DEFAULT_TRANSITION = {
    id: 0,
    prevBlockID: 0,
    nextBlockID: 0,
    currentParameters: {
        happySad:  50,
        simpleComplex: 50,
        duration: 5
    },
    scale: [SCALE_NOTES.C, SCALE_TYPES.NATRUAL],
    previousBars: [],
    nextBars: [],
    revisions: [],
    currentTransition: null,
};

export const DEFAULT_PARAMETERS ={
    happySad:  "50",
    simpleComplex: "50",
    duration: "5",
};

export const DEFAULT_REVISION = {
    id: 0,
    parameters: DEFAULT_PARAMETERS,
    offspring: [
        {
            name: "Child 1",
            midi: null,
        },
        {
            name: "Child 2",
            midi: null,
        },
        {
            name: "Child 3",
            midi: null,
        }], // midi files of offspring
    successfulChild: 1,
};
