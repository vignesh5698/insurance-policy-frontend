import React from 'react';
import { Skeleton, Row, Col, Divider } from 'antd';

const SearchResultSkeleton = () => {
  const active = true;

  return (
    <div className='skeleton-margin' style={{ marginTop: 10 }}>
      <Divider/>
      <Row gutter={16} style={{ marginTop: 10 }}>
        <Col span={16}>
          <div className='skeleton-margin'><Skeleton.Input style={{ width: 200 }} active={active} /></div>
        </Col>
        <Col span={8}>
          <div className='skeleton-margin'><Skeleton.Input style={{ width: 240 }} active={active} /></div>
        </Col>
      </Row>

      <div style={{ marginTop: 10 }}><Skeleton.Input style={{ width: 110, height: 10 }} active={active} /></div>
      <div className='skeleton-margin'>
        <Skeleton.Input style={{ width: 100, marginBottom: 10, height: 20 }} active={active} />
      </div>
      <div className='skeleton-margin' style={{ marginBottom: 0 }}>
        <Skeleton.Input style={{ width: 180, height: 10 }} active={active} />
      </div>

      <div className='skeleton-margin'><Skeleton.Input style={{ width: 310, height: 25 }} active={active} /></div>
      <div style={{ marginTop: 20 }}><Skeleton.Input style={{ width: 110, height: 10 }} active={active} /></div>
      <div><Skeleton.Input style={{ width: 90, height: 25 }} active={active} /></div>
    </div>
  )
}

export default SearchResultSkeleton;