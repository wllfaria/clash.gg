import * as S from './styles'

type TextNodes =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'strong'
	| 'blockquote'
	| 'mark'
	| 'span'
	| 'em'
	| 'code'
	| 'pre'
	| 'ins'
	| 'del'
	| 'sup'
	| 'sub'
	| 'small'
	| 'i'
	| 'b'

type TextProps = {
	textNode: TextNodes
	children: React.ReactNode
}

type HandleTextNode = { [key in TextNodes]: JSX.Element }

export function Text({ textNode, children }: TextProps) {
	const handleTextNode: HandleTextNode = {
		h1: <S.H1>{children}</S.H1>,
		h2: <S.H2>{children}</S.H2>,
		h3: <S.H3>{children}</S.H3>,
		h4: <S.H4>{children}</S.H4>,
		h5: <S.H5>{children}</S.H5>,
		h6: <S.H6>{children}</S.H6>,
		p: <S.P>{children}</S.P>,
		strong: <S.Strong>{children}</S.Strong>,
		blockquote: <S.Blockquote>{children}</S.Blockquote>,
		mark: <S.Mark>{children}</S.Mark>,
		span: <S.Span>{children}</S.Span>,
		em: <S.Em>{children}</S.Em>,
		code: <S.Code>{children}</S.Code>,
		pre: <S.Pre>{children}</S.Pre>,
		ins: <S.Ins>{children}</S.Ins>,
		del: <S.Del>{children}</S.Del>,
		sup: <S.Sup>{children}</S.Sup>,
		sub: <S.Sub>{children}</S.Sub>,
		small: <S.Small>{children}</S.Small>,
		i: <S.I>{children}</S.I>,
		b: <S.B>{children}</S.B>
	}

	return handleTextNode[textNode]
}
