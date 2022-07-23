import React from 'react'
import { svgName } from '../../../assets/svggenerator/enums'
import Svggenerator from '../../../assets/svggenerator/svggenerator'
import './footer.scss'

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer__text">
                    from{' '}
                    <a
                        className="footer__link"
                        href="https://binary-studio.com"
                    >
                        binary studio
                    </a>{' '}
                    with
                    <div className="footer__icon">
                        {' '}
                        <Svggenerator name={svgName.HEART} />{' '}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
