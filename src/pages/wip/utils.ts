// Learn more: https://readium.org/
// https://github.com/HadrienGardeur/web-speech-recommended-voices

export const getVoices = () => {
    return new Promise(
        function (resolve) {
            let synth = window.speechSynthesis;
            let id: NodeJS.Timeout;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 100);
        }
    )
}

export const filterAvailableVoices = async (jsonData: any): Promise<{voices: any, availableVoices: any}> => {
    if (!jsonData) return {voices: [], availableVoices: []};

    const availableVoices: any[] = [];
    const voices: any = await getVoices();

    jsonData.voices.forEach(
        function(voice: any) {
            if (voices.some((apiVoice: any) => apiVoice.name === voice.name)) {
                availableVoices.push(voice);
            }
            else {
                if (voice.altNames) {
                    voice.altNames.forEach(
                        (altName: any) => {
                            if (voices.some((apiVoice:any) => apiVoice.name === altName)) {
                                voice.name = altName;
                                availableVoices.push(voice);
                            }
                        }
                    )
                }
            }
        }
    );

    return {voices, availableVoices};
};

export const extractRegionFromLang = (lang: any) => {
    if (!lang) return null;
    const parts = lang.split('-');
    return parts.length > 1 ? parts[1] : null;
};

export const groupVoicesByRegion = (voices:any) => {
    const regions = {};
    voices.forEach((voice: any) => {
        const region: any = extractRegionFromLang(voice.language) ?? 'Other';
        // @ts-ignore
        if (!regions[region]) {
            // @ts-ignore
            regions[region] = [];
        }
        // @ts-ignore
        regions[region].push(voice);
    });
    return regions;
}

export const sortVoicesByRegionPreference = (groupedVoices: any) => {
    const acceptLanguages = navigator.languages;
    const primaryRegion = acceptLanguages.map(lang => extractRegionFromLang(lang) || 'Other');

    const sortedVoices = [];

    primaryRegion.forEach(region => {
        if (groupedVoices[region]) {
            sortedVoices.push(...groupedVoices[region]);
            delete groupedVoices[region];
        }
    });

    for (const region in groupedVoices) {
        sortedVoices.push(...groupedVoices[region]);
    }

    return sortedVoices;
}

export const getVoicesOptions = (jsonData: any) => {
    if (!jsonData) return [];
    const options: {label: string, value: string}[] = [];
    (jsonData || []).forEach(function(voice: any) {
        const option = {
            value: voice.name as string,
            label: voice.label as string,
        };
        options.push(option);
    });
    return options;
}