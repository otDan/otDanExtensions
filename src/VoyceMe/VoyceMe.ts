import {
    Source,
    Manga,
    Chapter,
    ChapterDetails,
    HomeSection,
    SearchRequest,
    PagedResults,
    SourceInfo,
    TagType,
    TagSection,
    ContentRating,
    Request,
    Response
} from 'paperback-extensions-common'

import {
    // parseChapterDetails,
    // isLastPage,
    // parseTags,
    // parseChapters,
    // parseHomeSections,
    // parseMangaDetails,
    // parseViewMore,
    // parseSearch
} from './VoyceMeParser'

const RCO_DOMAIN = 'https://voyce.me'

export const VoyceMeInfo: SourceInfo = {
    version: '1.0.0',
    name: 'VoyceMe',
    icon: 'icon.png',
    author: 'otDan',
    authorWebsite: 'https://github.com/otDan',
    description: 'Extension that pulls manga from Voyce.Me.',
    contentRating: ContentRating.MATURE,
    websiteBaseURL: RCO_DOMAIN,
    sourceTags: [
        {
            text: 'Cloudflare',
            type: TagType.RED
        }
    ]
}

export class VoyceMe extends Source {
    
    requestManager = createRequestManager({
        requestsPerSecond: 2,
        requestTimeout: 15000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {

                request.headers = {
                    ...(request.headers ?? {}),
                    ...{
                        'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15`,
                        'referer': RCO_DOMAIN
                    }
                }

                return request
            },

            interceptResponse: async (response: Response): Promise<Response> => {
                return response
            }
        }
    })

    override getMangaDetails(mangaId: string): Promise<Manga> {
        throw new Error('Method not implemented.')
    }

    override getChapters(mangaId: string): Promise<Chapter[]> {
        throw new Error('Method not implemented.')
    }

    override getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        throw new Error('Method not implemented.')
    }

    override getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        throw new Error('Method not implemented.')
    }

    // override getMangaShareUrl(mangaId: string): string { return `${RCO_DOMAIN}/series/${mangaId}` }

    // override async getMangaDetails(mangaId: string): Promise<Manga> {
    //     const request = createRequestObject({
    //         url: `${RCO_DOMAIN}/series/`,
    //         method: 'GET',
    //         param: mangaId
    //     })
    //     const response = await this.requestManager.schedule(request, 1)
    //     const $ = this.cheerio.load(response.data)
    //     return parseMangaDetails($, mangaId)
    // }

    // override async getChapters(mangaId: string): Promise<Chapter[]> {
    //     const request = createRequestObject({
    //         url: `${RCO_DOMAIN}/series/`,
    //         method: 'GET',
    //         param: mangaId,
    //     })

    //     const response = await this.requestManager.schedule(request, 1)
    //     const $ = this.cheerio.load(response.data)
    //     return parseChapters($, mangaId)
    // }

    // override async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
    //     const request = createRequestObject({
    //         url: `${RCO_DOMAIN}/series/${mangaId}/${chapterId}`,
    //         method: 'GET',
    //         param: '?readType=1&quality=hq'
    //     })

    //     const response = await this.requestManager.schedule(request, 1)

    //     return parseChapterDetails(response.data, mangaId, chapterId)
    // }

    // override async getTags(): Promise<TagSection[]> {
    //     const request = createRequestObject({
    //         url: `${RCO_DOMAIN}/ComicList`,
    //         method: 'GET',
    //     })

    //     const response = await this.requestManager.schedule(request, 1)
    //     const $ = this.cheerio.load(response.data)
    //     return parseTags($)
    // }

    // override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
    //     const request = createRequestObject({
    //         url: RCO_DOMAIN,
    //         method: 'GET',
    //     })

    //     const response = await this.requestManager.schedule(request, 1)
    //     const $ = this.cheerio.load(response.data)
    //     parseHomeSections($, sectionCallback)
    // }

    // override async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
    //     const page: number = metadata?.page ?? 1
    //     let param = ''
    //     switch (homepageSectionId) {
    //         case 'latest_comic':
    //             param = `/LatestUpdate?page=${page}`
    //             break
    //         case 'new_comic':
    //             param = `/Newest?page=${page}`
    //             break
    //         case 'popular_comic':
    //             param = `/MostPopular?page=${page}`
    //             break
    //         default:
    //             throw new Error('Requested to getViewMoreItems for a section ID which doesn\'t exist')
    //     }

    //     const request = createRequestObject({
    //         url: `${RCO_DOMAIN}/ComicList`,
    //         method: 'GET',
    //         param,
    //     })

    //     const response = await this.requestManager.schedule(request, 1)
    //     const $ = this.cheerio.load(response.data)

    //     const manga = parseViewMore($, this.cheerio)
    //     metadata = !isLastPage($) ? { page: page + 1 } : undefined
    //     return createPagedResults({
    //         results: manga,
    //         metadata
    //     })
    // }

    // override async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
    //     const page: number = metadata?.page ?? 1
    //     let request

    //     //Regular search
    //     if (query.title) {
    //         request = createRequestObject({
    //             url: `${RCO_DOMAIN}/Search/Comic`,
    //             method: 'POST',
    //             headers: {
    //                 'X-Requested-With': 'XMLHttpRequest',
    //                 'Content-type': 'application/x-www-form-urlencoded',
    //             },
    //             data: `keyword=${encodeURI(query.title ?? '')}`
    //         })

    //         //Tag Search
    //     } else {
    //         request = createRequestObject({
    //             url: `${RCO_DOMAIN}/Genre/`,
    //             method: 'GET',
    //             param: `${query?.includedTags?.map((x: any) => x.id)[0]}?page=${page}`
    //         })
    //     }
        
    //     const response = await this.requestManager.schedule(request, 1)
    //     const $ = this.cheerio.load(response.data)
    //     const manga = parseSearch($, this.cheerio)
    //     metadata = !isLastPage($) ? { page: page + 1 } : undefined

    //     return createPagedResults({
    //         results: manga,
    //         metadata
    //     })

    //     //Genre search, no advanced search since it requires reCaptcha
    // }

    // override getCloudflareBypassRequest(): Request {
    //     return createRequestObject({
    //         url: RCO_DOMAIN,
    //         method: 'GET',
    //         headers: {
    //             'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15`,
    //         }
    //     })
    // }
}
